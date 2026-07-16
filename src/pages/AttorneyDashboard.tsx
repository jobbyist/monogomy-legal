import { useState, useEffect } from 'react'
import { FileText, CheckCircle, Clock } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Textarea } from '../components/ui/textarea'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'
import { workflowService } from '../services/workflow'

interface PendingDocument {
  id: string
  title: string
  raw_text: string
  ai_analysis: any
  created_at: string
  client_id: string
}

export default function AttorneyDashboard() {
  const navigate = useNavigate()
  const [pendingDocs, setPendingDocs] = useState<PendingDocument[]>([])
  const [selectedDoc, setSelectedDoc] = useState<PendingDocument | null>(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [editedText, setEditedText] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadAttorneyData()
  }, [])

  useEffect(() => {
    if (selectedDoc) {
      setEditedText(selectedDoc.raw_text || '')
    }
  }, [selectedDoc])

  async function loadAttorneyData() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/login')
        return
      }

      const [profileRes, docsRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase
          .from('documents')
          .select('*')
          .eq('attorney_id', user.id)
          .eq('status', 'pending_review')
          .order('created_at', { ascending: true })
      ])

      if (profileRes.data) setProfile(profileRes.data)
      if (docsRes.data) setPendingDocs(docsRes.data)

      if (profileRes.data?.role !== 'attorney') {
        navigate('/dashboard')
      }
    } catch (err) {
      console.error('Error loading attorney dashboard:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleApprove() {
    if (!selectedDoc) return

    setSubmitting(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const result = await workflowService.finalizeAttorneyApproval({
        documentId: selectedDoc.id,
        attorneyId: user.id,
        notes,
        finalContent: editedText,
      })

      if (result.error) {
        alert('Error approving document')
        return
      }

      setPendingDocs(pendingDocs.filter(d => d.id !== selectedDoc.id))
      setSelectedDoc(null)
      setNotes('')
      alert('Document approved and sent to client!')
    } catch (err) {
      console.error('Error approving document:', err)
      alert('Error approving document')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Attorney Workspace
          </h1>
          <p className="text-muted-foreground">
            Review and approve client documents
          </p>
        </div>

        {!selectedDoc ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Awaiting Your Review ({pendingDocs.length})
              </CardTitle>
              <CardDescription>
                Documents submitted by clients need your professional review and approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingDocs.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">All caught up!</p>
                  <p className="text-sm text-muted-foreground">No pending documents at this time.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedDoc(doc)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className="h-4 w-4 text-primary" />
                          <h4 className="font-semibold">{doc.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Submitted {new Date(doc.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button>Review Now</Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Editor</CardTitle>
                <CardDescription>Make your professional edits</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="min-h-[400px] font-mono text-sm"
                  placeholder="Edit document content..."
                />
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Attorney Notes</label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add your professional notes..."
                    rows={4}
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleApprove} disabled={submitting} className="flex-1">
                    {submitting ? 'Processing...' : 'Approve & Send to Client'}
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedDoc(null)}>
                    Back
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Risk Analysis</CardTitle>
                <CardDescription>Automated contract audit findings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedDoc.ai_analysis?.summary && (
                    <div>
                      <h4 className="font-semibold mb-2">Critical Issues</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedDoc.ai_analysis.summary.map((item: string, idx: number) => (
                          <li key={idx} className="text-sm">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedDoc.ai_analysis?.risk_rating && (
                    <div>
                      <h4 className="font-semibold mb-2">Risk Rating</h4>
                      <Badge
                        variant={
                          selectedDoc.ai_analysis.risk_rating === 'high' || selectedDoc.ai_analysis.risk_rating === 'critical'
                            ? 'destructive'
                            : 'default'
                        }
                      >
                        {selectedDoc.ai_analysis.risk_rating.toUpperCase()}
                      </Badge>
                    </div>
                  )}

                  {selectedDoc.ai_analysis?.missing_clauses && selectedDoc.ai_analysis.missing_clauses.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Missing Clauses</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedDoc.ai_analysis.missing_clauses.map((item: string, idx: number) => (
                          <li key={idx} className="text-sm text-orange-600">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedDoc.ai_analysis?.recommendations && selectedDoc.ai_analysis.recommendations.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Recommendations</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedDoc.ai_analysis.recommendations.map((item: string, idx: number) => (
                          <li key={idx} className="text-sm text-blue-600">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
