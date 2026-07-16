import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Checkbox } from '../components/ui/checkbox'
import { Textarea } from '../components/ui/textarea'
import { Alert, AlertDescription } from '../components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { supabase } from '../services/supabaseClient'

const countries = [
  { code: 'ZA', name: 'South Africa' },
  { code: 'KE', name: 'Kenya' },
  { code: 'NG', name: 'Nigeria' },
]

const practiceAreas = [
  'Family Law',
  'Corporate Law',
  'Contract Law',
  'Property Law',
  'Employment Law',
  'Intellectual Property',
  'Tax Law',
  'Criminal Law',
]

export default function AttorneyOnboarding() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    bar_number: '',
    jurisdiction: '',
    practice_areas: [] as string[],
    years_experience: '',
    bio: '',
    paystack_email: '',
  })

  const togglePracticeArea = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      practice_areas: prev.practice_areas.includes(area)
        ? prev.practice_areas.filter((a) => a !== area)
        : [...prev.practice_areas, area],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/login')
        return
      }

      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          country: formData.jurisdiction as any,
          role: 'attorney',
          onboarding_completed: true,
          onboarding_metadata: {
            completed_at: new Date().toISOString(),
          },
        })
        .eq('id', user.id)

      if (profileError) throw profileError

      // Create attorney profile
      const { error: attorneyError } = await supabase
        .from('attorney_profiles')
        .insert({
          profile_id: user.id,
          bar_number: formData.bar_number,
          jurisdiction: formData.jurisdiction as any,
          practice_areas: formData.practice_areas,
          years_experience: parseInt(formData.years_experience) || 0,
          bio: formData.bio,
          paystack_payout_details: {
            email: formData.paystack_email,
          },
          verified: false,
        })

      if (attorneyError) throw attorneyError

      navigate('/attorney/pending-verification')
    } catch (err) {
      console.error('Attorney onboarding error:', err)
      alert('Error completing onboarding. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-muted/20">
      <div className="container mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Attorney Registration</CardTitle>
            <CardDescription className="text-base">
              Join our network of verified legal professionals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Your application will be reviewed by our team. You'll be able to start accepting cases once verified.
              </AlertDescription>
            </Alert>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bar_number">Bar Registration Number</Label>
                  <Input
                    id="bar_number"
                    value={formData.bar_number}
                    onChange={(e) => setFormData({ ...formData, bar_number: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jurisdiction">Jurisdiction</Label>
                  <Select value={formData.jurisdiction} onValueChange={(value) => setFormData({ ...formData, jurisdiction: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select jurisdiction" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="years_experience">Years of Experience</Label>
                <Input
                  id="years_experience"
                  type="number"
                  min="0"
                  value={formData.years_experience}
                  onChange={(e) => setFormData({ ...formData, years_experience: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Practice Areas (Select all that apply)</Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {practiceAreas.map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <Checkbox
                        id={area}
                        checked={formData.practice_areas.includes(area)}
                        onCheckedChange={() => togglePracticeArea(area)}
                      />
                      <label htmlFor={area} className="text-sm cursor-pointer">
                        {area}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Brief overview of your experience and expertise..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paystack_email">Paystack Email (for payouts)</Label>
                <Input
                  id="paystack_email"
                  type="email"
                  value={formData.paystack_email}
                  onChange={(e) => setFormData({ ...formData, paystack_email: e.target.value })}
                  placeholder="email@example.com"
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
