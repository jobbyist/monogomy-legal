import { useState, useEffect } from 'react'
import { FileText, Calendar, Upload, Plus } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'

interface Document {
  id: string
  title: string
  status: string
  created_at: string
  updated_at: string
}

interface Consultation {
  id: string
  scheduled_at: string
  status: string
  duration_minutes: number
}

export default function ClientDashboard() {
  const navigate = useNavigate()
  const [documents, setDocuments] = useState<Document[]>([])
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    loadDashboardData()
  }, [])

  async function loadDashboardData() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/login')
        return
      }

      const [profileRes, docsRes, consultsRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('documents').select('*').eq('client_id', user.id).order('created_at', { ascending: false }),
        supabase.from('consultations').select('*').eq('client_id', user.id).order('scheduled_at', { ascending: false })
      ])

      if (profileRes.data) setProfile(profileRes.data)
      if (docsRes.data) setDocuments(docsRes.data)
      if (consultsRes.data) setConsultations(consultsRes.data)

      if (profileRes.data && !profileRes.data.onboarding_completed) {
        navigate('/client-onboarding')
      }
    } catch (err) {
      console.error('Error loading dashboard:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      drafted: 'bg-yellow-500',
      pending_review: 'bg-blue-500',
      attorney_approved: 'bg-green-500',
      sent_to_client: 'bg-purple-500',
    }
    return colors[status] || 'bg-gray-500'
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
            Welcome back, {profile?.full_name || 'Client'}
          </h1>
          <p className="text-muted-foreground">
            Manage your legal documents and consultations
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{documents.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Consultations</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{consultations.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
              <Plus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Button size="sm" className="w-full" onClick={() => navigate('/templates')}>
                New Document
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
              <CardDescription>Your latest legal documents</CardDescription>
            </CardHeader>
            <CardContent>
              {documents.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No documents yet</p>
                  <Button onClick={() => navigate('/templates')}>
                    <Upload className="mr-2 h-4 w-4" />
                    Create Your First Document
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {documents.slice(0, 5).map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <div className="flex-1">
                        <h4 className="font-medium">{doc.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Updated {new Date(doc.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status.replace(/_/g, ' ')}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Consultations</CardTitle>
              <CardDescription>Scheduled meetings with attorneys</CardDescription>
            </CardHeader>
            <CardContent>
              {consultations.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No consultations scheduled</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {consultations.slice(0, 5).map((consult) => (
                    <div key={consult.id} className="p-3 border rounded-lg">
                      <p className="font-medium">{new Date(consult.scheduled_at).toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{consult.duration_minutes} minutes</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
