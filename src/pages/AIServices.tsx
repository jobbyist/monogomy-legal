import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Bot,
  Mic,
  Workflow,
  ArrowRight,
  CheckCircle,
  Zap,
  Mail,
  FileText,
  CreditCard,
  Calendar,
  Clock,
  BarChart3,
  Shield,
  Star,
  Users,
  MessageSquare,
  Phone,
  Globe,
} from 'lucide-react';

const features = [
  {
    category: 'Client Support & Intake',
    icon: Bot,
    color: 'violet',
    headline: 'AI Support Chatbot',
    description:
      'Deploy a 24/7 AI-powered client intake assistant on your firm website. Automatically qualify incoming leads, collect matter details, answer common questions, and book consultations — without lifting a finger.',
    capabilities: [
      'Automated client intake & qualification',
      'Smart FAQ responses trained on your practice areas',
      'Seamless consultation booking & calendar sync',
      'Multilingual support (English, Swahili, Yoruba, Zulu, French)',
      'Escalation to live attorney on complex queries',
      'Full conversation history & lead tracking',
    ],
  },
  {
    category: 'Client Support & Intake',
    icon: Mic,
    color: 'blue',
    headline: 'AI Voice Assistant',
    description:
      'Give clients the option to speak directly with an intelligent voice AI. Handle inbound calls, screen potential clients, and collect case information — any time of day, even outside office hours.',
    capabilities: [
      'Inbound call handling & screening',
      'Voice-based matter intake & triage',
      'After-hours client query resolution',
      'Auto-generated call transcripts & summaries',
      'Voicemail-to-action with smart follow-up',
      'Configurable routing to attorneys by practice area',
    ],
  },
  {
    category: 'Workflow Automation',
    icon: Mail,
    color: 'emerald',
    headline: 'Email Management',
    description:
      'Stop losing hours to your inbox. Our AI categorises, prioritises, and drafts replies to routine client emails — so you can focus on the matters that need your expertise.',
    capabilities: [
      'Auto-categorise incoming emails by matter type',
      'Priority inbox for urgent client communications',
      'AI-drafted responses for routine inquiries',
      'Conflict-check triggers on new enquiries',
      'Email-to-task conversion for follow-ups',
      'Integration with Outlook, Gmail, and more',
    ],
  },
  {
    category: 'Workflow Automation',
    icon: CreditCard,
    color: 'amber',
    headline: 'Billing & Invoicing',
    description:
      'Automate your entire billing cycle — from time capture to invoice dispatch and payment reconciliation — cutting the time your team spends on admin by up to 80%.',
    capabilities: [
      'Automated time tracking from calendar & activity',
      'Instant invoice generation from matter records',
      'Recurring billing schedules for retainer clients',
      'Payment reminders and overdue escalation',
      'Multi-currency support (ZAR, NGN, KES, USD)',
      'Integration with Xero, QuickBooks, and Wave',
    ],
  },
  {
    category: 'Workflow Automation',
    icon: FileText,
    color: 'rose',
    headline: 'Document Management',
    description:
      'Organise, draft, and manage legal documents with AI assistance. Automatically populate standard agreements, manage version control, and ensure your documents are always audit-ready.',
    capabilities: [
      'AI-assisted contract and letter drafting',
      'Automated document assembly from templates',
      'Version control and approval workflows',
      'Secure document storage with matter tagging',
      'E-signature integration (DocuSign, SignWell)',
      'Compliance-ready audit trail for all documents',
    ],
  },
  {
    category: 'Workflow Automation',
    icon: Calendar,
    color: 'teal',
    headline: 'Task & Calendar Automation',
    description:
      'Never miss a deadline. Our system automatically creates tasks and calendar events from matter updates, court dates, and client commitments — and keeps your whole team in sync.',
    capabilities: [
      'Automatic deadline extraction from documents',
      'Court date and docket management',
      'Team task assignment and progress tracking',
      'Client milestone notifications and reminders',
      'Integration with Google Calendar and Outlook',
      'Daily AI-generated priority briefings',
    ],
  },
];

const plans = [
  {
    id: 'pro',
    name: 'Pro',
    price: '$99',
    priceNote: '/month',
    badge: null,
    included: [
      'AI Support Chatbot for client intake',
      'AI Voice Assistant for client queries',
      'Email management automation',
      'Billing & invoicing automation',
      'Document management (up to 500 docs/month)',
      'Task & calendar automation',
    ],
    cta: 'Start with Pro',
    highlight: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '$249',
    priceNote: '/month',
    badge: null,
    included: [
      'Everything in Pro',
      'Advanced AI chatbot + voice assistant suite',
      'Full workflow automation platform',
      'Custom AI automation workflows',
      'Unlimited document processing',
      'Dedicated AI setup & training session',
      'Priority AI support & SLA',
    ],
    cta: 'Go Elite',
    highlight: false,
  },
];

const stats = [
  { value: '80%', label: 'Reduction in admin time' },
  { value: '24/7', label: 'Client intake coverage' },
  { value: '3×', label: 'Faster matter intake' },
  { value: '60%', label: 'Fewer missed follow-ups' },
];

const testimonials = [
  {
    quote: 'The AI chatbot alone paid for itself in the first month. Clients get instant responses at 2am, and I wake up to qualified leads in my inbox.',
    name: 'Sipho Ndlovu',
    role: 'Commercial Lawyer, Johannesburg',
  },
  {
    quote: 'Automated billing cut our invoice cycle from 2 weeks to 24 hours. Cash flow has never been healthier.',
    name: 'Wanjiru Kamau',
    role: 'Managing Partner, Nairobi',
  },
  {
    quote: 'Our intake volume doubled after deploying the voice assistant. We never miss a potential client call anymore.',
    name: 'Adaeze Okonkwo',
    role: 'Partner, Lagos',
  },
];

const colorMap: Record<string, string> = {
  violet: 'bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800',
  blue: 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  emerald: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  amber: 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  rose: 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800',
  teal: 'bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-800',
};

const AIServices = () => {
  const intakeFeatures = features.filter((f) => f.category === 'Client Support & Intake');
  const automationFeatures = features.filter((f) => f.category === 'Workflow Automation');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content">

        {/* HERO */}
        <section className="relative py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/15 via-primary/5 to-background pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(139,92,246,0.15),transparent)] pointer-events-none" />
          <div className="container-blog relative max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 px-4 py-1.5 rounded-full text-sm font-semibold border border-violet-200 dark:border-violet-800">
              <Bot className="w-4 h-4" />
              AI-Powered Toolkit for Lawyers
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground leading-tight animate-slide-in">
              Your practice, running<br className="hidden md:block" />{' '}
              <span className="text-violet-600 dark:text-violet-400">smarter.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Intelligent client intake, AI voice assistants, and workflow automation purpose-built for African law firms. Stop spending your billable hours on admin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="rounded-xl hover:scale-105 transition-transform shadow-lg bg-violet-600 hover:bg-violet-700 text-white"
                asChild
              >
                <Link to="/partners">
                  Get Started on Pro or Elite <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl hover:scale-105 transition-transform" asChild>
                <a href="#features">See All Features</a>
              </Button>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-14 bg-muted/40 border-y border-border">
          <div className="container-blog max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center space-y-1">
                  <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">{value}</div>
                  <div className="text-sm text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLIENT SUPPORT & INTAKE */}
        <section id="features" className="py-20">
          <div className="container-blog max-w-6xl mx-auto">
            <div className="text-center mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-900/50 px-3 py-1 rounded-full border border-violet-200 dark:border-violet-800">
                <MessageSquare className="w-3.5 h-3.5" /> Client Support & Intake
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Never miss a client again</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Respond to every enquiry instantly — day or night — with AI-powered chatbots and voice assistants.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {intakeFeatures.map((feature) => {
                const Icon = feature.icon;
                const colorCls = colorMap[feature.color];
                return (
                  <Card key={feature.headline} className="rounded-2xl hover:shadow-lg transition-all border border-border">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 border ${colorCls}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="font-heading text-xl">{feature.headline}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feature.capabilities.map((cap) => (
                          <li key={cap} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" />
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CHATBOT DEMO VISUAL */}
        <section className="py-16 bg-gradient-to-br from-violet-50 to-background dark:from-violet-950/20 border-y border-violet-100 dark:border-violet-900">
          <div className="container-blog max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-5">
                <h2 className="text-3xl font-heading font-bold">See the chatbot in action</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your AI intake assistant works around the clock — qualifying leads, answering questions, and booking consultations while you sleep. Deploy it on your website in minutes with no technical knowledge required.
                </p>
                <ul className="space-y-2.5">
                  {[
                    'Custom-trained on your practice areas and FAQs',
                    'Integrates with your existing website (any platform)',
                    'Full conversation logs and lead analytics',
                    'White-labelled with your firm branding',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-violet-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Chat UI mockup */}
              <div className="flex-shrink-0 w-full max-w-sm">
                <div className="bg-background rounded-2xl border border-violet-200 dark:border-violet-800 shadow-2xl overflow-hidden">
                  {/* Chat header */}
                  <div className="bg-violet-600 text-white px-4 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Legal Assistant</p>
                      <p className="text-xs opacity-80">● Online · Powered by Monogamy AI</p>
                    </div>
                  </div>
                  {/* Messages */}
                  <div className="p-4 space-y-3 bg-muted/30">
                    {[
                      { side: 'bot', text: "👋 Hi! Welcome to Okonkwo & Associates. How can I help you today?" },
                      { side: 'user', text: "I need help with a commercial lease dispute." },
                      { side: 'bot', text: "I can help with that. Are you the landlord or tenant in this matter?" },
                      { side: 'user', text: "I'm the tenant. The landlord is trying to evict me unlawfully." },
                      { side: 'bot', text: "Understood. Our commercial property team handles exactly these matters. May I take your details to schedule a consultation?" },
                    ].map((msg, i) => (
                      <div key={i} className={`flex ${msg.side === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] text-xs px-3 py-2 rounded-2xl leading-relaxed ${msg.side === 'user' ? 'bg-violet-600 text-white rounded-br-sm' : 'bg-background text-foreground shadow-sm rounded-bl-sm border border-border'}`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Input */}
                  <div className="p-3 border-t border-border bg-background">
                    <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2 text-xs text-muted-foreground">
                      <span className="flex-1">Type your message...</span>
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORKFLOW AUTOMATION */}
        <section className="py-20">
          <div className="container-blog max-w-6xl mx-auto">
            <div className="text-center mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                <Workflow className="w-3.5 h-3.5" /> Workflow Automation
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Automate the work that never stops</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                From emails to invoices to documents — our automation tools handle your daily grind so your team can focus on law.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {automationFeatures.map((feature) => {
                const Icon = feature.icon;
                const colorCls = colorMap[feature.color];
                return (
                  <Card key={feature.headline} className="rounded-2xl hover:shadow-lg transition-all border border-border group">
                    <CardHeader className="pb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 border ${colorCls} group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <CardTitle className="font-heading text-base">{feature.headline}</CardTitle>
                      <CardDescription className="text-xs leading-relaxed line-clamp-3">{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1.5">
                        {feature.capabilities.slice(0, 4).map((cap) => (
                          <li key={cap} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                            <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-16 bg-muted/50 border-y border-border">
          <div className="container-blog max-w-5xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-center mb-10">What lawyers are saying</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map(({ quote, name, role }) => (
                <Card key={name} className="rounded-2xl border border-border">
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <blockquote className="text-sm text-foreground leading-relaxed">"{quote}"</blockquote>
                    <div>
                      <p className="text-sm font-semibold">{name}</p>
                      <p className="text-xs text-muted-foreground">{role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="py-20">
          <div className="container-blog max-w-3xl mx-auto">
            <div className="text-center mb-12 space-y-3">
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Available on Pro &amp; Elite</h2>
              <p className="text-lg text-muted-foreground">
                AI tools and workflow automation are included with your Monogamy partner subscription.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`rounded-2xl flex flex-col transition-all hover:shadow-xl ${
                    plan.highlight
                      ? 'border-2 border-violet-500 shadow-lg'
                      : 'border border-border'
                  }`}
                >
                  <CardHeader className={`rounded-t-2xl ${plan.highlight ? 'bg-gradient-to-b from-violet-500/10 to-transparent' : ''}`}>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-heading text-xl">{plan.name}</CardTitle>
                      {plan.highlight && (
                        <span className="text-xs font-bold bg-violet-600 text-white px-2.5 py-1 rounded-full">
                          ⭐ POPULAR
                        </span>
                      )}
                    </div>
                    <div className="mt-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-sm text-muted-foreground ml-1">{plan.priceNote}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col gap-4">
                    <ul className="space-y-2.5 flex-1">
                      {plan.included.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      variant={plan.highlight ? 'default' : 'outline'}
                      className={`w-full rounded-xl ${plan.highlight ? 'bg-violet-600 hover:bg-violet-700 text-white' : ''}`}
                    >
                      <Link to="/partners">{plan.cta} <ArrowRight className="w-4 h-4 ml-2" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
              All AI features are included in your partner plan — no extra setup fees.{' '}
              <Link to="/partners" className="text-primary underline underline-offset-2">
                View all partner plans →
              </Link>
            </p>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 bg-gradient-to-br from-violet-600 to-primary text-white">
          <div className="container-blog max-w-3xl mx-auto text-center space-y-6">
            <Bot className="w-14 h-14 mx-auto opacity-90" />
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              Your AI-powered practice<br className="hidden md:block" /> starts here.
            </h2>
            <p className="text-xl opacity-90 max-w-xl mx-auto">
              Join Monogamy on the Pro or Elite plan and get instant access to AI client intake tools, voice assistants, and full workflow automation.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="rounded-xl hover:scale-105 transition-transform text-base px-10 shadow-lg"
              asChild
            >
              <Link to="/partners">
                Apply as a Partner <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <p className="text-sm opacity-70">No risk. Cancel anytime. Full AI toolkit included with Pro &amp; Elite.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AIServices;
