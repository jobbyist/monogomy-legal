import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Zap, Star, Shield, ArrowRight } from 'lucide-react';
import { analytics } from '@/lib/analytics';
import CurrencyConverter from '@/components/CurrencyConverter';

type Currency = 'USD' | 'EUR' | 'ZAR' | 'NGN' | 'KES';

const currencyConfig: Record<Currency, { symbol: string; rate: number; label: string }> = {
  USD: { symbol: '$', rate: 1, label: 'USD' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR' },
  ZAR: { symbol: 'R', rate: 18.87, label: 'ZAR' },
  NGN: { symbol: '₦', rate: 1630, label: 'NGN' },
  KES: { symbol: 'KSh', rate: 129, label: 'KES' },
};

const plans = [
  {
    id: 'essential',
    name: 'Essential',
    priceZAR: 349,
    tagline: 'Affordable legal clarity, on demand.',
    description: 'Perfect for individuals seeking basic legal protection',
    icon: Zap,
    popular: false,
    features: [
      'Unlimited Template Library Downloads',
      'In-App AI Contract Checker',
      'Instant AI feedback on uploaded documents',
      '1 Short Diagnostic Chat (15 mins max) with a lawyer per month',
      'Email support within 48 hours',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    priceZAR: 899,
    tagline: 'SMEs, growing startups, serious operators.',
    description: 'Ideal for: SMEs, growing startups, serious operators',
    icon: Star,
    popular: true,
    features: [
      'Everything in Essential, plus:',
      '2 Attorney Consultations per month (20 mins each)',
      '1 Attorney-Verified Template Customization per month',
      'AI drafts, partner lawyer reviews and signs off within 24 hours',
      'Priority email support',
      'Document version control',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    priceZAR: 2399,
    tagline: 'Established businesses & high-growth startups.',
    description: 'Ideal for: Established businesses, high-growth startups, agencies',
    icon: Shield,
    popular: false,
    features: [
      'Everything in Professional, plus:',
      'Multi-user access (up to 5 team members)',
      '3 Custom Attorney-Approved Drafts/Reviews per month',
      'Priority response queue (within 12 hours)',
      'Dedicated account manager',
      'Custom contract templates',
      'Advanced analytics and reporting',
    ],
    disclaimer: 'Requires a minimum 3-month commitment to prevent abuse.',
  },
];

const Membership = () => {
  const [currency, setCurrency] = useState<Currency>('USD');

    const { symbol, rate } = currencyConfig[currency];    
    const { symbol, rate } = currencyConfig[currency];
    const amount = (usd * rate).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `${symbol}${amount}`;
  };
  const convertFromZAR = (zar: number) => {
    // Convert from ZAR base to selected currency
    const zarRate = currencyConfig.ZAR.rate
    const usdAmount = zar / zarRate
    const { symbol, rate } = currencyConfig[currency]
    const converted = (usdAmount * rate).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    return `${symbol}${converted}`
  }


  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main id="main-content">
        {/* Hero */}
        <section className="relative py-24 bg-gradient-to-b from-primary/10 via-primary/5 to-background overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
          <div className="container-blog relative text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Simple, Transparent Pricing
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
              AI-Powered Legal Services That Scale
            </h1>
            <p className="text-xl text-muted-foreground">
              Advanced AI technology meets licensed attorney expertise. Get top-tier legal 
              protection at a fraction of traditional costs. No hidden fees. No surprises.
            </p>
            <p className="text-sm text-muted-foreground italic">
              All prices in ZAR. Convert to your local currency below.
            </p>
          </div>
        </section>

        {/* Currency Selector */}
        <section className="py-6 bg-muted/40 border-y border-border">
          <div className="container-blog flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">View pricing in:</span>
            {(Object.keys(currencyConfig) as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
                  currency === c
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {currencyConfig[c].label} {currencyConfig[c].symbol}
              </button>
            ))}
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20">
          <div className="container-blog">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => {
                const Icon = plan.icon;
                return (
                  <Card
                    key={plan.id}
                    className={`relative flex flex-col transition-all duration-300 hover:shadow-xl rounded-2xl ${
                      plan.popular
                        ? 'border-2 border-primary shadow-lg scale-[1.02]'
                        : 'border border-border hover:border-primary/40'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full shadow">
                        MOST POPULAR
                      </div>
                    )}
                    <CardHeader className={`pb-6 ${plan.popular ? 'bg-gradient-to-b from-primary/8 to-transparent' : ''} rounded-t-2xl`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan.popular ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <CardTitle className="font-heading text-xl">{plan.name}</CardTitle>
                      </div>
                        <span className="text-4xl font-bold text-foreground">{convertFromZAR(plan.priceZAR)}</span>
                        <span className="text-4xl font-bold text-foreground">{fmt(plan.priceUSD)}</span>
                        <span className="text-muted-foreground text-sm ml-1">/month</span>
                      </div>
                      <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                        {plan.description}
                      </CardDescription>
                      <p className="text-sm font-medium text-primary mt-2 italic">"{plan.tagline}"</p>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col gap-6">
                      <ul className="space-y-3 flex-1">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className={feature.startsWith('Everything') ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
                              {feature}
                            </span>
                      
                      {plan.disclaimer && (
                        <div className="bg-muted/50 p-3 rounded-lg text-xs text-muted-foreground italic border border-border">
                          * {plan.disclaimer}
                        </div>
                      )}

                          </li>
                        ))}
                      </ul>
                      <Button
                        size="lg"
                        className={`w-full rounded-xl hover:scale-[1.02] transition-transform ${plan.popular ? '' : 'variant-outline'}`}
                        variant={plan.popular ? 'default' : 'outline'}
                        asChild
                      >
                        <Link to="/signup">
                          Get Started <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

              <strong>Important:</strong> Monogamy.legal is a technology platform, not a law firm. 
              All legal advice and document approvals are provided by independent, licensed attorneys. 
              <br />
              <span className="font-semibold text-foreground">30-day money-back guarantee</span> · Cancel anytime
              All plans include a <span className="font-semibold text-foreground">30-day money-back guarantee</span>. No contracts. Cancel anytime.
            </p>
          </div>
        </section>

        {/* Currency Converter */}
        <section className="py-16 bg-muted/50">
          <div className="container-blog max-w-2xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-center mb-8">Currency Converter</h2>
            <CurrencyConverter />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container-blog max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-center mb-12">Common Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Can I upgrade or downgrade at any time?',
                  a: 'Yes. You can change your plan at any time. Upgrades take effect immediately; downgrades apply at the next billing cycle.',
                },
                {
                  q: 'How does the AI + attorney process work?',
                  a: 'Our AI analyzes and drafts your documents in seconds. Then, a licensed attorney in your jurisdiction reviews, customizes, and officially approves it before delivery. You get the speed of AI with the reliability of human expertise.',
                },
                {
                  q: 'Is Monogamy.legal a law firm?',
                  a: 'No. We are a technology platform. All legal advice, reviews, and approvals are provided by independent, licensed attorneys who are members of our network and maintain their own professional liability insurance.',
                },
                {
                  q: 'What is the turnaround time?',
                  a: 'Essential: 48 hours for human responses. Professional: 24 hours for attorney reviews. Enterprise: 12 hours priority queue. AI analysis is instant.',
                },
                {
                  q: 'Is my data confidential?',
                  a: 'Absolutely. All communications and documents are encrypted. Attorney-client privilege applies to work done by attorneys on our network.',
                },
                {
                  q: 'Which jurisdictions do you cover?',
                  a: 'We currently operate in South Africa, Kenya, and Nigeria. All attorneys are licensed and verified in their respective jurisdictions and comply with local bar association requirements.',
                },
                {
                  q: 'Which countries are covered?',
                  a: 'We currently serve clients across South Africa, Nigeria, and Kenya, with cross-border advisory available on the Professional and Enterprise plans.',
                },
              ].map(({ q, a }) => (
                <Card key={q}>
                  <CardHeader>
                    <CardTitle className="text-base">{q}</CardTitle>
                    <CardDescription>{a}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container-blog text-center space-y-6 max-w-3xl mx-auto">
              Ready to Transform Your Legal Workflow?
              Stop guessing. Start knowing.
            </h2>
              Join businesses and individuals across Africa using AI-powered legal technology 
              backed by licensed attorneys. Predictable pricing. Professional quality.
              Join thousands of individuals and businesses across Africa who have replaced unpredictable legal bills with a smart, subscription-based legal team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="hover:scale-105 transition-transform rounded-xl">
                <Link to="/signup">Start Your Subscription</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-xl" asChild>
                <Link to="/attorneys">Browse Attorneys</Link>
              </Button>
            </div>
            <p className="text-sm opacity-70">30-day money-back guarantee · No long-term contracts · Cancel anytime</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Membership;
