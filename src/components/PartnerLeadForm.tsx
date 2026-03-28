import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Globe,
  Users,
  Briefcase,
  Star,
  Zap,
  MessageSquare,
  Award,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────

interface FormData {
  // Step 1 — Basic Info
  firmName: string;
  website: string;
  contactName: string;
  email: string;
  phone: string;

  // Step 2 — Region
  regions: string[];

  // Step 3 — Firm Size
  lawyerCount: string;
  officeCount: string;

  // Step 4 — Practice Focus
  practiceAreas: string[];

  // Step 5 — Client Focus
  clientTypes: string[];

  // Step 6 — Reputation & Network
  reputationItems: string[];

  // Step 7 — Technology Adoption
  techItems: string[];

  // Step 8 — Prior Engagement
  engagement: string;

  // Step 9 — Declaration
  declarationAccepted: boolean;
}

const INITIAL_DATA: FormData = {
  firmName: '',
  website: '',
  contactName: '',
  email: '',
  phone: '',
  regions: [],
  lawyerCount: '',
  officeCount: '',
  practiceAreas: [],
  clientTypes: [],
  reputationItems: [],
  techItems: [],
  engagement: '',
  declarationAccepted: false,
};

// ─── Scoring helpers ─────────────────────────────────────────────────────────

const QUALIFYING_SCORE = 8;
const MAX_SCORE = 18;

function computeScore(data: FormData) {
  let score = 0;
  const disqualifiers: string[] = [];

  // Region (required)
  if (data.regions.length === 0) {
    disqualifiers.push('No presence in target markets (SA, NG, or KE required).');
  }

  // Firm Size — max 3 pts
  const lawyers = parseInt(data.lawyerCount, 10);
  if (!isNaN(lawyers)) {
    if (lawyers >= 20) score += 3;
    else if (lawyers >= 5) score += 2;
    else if (lawyers >= 1) score += 1;
    else disqualifiers.push('Firm size is invalid or zero.');
  }

  // Practice Focus — max 3 pts
  const coreAreas = ['Corporate / Commercial', 'Fintech / Financial Services', 'Intellectual Property (IP)', 'Employment & Labour'];
  const hasCore = data.practiceAreas.some((a) => coreAreas.includes(a));
  const hasGeneral = data.practiceAreas.includes('General Practice');
  const consumerOnly =
    data.practiceAreas.length > 0 &&
    data.practiceAreas.every((a) => ['Consumer / Family Law', 'Criminal Law'].includes(a));

  if (consumerOnly) {
    disqualifiers.push('Consumer-only or irrelevant practice areas.');
  } else if (hasCore) {
    score += 3;
  } else if (hasGeneral || data.practiceAreas.length > 0) {
    score += 2;
  }

  // Client Focus — max 2 pts
  const coreClients = ['SMEs', 'Startups / Founders', 'Corporates / Enterprises'];
  const hasConsumerOnly =
    data.clientTypes.length > 0 &&
    data.clientTypes.every((c) => c === 'Individual Consumers');
  const hasCoreClients = data.clientTypes.some((c) => coreClients.includes(c));

  if (hasCoreClients) score += 2;
  else if (!hasConsumerOnly && data.clientTypes.length > 0) score += 1;

  // Reputation & Network — max 3 pts
  const topNetworks = ['Lex Africa Member', 'Chambers / Legal 500 Ranked', 'Best Lawyers Listed'];
  const hasTop = data.reputationItems.some((r) => topNetworks.includes(r));
  const hasOther = data.reputationItems.some((r) => r === 'Other Industry Awards / Networks');

  if (hasTop) score += 3;
  else if (hasOther) score += 2;
  else if (data.reputationItems.length > 0) score += 1;

  // Technology Adoption — max 2 pts
  const hasCRM = data.techItems.includes('Case Management / CRM Software');
  const hasDigital = data.techItems.includes('Active Website + Social Presence');

  if (hasCRM && hasDigital) score += 2;
  else if (hasCRM || hasDigital) score += 1;

  // Engagement — max 2 pts
  if (data.engagement === 'yes') score += 2;
  else if (data.engagement === 'partial') score += 1;

  return { score, disqualifiers };
}

function getSegment(data: FormData) {
  const lawyers = parseInt(data.lawyerCount, 10);
  const coreAreas = ['Fintech / Financial Services', 'Intellectual Property (IP)'];
  const isSpecialist = data.practiceAreas.some((a) => coreAreas.includes(a));

  if (isSpecialist) return 'Specialist Boutique';
  if (isNaN(lawyers)) return 'Unknown';
  if (lawyers >= 20) return 'Corporate Firm';
  if (lawyers >= 5) return 'SME Law Firm';
  return 'Solo / Boutique';
}

// ─── Step components ──────────────────────────────────────────────────────────

interface StepProps {
  data: FormData;
  update: (patch: Partial<FormData>) => void;
}

const STEPS = [
  'Welcome',
  'Basic Info',
  'Region',
  'Firm Size',
  'Practice Focus',
  'Client Focus',
  'Reputation',
  'Technology',
  'Engagement',
  'Declaration',
  'Results',
];

function StepWelcome() {
  return (
    <div className="space-y-6 text-center py-4">
      <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
        <TrendingUp className="w-10 h-10 text-primary" />
      </div>
      <h2 className="text-3xl font-heading font-bold">Partner Application</h2>
      <p className="text-lg text-muted-foreground max-w-md mx-auto">
        We'd love to have your firm on Monogamy. This short qualification form takes
        about <strong>3–5 minutes</strong> and helps us match you to the right client pipeline.
      </p>
      <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto pt-2">
        {[
          { icon: Globe, label: 'SA · NG · KE' },
          { icon: Users, label: 'Pre-qualified Leads' },
          { icon: Award, label: 'Vetted Network' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
            <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

function StepBasicInfo({ data, update }: StepProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-heading font-bold">Tell us about your firm</h2>
        <p className="text-muted-foreground text-sm">We'll use this to create your partner profile.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="firmName">Firm name *</Label>
          <Input
            id="firmName"
            placeholder="e.g. Okonkwo & Associates"
            value={data.firmName}
            onChange={(e) => update({ firmName: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="website">Firm website *</Label>
          <Input
            id="website"
            placeholder="https://yourfirm.com"
            value={data.website}
            onChange={(e) => update({ website: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contactName">Your full name *</Label>
          <Input
            id="contactName"
            placeholder="e.g. Adaeze Okonkwo"
            value={data.contactName}
            onChange={(e) => update({ contactName: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Work email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="adaeze@yourfirm.com"
            value={data.email}
            onChange={(e) => update({ email: e.target.value })}
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="phone">Phone / WhatsApp</Label>
          <Input
            id="phone"
            placeholder="+234 800 000 0000"
            value={data.phone}
            onChange={(e) => update({ phone: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

const REGIONS = [
  { id: 'SA', label: 'South Africa', flag: '🇿🇦' },
  { id: 'NG', label: 'Nigeria', flag: '🇳🇬' },
  { id: 'KE', label: 'Kenya', flag: '🇰🇪' },
];

function StepRegion({ data, update }: StepProps) {
  const toggle = (id: string) => {
    const next = data.regions.includes(id)
      ? data.regions.filter((r) => r !== id)
      : [...data.regions, id];
    update({ regions: next });
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-1">
          <Globe className="w-3.5 h-3.5" /> Required
        </div>
        <h2 className="text-2xl font-heading font-bold">Where is your firm headquartered or operating?</h2>
        <p className="text-muted-foreground text-sm">Select all that apply. Monogamy currently serves SA, NG, and KE markets.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        {REGIONS.map(({ id, label, flag }) => {
          const selected = data.regions.includes(id);
          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all text-center font-semibold text-sm ${
                selected
                  ? 'border-primary bg-primary/8 text-primary shadow-md'
                  : 'border-border hover:border-primary/40 text-foreground'
              }`}
            >
              <span className="text-4xl">{flag}</span>
              {label}
              {selected && <CheckCircle className="w-5 h-5 text-primary" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const LAWYER_RANGES = [
  { value: '1', label: '1 lawyer (solo)', pts: 1 },
  { value: '3', label: '2–4 lawyers', pts: 1 },
  { value: '10', label: '5–19 lawyers', pts: 2 },
  { value: '20', label: '20–49 lawyers', pts: 3 },
  { value: '50', label: '50+ lawyers', pts: 3 },
];

function StepFirmSize({ data, update }: StepProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full mb-1">
          <Users className="w-3.5 h-3.5" /> Firm Size
        </div>
        <h2 className="text-2xl font-heading font-bold">How large is your firm?</h2>
        <p className="text-muted-foreground text-sm">Larger firms unlock more lead volume and priority placement.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {LAWYER_RANGES.map(({ value, label, pts }) => {
          const selected = data.lawyerCount === value;
          return (
            <button
              key={value}
              onClick={() => update({ lawyerCount: value })}
              className={`flex items-center justify-between px-5 py-4 rounded-xl border-2 text-sm font-medium transition-all ${
                selected
                  ? 'border-primary bg-primary/8 text-primary shadow-md'
                  : 'border-border hover:border-primary/40 text-foreground'
              }`}
            >
              <span>{label}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${selected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                +{pts} pts
              </span>
            </button>
          );
        })}
      </div>
      <div className="space-y-1.5 pt-2">
        <Label htmlFor="officeCount">Number of offices</Label>
        <Input
          id="officeCount"
          type="number"
          min={1}
          placeholder="e.g. 2"
          value={data.officeCount}
          onChange={(e) => update({ officeCount: e.target.value })}
          className="max-w-xs"
        />
      </div>
    </div>
  );
}

const PRACTICE_AREAS = [
  { id: 'Corporate / Commercial', core: true },
  { id: 'Fintech / Financial Services', core: true },
  { id: 'Intellectual Property (IP)', core: true },
  { id: 'Employment & Labour', core: true },
  { id: 'General Practice', core: false },
  { id: 'Real Estate / Property', core: false },
  { id: 'Tax Law', core: false },
  { id: 'Consumer / Family Law', core: false },
  { id: 'Criminal Law', core: false },
];

function StepPractice({ data, update }: StepProps) {
  const toggle = (id: string) => {
    const next = data.practiceAreas.includes(id)
      ? data.practiceAreas.filter((a) => a !== id)
      : [...data.practiceAreas, id];
    update({ practiceAreas: next });
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full mb-1">
          <Briefcase className="w-3.5 h-3.5" /> Practice Areas
        </div>
        <h2 className="text-2xl font-heading font-bold">What does your firm specialise in?</h2>
        <p className="text-muted-foreground text-sm">
          Select all practice areas. <span className="text-primary font-semibold">Highlighted areas</span> align with Monogamy's highest-demand client pipeline.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {PRACTICE_AREAS.map(({ id, core }) => {
          const selected = data.practiceAreas.includes(id);
          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                selected && core
                  ? 'border-primary bg-primary/8 text-primary shadow-md'
                  : selected
                  ? 'border-foreground/50 bg-muted'
                  : core
                  ? 'border-primary/30 hover:border-primary/60 text-foreground'
                  : 'border-border hover:border-border/80 text-foreground'
              }`}
            >
              {selected ? (
                <CheckCircle className="w-4 h-4 flex-shrink-0 text-primary" />
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-current flex-shrink-0 opacity-40" />
              )}
              <span className="flex-1">{id}</span>
              {core && (
                <span className="text-xs font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">High-fit</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const CLIENT_TYPES = [
  { id: 'SMEs', label: 'SMEs (Small & Medium Businesses)' },
  { id: 'Startups / Founders', label: 'Startups & Founders' },
  { id: 'Corporates / Enterprises', label: 'Corporates & Enterprises' },
  { id: 'Government / Public Sector', label: 'Government / Public Sector' },
  { id: 'Individual Consumers', label: 'Individual Consumers (personal matters)' },
];

function StepClientFocus({ data, update }: StepProps) {
  const toggle = (id: string) => {
    const next = data.clientTypes.includes(id)
      ? data.clientTypes.filter((c) => c !== id)
      : [...data.clientTypes, id];
    update({ clientTypes: next });
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full mb-1">
          <Users className="w-3.5 h-3.5" /> Client Focus
        </div>
        <h2 className="text-2xl font-heading font-bold">Who does your firm primarily serve?</h2>
        <p className="text-muted-foreground text-sm">
          Monogamy's pipeline is built around SMEs, startups, and corporates. Select all that apply.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 pt-1">
        {CLIENT_TYPES.map(({ id, label }) => {
          const selected = data.clientTypes.includes(id);
          const core = ['SMEs', 'Startups / Founders', 'Corporates / Enterprises'].includes(id);
          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              className={`flex items-center gap-3 px-5 py-4 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                selected && core
                  ? 'border-primary bg-primary/8 text-primary shadow-md'
                  : selected
                  ? 'border-foreground/50 bg-muted'
                  : 'border-border hover:border-primary/30'
              }`}
            >
              {selected ? (
                <CheckCircle className="w-4 h-4 flex-shrink-0 text-primary" />
              ) : (
                <div className="w-4 h-4 rounded border border-current flex-shrink-0 opacity-40" />
              )}
              <span className="flex-1">{label}</span>
              {core && (
                <span className="text-xs text-primary font-semibold bg-primary/10 px-1.5 py-0.5 rounded-full">+2 pts</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const REPUTATION_ITEMS = [
  { id: 'Lex Africa Member', pts: 3 },
  { id: 'Chambers / Legal 500 Ranked', pts: 3 },
  { id: 'Best Lawyers Listed', pts: 3 },
  { id: 'Other Industry Awards / Networks', pts: 2 },
  { id: 'None of the above', pts: 1 },
];

function StepReputation({ data, update }: StepProps) {
  const toggle = (id: string) => {
    if (id === 'None of the above') {
      update({ reputationItems: ['None of the above'] });
      return;
    }
    const filtered = data.reputationItems.filter((r) => r !== 'None of the above');
    const next = filtered.includes(id) ? filtered.filter((r) => r !== id) : [...filtered, id];
    update({ reputationItems: next });
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full mb-1">
          <Star className="w-3.5 h-3.5" /> Reputation
        </div>
        <h2 className="text-2xl font-heading font-bold">Recognition & professional networks</h2>
        <p className="text-muted-foreground text-sm">
          Memberships, rankings, and awards help verify your firm's standing. Select all that apply.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 pt-1">
        {REPUTATION_ITEMS.map(({ id, pts }) => {
          const selected = data.reputationItems.includes(id);
          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              className={`flex items-center justify-between gap-3 px-5 py-4 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                selected
                  ? 'border-primary bg-primary/8 text-primary shadow-md'
                  : 'border-border hover:border-primary/30'
              }`}
            >
              <div className="flex items-center gap-3">
                {selected ? (
                  <CheckCircle className="w-4 h-4 flex-shrink-0 text-primary" />
                ) : (
                  <div className="w-4 h-4 rounded border border-current flex-shrink-0 opacity-40" />
                )}
                {id}
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${selected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                +{pts} pts
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const TECH_ITEMS = [
  { id: 'Case Management / CRM Software', label: 'Case management or CRM software (e.g. Clio, Lawcus, PracticeEvolve)' },
  { id: 'Active Website + Social Presence', label: 'Active website and professional social media presence' },
  { id: 'E-signature Tools', label: 'E-signature or document automation tools (e.g. DocuSign, HelloSign)' },
  { id: 'None', label: 'None of the above' },
];

function StepTechnology({ data, update }: StepProps) {
  const toggle = (id: string) => {
    if (id === 'None') {
      update({ techItems: ['None'] });
      return;
    }
    const filtered = data.techItems.filter((t) => t !== 'None');
    const next = filtered.includes(id) ? filtered.filter((t) => t !== id) : [...filtered, id];
    update({ techItems: next });
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full mb-1">
          <Zap className="w-3.5 h-3.5" /> Technology
        </div>
        <h2 className="text-2xl font-heading font-bold">How tech-enabled is your firm?</h2>
        <p className="text-muted-foreground text-sm">
          Tech-savvy firms integrate faster with Monogamy's platform and client workflows.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 pt-1">
        {TECH_ITEMS.map(({ id, label }) => {
          const selected = data.techItems.includes(id);
          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              className={`flex items-center gap-3 px-5 py-4 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                selected
                  ? 'border-primary bg-primary/8 text-primary shadow-md'
                  : 'border-border hover:border-primary/30'
              }`}
            >
              {selected ? (
                <CheckCircle className="w-4 h-4 flex-shrink-0 text-primary" />
              ) : (
                <div className="w-4 h-4 rounded border border-current flex-shrink-0 opacity-40" />
              )}
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepEngagement({ data, update }: StepProps) {
  const options = [
    { value: 'yes', label: 'Yes — we've attended a Monogamy event, downloaded resources, or been in contact with the team.' },
    { value: 'partial', label: 'Somewhat — we've heard of Monogamy but haven't formally engaged.' },
    { value: 'no', label: 'No — this is our first interaction.' },
  ];

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full mb-1">
          <MessageSquare className="w-3.5 h-3.5" /> Prior Engagement
        </div>
        <h2 className="text-2xl font-heading font-bold">Have you engaged with Monogamy before?</h2>
        <p className="text-muted-foreground text-sm">
          Prior contact with the Monogamy team increases your qualification score.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 pt-1">
        {options.map(({ value, label }) => {
          const selected = data.engagement === value;
          return (
            <button
              key={value}
              onClick={() => update({ engagement: value })}
              className={`flex items-start gap-3 px-5 py-4 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                selected
                  ? 'border-primary bg-primary/8 text-primary shadow-md'
                  : 'border-border hover:border-primary/30'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                  selected ? 'border-primary bg-primary' : 'border-muted-foreground'
                }`}
              >
                {selected && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepDeclaration({ data, update }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950 px-3 py-1 rounded-full mb-1">
          <AlertTriangle className="w-3.5 h-3.5" /> Important
        </div>
        <h2 className="text-2xl font-heading font-bold">Accuracy declaration</h2>
        <p className="text-muted-foreground text-sm">
          Before submitting, please confirm you have read and agree to the following statement.
        </p>
      </div>
      <div className="bg-muted/60 rounded-2xl p-6 border border-border space-y-3 text-sm text-muted-foreground leading-relaxed">
        <p>
          I confirm that all information provided in this application is <strong className="text-foreground">accurate, truthful, and verifiable</strong>. I understand that:
        </p>
        <ul className="list-disc list-inside space-y-1.5 pl-2">
          <li>Submitting false or misleading information will result in immediate disqualification.</li>
          <li>Monogamy may verify stated credentials, rankings, and firm details independently.</li>
          <li>I am authorised to submit this application on behalf of the firm.</li>
          <li>Approval is not guaranteed and depends on qualification score and platform availability.</li>
        </ul>
      </div>
      <label className="flex items-start gap-3 cursor-pointer group">
        <Checkbox
          id="declaration"
          checked={data.declarationAccepted}
          onCheckedChange={(v) => update({ declarationAccepted: Boolean(v) })}
          className="mt-0.5 flex-shrink-0"
        />
        <span className="text-sm text-foreground group-hover:text-primary transition-colors">
          I confirm the above declaration is accurate and I agree to Monogamy's{' '}
          <a href="/terms" className="text-primary underline underline-offset-2" onClick={(e) => e.stopPropagation()}>
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-primary underline underline-offset-2" onClick={(e) => e.stopPropagation()}>
            Privacy Policy
          </a>
          .
        </span>
      </label>
    </div>
  );
}

function StepResults({ data }: { data: FormData }) {
  const { score, disqualifiers } = computeScore(data);
  const segment = getSegment(data);
  const qualified = disqualifiers.length === 0 && score >= QUALIFYING_SCORE;
  const partial = disqualifiers.length === 0 && score < QUALIFYING_SCORE;
  const pct = Math.round((score / MAX_SCORE) * 100);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <div
          className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto ${
            qualified ? 'bg-green-100 dark:bg-green-950' : partial ? 'bg-amber-100 dark:bg-amber-950' : 'bg-red-100 dark:bg-red-950'
          }`}
        >
          {qualified ? (
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          ) : partial ? (
            <AlertTriangle className="w-10 h-10 text-amber-600 dark:text-amber-400" />
          ) : (
            <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
          )}
        </div>
        <h2 className="text-2xl font-heading font-bold">
          {qualified ? 'Congratulations — You Qualify!' : partial ? 'Almost There' : 'Not Qualified'}
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          {qualified
            ? `${data.firmName || 'Your firm'} meets Monogamy's partner criteria. Our team will be in touch within 48 hours.`
            : partial
            ? `${data.firmName || 'Your firm'} scored below our minimum threshold. Strengthen the areas below and reapply.`
            : `Based on your responses, your firm doesn't meet our current partner criteria. See the reasons below.`}
        </p>
      </div>

      {/* Score bar */}
      <div className="bg-muted/50 rounded-2xl p-5 border border-border space-y-3">
        <div className="flex items-center justify-between text-sm font-semibold">
          <span>Qualification Score</span>
          <span className={`text-lg font-bold ${qualified ? 'text-green-600' : partial ? 'text-amber-600' : 'text-red-600'}`}>
            {score} / {MAX_SCORE}
          </span>
        </div>
        <div className="relative h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={`absolute inset-y-0 left-0 rounded-full transition-all duration-700 ${
              qualified ? 'bg-green-500' : partial ? 'bg-amber-500' : 'bg-red-500'
            }`}
            style={{ width: `${pct}%` }}
          />
          {/* Minimum threshold marker */}
          <div
            className="absolute inset-y-0 w-0.5 bg-foreground/40"
            style={{ left: `${Math.round((QUALIFYING_SCORE / MAX_SCORE) * 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span className="text-foreground/60">Min. {QUALIFYING_SCORE} to qualify</span>
          <span>{MAX_SCORE}</span>
        </div>
      </div>

      {/* Segment */}
      {disqualifiers.length === 0 && (
        <div className="flex items-center gap-3 bg-primary/8 border border-primary/20 rounded-xl px-5 py-3">
          <Award className="w-5 h-5 text-primary flex-shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Firm Segment</p>
            <p className="font-semibold text-foreground">{segment}</p>
          </div>
        </div>
      )}

      {/* Disqualifiers */}
      {disqualifiers.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-red-600">Disqualifying factors:</p>
          {disqualifiers.map((d) => (
            <div key={d} className="flex items-start gap-2 text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-xl px-4 py-3">
              <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              {d}
            </div>
          ))}
        </div>
      )}

      {qualified && (
        <div className="text-center pt-2">
          <p className="text-sm text-muted-foreground">
            A Monogamy partner success manager will contact{' '}
            <strong className="text-foreground">{data.email || 'you'}</strong> within 48 hours to complete onboarding.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validateStep(step: number, data: FormData): string | null {
  switch (step) {
    case 1:
      if (!data.firmName.trim()) return 'Please enter your firm name.';
      if (!data.website.trim()) return 'Please enter your firm website.';
      if (!data.contactName.trim()) return 'Please enter your full name.';
      if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) return 'Please enter a valid email address.';
      return null;
    case 2:
      if (data.regions.length === 0) return 'Please select at least one region.';
      return null;
    case 3:
      if (!data.lawyerCount) return 'Please select your firm size.';
      return null;
    case 4:
      if (data.practiceAreas.length === 0) return 'Please select at least one practice area.';
      return null;
    case 5:
      if (data.clientTypes.length === 0) return 'Please select at least one client type.';
      return null;
    case 6:
      if (data.reputationItems.length === 0) return 'Please select at least one option.';
      return null;
    case 7:
      if (data.techItems.length === 0) return 'Please select at least one option.';
      return null;
    case 8:
      if (!data.engagement) return 'Please select an option.';
      return null;
    case 9:
      if (!data.declarationAccepted) return 'Please accept the declaration to continue.';
      return null;
    default:
      return null;
  }
}

// ─── Main modal component ─────────────────────────────────────────────────────

interface PartnerLeadFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PartnerLeadForm({ open, onOpenChange }: PartnerLeadFormProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = STEPS.length - 1; // 0-indexed; last step is Results
  const isWelcome = step === 0;
  const isResults = step === totalSteps;
  const progressPct = isResults ? 100 : Math.round((step / (totalSteps - 1)) * 100);

  useEffect(() => {
    if (!open) {
      // Reset on close (short delay so animation finishes)
      const t = setTimeout(() => {
        setStep(0);
        setData(INITIAL_DATA);
        setError(null);
        setSubmitted(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  const update = (patch: Partial<FormData>) => {
    setData((d) => ({ ...d, ...patch }));
    setError(null);
  };

  const handleNext = () => {
    const err = validateStep(step, data);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    if (step === totalSteps - 1) {
      // Move to results
      setSubmitted(true);
      setStep(totalSteps);
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    setError(null);
    setStep((s) => Math.max(0, s - 1));
  };

  const renderStep = () => {
    switch (step) {
      case 0:  return <StepWelcome />;
      case 1:  return <StepBasicInfo data={data} update={update} />;
      case 2:  return <StepRegion data={data} update={update} />;
      case 3:  return <StepFirmSize data={data} update={update} />;
      case 4:  return <StepPractice data={data} update={update} />;
      case 5:  return <StepClientFocus data={data} update={update} />;
      case 6:  return <StepReputation data={data} update={update} />;
      case 7:  return <StepTechnology data={data} update={update} />;
      case 8:  return <StepEngagement data={data} update={update} />;
      case 9:  return <StepDeclaration data={data} update={update} />;
      case 10: return <StepResults data={data} />;
      default: return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl w-full max-h-[92vh] flex flex-col p-0 gap-0 rounded-2xl overflow-hidden">
        <DialogTitle className="sr-only">Partner Application Form</DialogTitle>

        {/* Progress bar */}
        {!isWelcome && !isResults && (
          <div className="px-6 pt-5 pb-4 border-b border-border bg-background/80 backdrop-blur-sm flex-shrink-0">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2 font-medium">
              <span>Step {step} of {totalSteps - 1}</span>
              <span>{STEPS[step]}</span>
            </div>
            <div className="relative h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 min-h-0">
          {renderStep()}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-6 py-4 border-t border-border bg-background/80 backdrop-blur-sm">
          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-950/40 rounded-lg px-4 py-2.5 mb-3">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            {/* Back */}
            {!isWelcome && !isResults ? (
              <Button variant="ghost" onClick={handleBack} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
            ) : isResults ? (
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            ) : (
              <div />
            )}

            {/* Next / Start / Submit */}
            {!isResults && (
              <Button
                onClick={handleNext}
                size={isWelcome ? 'lg' : 'default'}
                className={`gap-2 ${isWelcome ? 'px-8 rounded-xl' : ''}`}
              >
                {isWelcome
                  ? 'Start Application'
                  : step === totalSteps - 1
                  ? 'Submit Application'
                  : 'Continue'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}

            {isResults && (
              <Button asChild>
                <a href="/signup">
                  Create Your Profile <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PartnerLeadForm;
