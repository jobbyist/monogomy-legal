import { supabase } from './supabaseClient'

interface CreateDraftParams {
  clientId: string
  templateId: string
  title: string
  variables: Record<string, any>
}

interface SubmitReviewParams {
  documentId: string
  practiceArea: string
  jurisdiction: string
}

interface ApproveDocumentParams {
  documentId: string
  attorneyId: string
  notes: string
  finalContent: string
}

export const workflowService = {
  // State transition: drafted
  async initiateDocumentDraft(params: CreateDraftParams) {
    try {
      const { data, error } = await supabase
        .from('documents')
        .insert({
          client_id: params.clientId,
          template_id: params.templateId,
          title: params.title,
          status: 'drafted',
          ai_analysis: { variables: params.variables },
        })
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (err) {
      console.error('Draft creation failed:', err)
      return { data: null, error: err }
    }
  },

  // State transition: drafted -> pending_review
  async requestAttorneyReview(params: SubmitReviewParams) {
    try {
      const matchedAttorney = await this.findAvailableAttorney(
        params.practiceArea,
        params.jurisdiction
      )

      if (!matchedAttorney) {
        throw new Error('No qualified attorney available')
      }

      const { data, error } = await supabase
        .from('documents')
        .update({
          status: 'pending_review',
          attorney_id: matchedAttorney.profile_id,
        })
        .eq('id', params.documentId)
        .select()
        .single()

      if (error) throw error

      await this.sendAttorneyNotification(matchedAttorney.profile_id, params.documentId)

      return { data, attorney: matchedAttorney, error: null }
    } catch (err) {
      console.error('Review submission failed:', err)
      return { data: null, attorney: null, error: err }
    }
  },

  // State transition: pending_review -> attorney_approved
  async finalizeAttorneyApproval(params: ApproveDocumentParams) {
    try {
      const { data, error } = await supabase
        .from('documents')
        .update({
          status: 'attorney_approved',
          attorney_notes: params.notes,
          raw_text: params.finalContent,
          approved_at: new Date().toISOString(),
        })
        .eq('id', params.documentId)
        .eq('attorney_id', params.attorneyId)
        .select()
        .single()

      if (error) throw error

      await this.deliverToClient(params.documentId)

      return { data, error: null }
    } catch (err) {
      console.error('Approval failed:', err)
      return { data: null, error: err }
    }
  },

  // State transition: attorney_approved -> sent_to_client
  async deliverToClient(documentId: string) {
    try {
      const { data: doc, error: fetchErr } = await supabase
        .from('documents')
        .select('*')
        .eq('id', documentId)
        .single()

      if (fetchErr) throw fetchErr

      const pdfFile = await this.createWatermarkedPDF(doc.raw_text, doc.title)
      const storagePath = `documents/${documentId}_final.pdf`

      const { data: uploadResult, error: uploadErr } = await supabase.storage
        .from('documents')
        .upload(storagePath, pdfFile, {
          contentType: 'application/pdf',
          upsert: true,
        })

      if (uploadErr) throw uploadErr

      const { error: updateErr } = await supabase
        .from('documents')
        .update({
          status: 'sent_to_client',
          final_file_path: uploadResult.path,
          sent_at: new Date().toISOString(),
        })
        .eq('id', documentId)

      if (updateErr) throw updateErr

      await this.sendClientNotification(doc.client_id, documentId, uploadResult.path)

      return { success: true, path: uploadResult.path }
    } catch (err) {
      console.error('Delivery failed:', err)
      return { success: false, error: err }
    }
  },

  async findAvailableAttorney(practiceArea: string, jurisdiction: string) {
    try {
      const { data, error } = await supabase
        .from('attorney_profiles')
        .select('*')
        .eq('verified', true)
        .eq('jurisdiction', jurisdiction)
        .contains('practice_areas', [practiceArea])
        .limit(1)

      if (error) throw error
      return data && data.length > 0 ? data[0] : null
    } catch (err) {
      console.error('Attorney matching error:', err)
      return null
    }
  },

  async createWatermarkedPDF(content: string, documentTitle: string): Promise<Blob> {
    const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <title>${documentTitle}</title>
  <style>
    body { font-family: serif; padding: 2cm; position: relative; }
    .watermark {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      font-size: 120px;
      opacity: 0.08;
      font-weight: bold;
      pointer-events: none;
    }
    h1 { text-align: center; margin-bottom: 2em; }
    .content { white-space: pre-wrap; line-height: 1.6; }
    .footer {
      margin-top: 3em;
      padding-top: 1em;
      border-top: 1px solid #ccc;
      font-size: 9px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="watermark">MONOGAMY.LEGAL</div>
  <h1>${documentTitle}</h1>
  <div class="content">${content}</div>
  <div class="footer">
    This document was generated through Monogamy.legal technology platform.
    Legal review and approval provided by licensed independent attorneys.
  </div>
</body>
</html>
    `
    return new Blob([htmlTemplate], { type: 'application/pdf' })
  },

  async sendAttorneyNotification(attorneyId: string, documentId: string) {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('email, full_name')
        .eq('id', attorneyId)
        .single()

      if (data?.email) {
        console.log(`Notify attorney ${data.email} - Document ${documentId} ready for review`)
      }
    } catch (err) {
      console.error('Attorney notification error:', err)
    }
  },

  async sendClientNotification(clientId: string, documentId: string, filePath: string) {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('email, full_name')
        .eq('id', clientId)
        .single()

      if (data?.email) {
        console.log(`Notify client ${data.email} - Document ${documentId} completed at ${filePath}`)
      }
    } catch (err) {
      console.error('Client notification error:', err)
    }
  },
}
