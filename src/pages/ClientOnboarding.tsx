import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Checkbox } from '../components/ui/checkbox'
import { supabase } from '../services/supabaseClient'

const countries = [
  { code: 'ZA', name: 'South Africa' },
  { code: 'KE', name: 'Kenya' },
  { code: 'NG', name: 'Nigeria' },
]

const legalNeeds = [
  'Relationship & Family Law',
  'Corporate & Business',
  'Freelance & Contracts',
  'Property & Real Estate',
  'Employment',
  'Other',
]

export default function ClientOnboarding() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    country: '',
    primary_needs: [] as string[],
  })

  const toggleNeed = (need: string) => {
    setFormData((prev) => ({
      ...prev,
      primary_needs: prev.primary_needs.includes(need)
        ? prev.primary_needs.filter((n) => n !== need)
        : [...prev.primary_needs, need],
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

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          country: formData.country as any,
          role: 'client',
          onboarding_completed: true,
          onboarding_metadata: {
            primary_needs: formData.primary_needs,
            completed_at: new Date().toISOString(),
          },
        })
        .eq('id', user.id)

      if (error) throw error

      navigate('/dashboard')
    } catch (err) {
      console.error('Onboarding error:', err)
      alert('Error completing onboarding. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-muted/20">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl">Welcome to Monogamy.legal</CardTitle>
          <CardDescription className="text-base">
            Let's get you set up. This will only take a minute.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="space-y-2">
              <Label htmlFor="country">Your Country</Label>
              <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your country" />
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

            <div className="space-y-2">
              <Label>What are your primary legal needs? (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-3">
                {legalNeeds.map((need) => (
                  <div key={need} className="flex items-center space-x-2">
                    <Checkbox id={need} checked={formData.primary_needs.includes(need)} onCheckedChange={() => toggleNeed(need)} />
                    <label htmlFor={need} className="text-sm cursor-pointer">
                      {need}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Setting up...' : 'Complete Setup'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
