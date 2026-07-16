import { Check } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'

interface PricingTier {
  name: string
  price: string
  currency: string
  tagline: string
  features: string[]
  disclaimer?: string
  popular?: boolean
  cta: string
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Essential',
    price: '349',
    currency: 'R',
    tagline: 'Affordable legal clarity, on demand.',
    features: [
      'Unlimited Template Library Downloads',
      'In-App AI Contract Checker',
      'Instant AI feedback on uploaded documents',
      '1 Short Diagnostic Chat (15 mins) with a lawyer per month',
      'Email support within 48 hours',
    ],
    cta: 'Start Essential',
  },
  {
    name: 'Professional',
    price: '899',
    currency: 'R',
    tagline: 'SMEs, growing startups, serious operators.',
    popular: true,
    features: [
      'Everything in Essential',
      '2 Attorney Consultations per month (20 mins each)',
      '1 Attorney-Verified Template Customization per month',
      'AI drafts, partner lawyer reviews and signs off within 24 hours',
      'Priority email support',
      'Document version control',
    ],
    cta: 'Start Professional',
  },
  {
    name: 'Enterprise',
    price: '2,399',
    currency: 'R',
    tagline: 'Established businesses & high-growth startups.',
    features: [
      'Everything in Professional',
      'Multi-user access (up to 5 team members)',
      '3 Custom Attorney-Approved Drafts/Reviews per month',
      'Priority response queue (within 12 hours)',
      'Dedicated account manager',
      'Custom contract templates',
      'Advanced analytics and reporting',
    ],
    disclaimer: 'Requires a minimum 3-month commitment to prevent abuse.',
    cta: 'Contact Sales',
  },
]

export function Pricing() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Transparent, Flexible Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your legal needs. All plans include our proprietary AI 
            technology with licensed attorney oversight.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative flex flex-col ${
                tier.popular
                  ? 'border-primary shadow-xl scale-105'
                  : 'border-border'
              }`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription className="text-base min-h-[3rem]">
                  {tier.tagline}
                </CardDescription>
                <div className="pt-4">
                  <span className="text-5xl font-bold">
                    {tier.currency}{tier.price}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>

              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {tier.disclaimer && (
                  <div className="mt-6 p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground italic">
                      * {tier.disclaimer}
                    </p>
                  </div>
                )}
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                  variant={tier.popular ? 'default' : 'outline'}
                >
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="bg-muted/50 border border-border rounded-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-center">
            How Monogamy.legal Works
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                1
              </div>
              <h4 className="font-semibold mb-2">AI Does the Heavy Lifting</h4>
              <p className="text-sm text-muted-foreground">
                Our advanced AI analyzes, drafts, and checks your documents for issues and compliance.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                2
              </div>
              <h4 className="font-semibold mb-2">Licensed Attorney Review</h4>
              <p className="text-sm text-muted-foreground">
                Independent, verified lawyers in your jurisdiction review, customize, and approve everything.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                3
              </div>
              <h4 className="font-semibold mb-2">You Get Protection</h4>
              <p className="text-sm text-muted-foreground">
                Top-tier legal protection at a fraction of standard billable rates. Fast, reliable, compliant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
