import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PartnerLeadForm } from '@/components/PartnerLeadForm';
import {
  TrendingUp, Users, CheckCircle, Star, Shield, Zap,
  MessageSquare, Globe, ArrowRight, ChevronLeft, ChevronRight, Award, DollarSign,
  Bot, Workflow, Mic
} from 'lucide-react';

// Placeholder logos (text-based for now — swap with real SVGs in production)
const partnerLogos = [
  { name: 'DocuSign', bg: 'bg-blue-50 dark:bg-blue-950', text: 'text-blue-600 dark:text-blue-400' },
  { name: 'The LegalTech Fund', bg: 'bg-emerald-50 dark:bg-emerald-950', text: 'text-emerald-700 dark:text-emerald-400' },
  { name: 'Clio', bg: 'bg-violet-50 dark:bg-violet-950', text: 'text-violet-600 dark:text-violet-400' },
  { name: 'OpenAI', bg: 'bg-gray-50 dark:bg-gray-900', text: 'text-gray-800 dark:text-gray-200' },
  { name: 'Clerk', bg: 'bg-orange-50 dark:bg-orange-950', text: 'text-orange-600 dark:text-orange-400' },
];

const testimonials = [
  {
    name: 'Adaeze Okonkwo',
    role: 'Partner, Okonkwo & Associates (Lagos)',
    quote:
      "Monogamy has transformed how we acquire clients. We used to spend 30% of revenue on marketing. Now our pipeline is predictable and our ROI is clear.",
    rating: 5,
  },
  {
    name: 'Sipho Ndlovu',
    role: 'Solo Practitioner, Commercial Law (Johannesburg)',
    quote:
      "As a solo lawyer, client acquisition was my biggest headache. Monogamy sends me pre-qualified leads that actually convert. I closed three contracts in my first month.",
    rating: 5,
  },
  {
    name: 'Wanjiru Kamau',
    role: 'Managing Partner, Kamau Legal Group (Nairobi)',
    quote:
      "The smart matching system is exceptional. Our clients arrive already knowing what they need. It cuts down on discovery time and gets us to billable work faster.",
    rating: 5,
  },
  {
    name: 'Emeka Chukwu',
    role: 'Senior Associate, Chukwu & Partners (Abuja)',
    quote:
      "The cross-border deal flow is a game-changer. We're now working on matters in three countries we never would have reached through traditional referrals.",
    rating: 5,
  },
];

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'Free',
    priceNote: 'Forever',
    description: 'Test the waters. Build your profile and start getting discovered.',
    features: [
      'Basic lawyer profile listing',
      'Up to 3 lead requests/month',
      'Standard visibility in search results',
      'Access to client messaging (limited)',
      'Access to legal templates marketplace',
    ],
    cta: 'Join Free',
    popular: false,
    highlight: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$39',
    priceNote: '/month',
    description: 'For lawyers ready to build a consistent pipeline.',
    features: [
      'Free custom website included',
      'Up to 15 lead requests/month',
      'Enhanced profile with practice highlights',
      'Priority placement in search',
      'Basic analytics dashboard',
      'Unlimited client messaging',
      'Early access to high-value matters',
    ],
    cta: 'Get Started',
    popular: false,
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$99',
    priceNote: '/month',
    description: 'For growth-stage lawyers and boutique firms serious about scaling.',
    features: [
      'Free custom website included',
      'Up to 40 lead requests/month',
      'Premium profile with video intro',
      'Top-tier visibility & priority ranking',
      'Advanced analytics + CRM integration',
      'Dedicated client success manager',
      'Cross-border lead access (3 countries)',
      '10% off commission on closed deals',
    ],
    cta: 'Go Pro',
    popular: true,
    highlight: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '$249',
    priceNote: '/month',
    description: 'Unlimited deal flow for established firms with high-volume ambitions.',
    features: [
      'Free custom website included',
      'Unlimited lead requests',
      'Featured placement at top of all searches',
      'White-glove onboarding & account management',
      'Full CRM suite + client lifecycle tools',
      'Legal risk monitoring for your clients',
      'Africa-wide lead access (all regions)',
      '20% off commission on closed deals',
      'Team access (up to 10 lawyers)',
      'Quarterly business strategy session',
    ],
    cta: 'Go Elite',
    popular: false,
    highlight: false,
  },
];

const Partners = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [billingAnnual, setBillingAnnual] = useState(false);

  const nextTestimonial = () => setTestimonialIndex((i) => (i + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  const getPrice = (price: string) => {
    if (price === 'Free') return price;
    const num = parseInt(price.replace('$', ''));
    if (billingAnnual) {
      return `$${Math.round(num * 0.8)}`;
    }
    return price;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main id="main-content">
        {/* HERO */}
        <section className="relative py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-background pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(var(--primary-rgb),0.12),transparent)] pointer-events-none" />
          <div className="container-blog relative max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold animate-fade-in">
              <TrendingUp className="w-4 h-4" />
              Grow Your Practice on Africa's #1 Legal Platform
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground leading-tight animate-slide-in">
              Build a predictable<br className="hidden md:block" /> client pipeline. <span className="text-primary">At scale.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stop relying on referrals and cold outreach. Monogamy connects you with high-intent, pre-qualified clients — continuously — so you can focus on what you do best: practising law.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-xl hover:scale-105 transition-transform shadow-lg" asChild>
                <Link to="/signup">
                  Join the Network <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl hover:scale-105 transition-transform" asChild>
                <Link to="/contact">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* TRUST & CREDIBILITY */}
        <section className="py-16 bg-muted/40 border-y border-border">
          <div className="container-blog">
            <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-10">
              Trusted by top lawyers across Africa
            </p>

            {/* Logo Slider */}
            <div className="flex items-center justify-center gap-4 mb-12 overflow-hidden">
              <div className="flex gap-6 flex-wrap justify-center">
                {partnerLogos.map((logo) => (
                  <div
                    key={logo.name}
                    className={`${logo.bg} ${logo.text} px-6 py-3 rounded-xl font-bold text-sm tracking-tight shadow-sm border border-border/40 hover:shadow-md transition-shadow`}
                  >
                    {logo.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: '1,000+', label: 'Active Clients' },
                { value: '95%', label: 'Match Success Rate' },
                { value: '3', label: 'Countries: SA · NG · KE' },
                { value: '48h', label: 'Avg. Time to First Match' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center space-y-1">
                  <div className="text-3xl font-bold text-primary">{value}</div>
                  <div className="text-sm text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20">
          <div className="container-blog max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground">Four steps to a full client pipeline.</p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Create Your Profile', desc: 'Set up your professional profile with practice areas, credentials, and availability in under 10 minutes.' },
                { step: '02', title: 'Submit Verification Docs', desc: 'Upload your practicing certificate and ID. We verify you quickly — usually within 24 hours.' },
                { step: '03', title: 'Get Matched with Clients', desc: 'Our smart matching engine surfaces you to pre-qualified clients with active legal needs in your practice area.' },
                { step: '04', title: 'Close Deals & Earn', desc: 'Engage directly with clients through our platform. Close matters and get paid — with a low commission on success.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-lg font-bold mx-auto shadow-md hover:scale-110 transition-transform">
                    {step}
                  </div>
                  <h3 className="text-lg font-heading font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="py-20 bg-muted/50">
          <div className="container-blog max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Why Lawyers Choose Monogamy</h2>
              <p className="text-lg text-muted-foreground">We built this platform for lawyers who value their time and want predictable growth.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: TrendingUp, title: 'Predictable Deal Flow', desc: 'Replace the feast-or-famine referral cycle with a consistent stream of inbound client requests matched to your practice area.' },
                { icon: Users, title: 'Pre-Qualified Clients', desc: "Every client arrives through our subscription funnel — meaning they're serious, informed, and ready to engage." },
                { icon: DollarSign, title: 'Lower Acquisition Costs', desc: 'Slash your marketing spend. Our platform replaces expensive ads, PR, and networking events with targeted, intent-based matching.' },
                { icon: Zap, title: 'Smart Matching System', desc: 'Our algorithm matches clients to you based on practice area, jurisdiction, language, availability, and track record.' },
                { icon: MessageSquare, title: 'Built-in Communication', desc: 'Secure messaging, document sharing, and e-signature capabilities — all in one platform. No tool juggling.' },
                { icon: Globe, title: 'Pan-African Reach', desc: 'Tap into cross-border deal flow across South Africa, Nigeria, and Kenya. Expand without opening new offices.' },
              ].map(({ icon: Icon, title, desc }) => (
                <Card key={title} className="hover:shadow-lg transition-all duration-300 rounded-xl">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="font-heading text-lg">{title}</CardTitle>
                    <CardDescription>{desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="py-20">
          <div className="container-blog max-w-6xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Partner Plans</h2>
              <p className="text-lg text-muted-foreground mb-6">Billed monthly, or save 20% with annual billing.</p>
              {/* Billing toggle */}
              <div className="inline-flex items-center gap-4 bg-muted rounded-full px-4 py-2">
                <button
                  onClick={() => setBillingAnnual(false)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${!billingAnnual ? 'bg-background shadow text-foreground' : 'text-muted-foreground'}`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingAnnual(true)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${billingAnnual ? 'bg-background shadow text-foreground' : 'text-muted-foreground'}`}
                >
                  Annual <span className="text-primary font-bold ml-1">–20%</span>
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Free custom website included with all paid plans.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mt-10">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative flex flex-col transition-all duration-300 hover:shadow-xl rounded-2xl ${
                    plan.highlight
                      ? 'border-2 border-primary shadow-lg scale-[1.03]'
                      : 'border border-border hover:border-primary/40'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full shadow">
                      MOST POPULAR
                    </div>
                  )}
                  <CardHeader className={`pb-4 ${plan.highlight ? 'bg-gradient-to-b from-primary/8 to-transparent' : ''} rounded-t-2xl`}>
                    <CardTitle className="font-heading text-lg">{plan.name}</CardTitle>
                    <div className="mt-2">
                      <span className="text-3xl font-bold text-foreground">{getPrice(plan.price)}</span>
                      <span className="text-sm text-muted-foreground ml-1">{plan.priceNote}</span>
                    </div>
                    <CardDescription className="text-sm mt-1">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col gap-4">
                    <ul className="space-y-2.5 flex-1">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      size="default"
                      variant={plan.highlight ? 'default' : 'outline'}
                      className="w-full rounded-xl hover:scale-[1.02] transition-transform"
                      asChild
                    >
                      <Link to="/signup">{plan.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* REVENUE MODEL */}
        <section className="py-16 bg-muted/50 border-y border-border">
          <div className="container-blog max-w-3xl mx-auto text-center space-y-6">
            <Award className="w-12 h-12 text-primary mx-auto" />
            <h2 className="text-2xl md:text-3xl font-heading font-bold">We Win When You Win</h2>
            <p className="text-lg text-muted-foreground">
              Beyond your subscription, Monogamy charges a low <strong className="text-foreground">5–12% commission</strong> on successfully closed matters sourced through the platform. No hidden fees, no upfront risk.
            </p>
            <p className="text-muted-foreground">
              Our model is deliberately performance-based. We're incentivised to send you the best leads possible — because we only earn when you do.
            </p>
            <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mt-4">
              {[
                { label: 'Commission Rate', value: '5–12%' },
                { label: 'On Closed Deals', value: 'Only' },
                { label: 'Hidden Fees', value: 'None' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-background rounded-xl p-4 border border-border shadow-sm">
                  <div className="text-2xl font-bold text-primary">{value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20">
          <div className="container-blog max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-center mb-12">Lawyers Love Monogamy</h2>
            <div className="relative">
              <Card className="rounded-2xl shadow-lg border border-border p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonials[testimonialIndex].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-lg text-foreground leading-relaxed mb-6">
                  "{testimonials[testimonialIndex].quote}"
                </blockquote>
                <div>
                  <p className="font-semibold text-foreground">{testimonials[testimonialIndex].name}</p>
                  <p className="text-sm text-muted-foreground">{testimonials[testimonialIndex].role}</p>
                </div>
              </Card>

              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTestimonialIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === testimonialIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30'}`}
                      aria-label={`View testimonial ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container-blog text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              Your next 100 clients<br className="hidden md:block" /> are already on Monogamy.
            </h2>
            <p className="text-xl opacity-90">
              Join Africa's fastest-growing legal network and start receiving high-intent, pre-qualified clients — starting today.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="rounded-xl hover:scale-105 transition-transform text-base px-8 shadow-lg"
              asChild
            >
              <Link to="/signup">
                Start Receiving Clients <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <p className="text-sm opacity-70">No risk. Free plan available. Upgrade when you're ready.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Partners;
