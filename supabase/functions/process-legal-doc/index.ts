import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Anthropic from 'https://esm.sh/@anthropic-ai/sdk@0.24.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DocumentAnalysis {
  summary: string[];
  risk_rating: 'low' | 'medium' | 'high' | 'critical';
  jurisdictional_issues: string[];
  missing_clauses: string[];
  loopholes: string[];
  recommendations: string[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the current user
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      throw new Error('No user found')
    }

    // Parse request body
    const { document_id, file_content, file_type, jurisdiction } = await req.json()

    if (!document_id || !file_content || !jurisdiction) {
      throw new Error('Missing required parameters')
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: Deno.env.get('ANTHROPIC_API_KEY') ?? '',
    })

    // Extract text from document based on file type
    let extractedText = ''
    
    if (file_type === 'text/plain' || file_type === 'text/markdown') {
      extractedText = file_content
    } else {
      // For PDF/DOCX, use Claude's vision capabilities with base64
      const extractionResponse = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 4096,
        messages: [{
          role: "user",
          content: [
            {
              type: "document",
              source: {
                type: "base64",
                media_type: file_type,
                data: file_content,
              },
            },
            {
              type: "text",
              text: "Please extract all text content from this legal document. Preserve formatting, structure, and all clauses."
            }
          ],
        }],
      })

      extractedText = extractionResponse.content[0].type === 'text' 
        ? extractionResponse.content[0].text 
        : ''
    }

    // Perform AI contract audit
    const jurisdictionContext = {
      'ZA': 'South Africa - Legal Practice Act 28 of 2014',
      'KE': 'Kenya - Advocates Act',
      'NG': 'Nigeria - Legal Practitioners Act'
    }

    const auditPrompt = `You are an expert legal auditor specializing in ${jurisdictionContext[jurisdiction as keyof typeof jurisdictionContext]}.

Analyze the following legal document and provide a comprehensive audit:

Document Text:
${extractedText}

Please provide:
1. A 5-bullet summary of the most critical issues
2. Overall risk rating (low, medium, high, or critical)
3. Jurisdictional compliance issues specific to ${jurisdiction}
4. Missing critical clauses that should be included
5. Potential loopholes or problematic language
6. Specific recommendations for improvement

Format your response as JSON with the following structure:
{
  "summary": ["issue 1", "issue 2", "issue 3", "issue 4", "issue 5"],
  "risk_rating": "low|medium|high|critical",
  "jurisdictional_issues": ["issue 1", "issue 2"],
  "missing_clauses": ["clause 1", "clause 2"],
  "loopholes": ["loophole 1", "loophole 2"],
  "recommendations": ["recommendation 1", "recommendation 2"]
}`

    const auditResponse = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4096,
      messages: [{
        role: "user",
        content: auditPrompt,
      }],
    })

    // Parse AI analysis
    let analysis: DocumentAnalysis
    const responseText = auditResponse.content[0].type === 'text' 
      ? auditResponse.content[0].text 
      : '{}'
    
    try {
      // Extract JSON from response (may be wrapped in markdown code blocks)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : {
        summary: ['Analysis could not be parsed'],
        risk_rating: 'medium',
        jurisdictional_issues: [],
        missing_clauses: [],
        loopholes: [],
        recommendations: []
      }
    } catch (e) {
      console.error('Error parsing AI response:', e)
      analysis = {
        summary: ['Analysis could not be parsed'],
        risk_rating: 'medium',
        jurisdictional_issues: [],
        missing_clauses: [],
        loopholes: [],
        recommendations: []
      }
    }

    // Update document with raw text and AI analysis
    const { error: updateError } = await supabaseClient
      .from('documents')
      .update({
        raw_text: extractedText,
        ai_analysis: analysis,
      })
      .eq('id', document_id)

    if (updateError) {
      throw updateError
    }

    // Chunk the document for RAG (500 characters with 50 character overlap)
    const chunkSize = 500
    const overlap = 50
    const chunks: string[] = []
    
    for (let i = 0; i < extractedText.length; i += (chunkSize - overlap)) {
      chunks.push(extractedText.slice(i, i + chunkSize))
    }

    // Generate embeddings for each chunk using Claude
    // Note: Anthropic doesn't have a native embedding API, so we'll use a workaround
    // In production, consider using OpenAI embeddings or Cohere
    const embeddingPromises = chunks.map(async (chunk, index) => {
      // For now, we'll create a simple embedding using text characteristics
      // In production, replace this with actual embedding API
      const embedding = await generateSimpleEmbedding(chunk)
      
      return {
        document_id,
        content: chunk,
        embedding: JSON.stringify(embedding),
        chunk_index: index,
      }
    })

    const chunkData = await Promise.all(embeddingPromises)

    // Insert chunks into database
    const { error: chunksError } = await supabaseClient
      .from('document_chunks')
      .insert(chunkData)

    if (chunksError) {
      console.error('Error inserting chunks:', chunksError)
      // Don't throw - we still have the main analysis
    }

    return new Response(
      JSON.stringify({
        success: true,
        document_id,
        analysis,
        chunks_created: chunks.length,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error processing document:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})

// Helper function to generate simple embeddings
// In production, replace with OpenAI or Cohere embeddings API
async function generateSimpleEmbedding(text: string): Promise<number[]> {
  // This is a placeholder - in production use proper embedding API
  const embedding = new Array(1536).fill(0)
  for (let i = 0; i < text.length && i < 1536; i++) {
    embedding[i] = text.charCodeAt(i) / 255
  }
  return embedding
}
