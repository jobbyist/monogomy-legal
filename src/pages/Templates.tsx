import { useState, useEffect } from 'react'
import { FileText, Lock, Sparkles } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'

interface Template {
  id: string
  title: string
  description: string
  category: string
  jurisdiction: string | null
  preview_url: string | null
}

export default function Templates() {
  const navigate = useNavigate()
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    checkAuth()
    fetchTemplates()
  }, [])

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    setIsAuthenticated(!!session)
  }

  async function fetchTemplates() {
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('is_active', true)
        .order('category')

      if (error) throw error
      setTemplates(data || [])
    } catch (err) {
      console.error('Error fetching templates:', err)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['all', ...new Set(templates.map(t => t.category))]
  
  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(t => t.category === selectedCategory)

  const handleCustomize = (templateId: string) => {
    if (!isAuthenticated) {
      navigate('/signup')
      return
    }
    navigate(`/dashboard/customize/${templateId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading templates...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Legal Document Templates
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional, jurisdiction-specific templates drafted by our AI and verified by 
            licensed attorneys in South Africa, Kenya, and Nigeria.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <FileText className="h-8 w-8 text-primary" />
                  <Badge variant="secondary" className="capitalize">
                    {template.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{template.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {template.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow">
                {template.jurisdiction && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline">{template.jurisdiction}</Badge>
                    <span>jurisdiction-specific</span>
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex gap-2">
                {isAuthenticated ? (
                  <Button
                    className="w-full"
                    onClick={() => handleCustomize(template.id)}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Customize with AI
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => navigate('/pricing')}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Subscribe to Unlock
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">
            No templates found in this category.
          </p>
        )}
      </div>
    </div>
  )
}
