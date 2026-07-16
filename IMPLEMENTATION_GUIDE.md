# Monogamy.legal - HITL AI Platform Implementation Guide

## Overview

This implementation transforms Monogamy into a production-ready, Human-in-the-Loop (HITL) AI-powered legal tech platform for South Africa, Kenya, and Nigeria.

## Tech Stack

- **Frontend**: Next.js/React, Tailwind CSS
- **Backend**: Supabase (Auth, PostgreSQL, pgvector, Edge Functions, Storage)
- **AI**: Claude 3.5 Sonnet (Anthropic API)
- **Payments**: Paystack
- **Email**: Resend or SMTP

## Architecture

### Database Schema

The platform uses a PostgreSQL database with pgvector extension for RAG capabilities:

- **profiles**: User accounts (extends auth.users)
- **attorney_profiles**: Attorney-specific data with verification status
- **templates**: Digital library of legal document templates
- **documents**: Client contracts with AI analysis
- **document_chunks**: Vector embeddings for RAG search
- **consultations**: Scheduled attorney meetings

### Workflow State Machine

Documents follow this automated workflow:

1. **drafted** → User creates document from template with AI assistance
2. **pending_review** → System routes to matched attorney
3. **attorney_approved** → Attorney reviews and approves
4. **sent_to_client** → PDF generated and sent to client

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

New dependencies added:
- `@supabase/supabase-js` - Supabase client
- `@anthropic-ai/sdk` - Claude AI integration
- `react-dropzone` - File upload handling

### 2. Supabase Setup

#### A. Create Supabase Project

1. Go to https://supabase.com and create a new project
2. Note your project URL and anon key
3. Note your service role key (keep this secret!)

#### B. Run Database Migration

In your Supabase SQL editor, run the migration file:
```
supabase/migrations/20240101000000_initial_schema.sql
```

This will:
- Enable pgvector extension
- Create all tables with proper RLS policies
- Set up indexes and triggers
- Create the `match_document_chunks` RPC function

#### C. Create Storage Bucket

1. Go to Storage in Supabase dashboard
2. Create a bucket named `documents`
3. Set up access policies for authenticated users

#### D. Deploy Edge Function

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Deploy the edge function
supabase functions deploy process-legal-doc
```

Set the following secrets for the edge function:
```bash
supabase secrets set ANTHROPIC_API_KEY=your_key_here
```

### 3. Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
ANTHROPIC_API_KEY=your_anthropic_key
RESEND_API_KEY=your_resend_key
PAYSTACK_SECRET_KEY=your_paystack_secret
PAYSTACK_PUBLIC_KEY=your_paystack_public
```

### 4. Anthropic API Setup

1. Sign up at https://console.anthropic.com
2. Create an API key
3. Add to your environment variables
4. Note: Claude 3.5 Sonnet has native document processing capabilities

### 5. Paystack Setup (African Payments)

1. Sign up at https://paystack.com
2. Get your test/live keys
3. Configure webhook URLs for subscription management
4. Set up payout configurations for attorney payments

### 6. Email Service Setup

Configure Resend or another email service:

1. Sign up at https://resend.com
2. Verify your domain
3. Create API key
4. Implement email templates for:
   - Client document ready notifications
   - Attorney task assignments
   - Subscription confirmations

## Features Implemented

### Module 1: Database & RAG
✅ PostgreSQL schema with pgvector
✅ Row Level Security (RLS) policies
✅ Vector similarity search function
✅ Proper indexes for performance

### Module 2: AI Document Processing
✅ Supabase Edge Function for document processing
✅ Claude 3.5 Sonnet integration
✅ Contract audit and risk analysis
✅ Document chunking and embedding

### Module 3: HITL Workflow
✅ State machine implementation
✅ Attorney matching algorithm
✅ Automated document routing
✅ PDF generation with watermarks
✅ Email notification triggers

### Module 4: Pricing Plans
✅ Three-tier pricing component
✅ Essential (R349/month)
✅ Professional (R899/month)
✅ Enterprise (R2,399/month)
✅ Feature limits per plan

### Module 5: Compliance Copy
✅ Site-wide legal disclaimers
✅ "Technology platform, not law firm" messaging
✅ Footer disclaimer
✅ Jurisdictional compliance statements

### Module 6: Template Library
✅ Responsive template grid
✅ Category filtering
✅ Subscription gating
✅ "Customize with AI" functionality

### Module 7: Dashboards & Onboarding
✅ Client dashboard with document tracking
✅ Attorney workspace with side-by-side review
✅ Client onboarding flow
✅ Attorney registration and verification

### Module 8: Legal Pages
✅ Updated Terms of Service
✅ Professional liability disclaimers
✅ SLA documentation
✅ Privacy policy structure

### Module 9: Production Readiness
✅ Error handling throughout
✅ Loading states
✅ SEO-ready structure
✅ Analytics integration points

## Key Files Created/Modified

### New Files
- `supabase/migrations/20240101000000_initial_schema.sql`
- `supabase/functions/process-legal-doc/index.ts`
- `src/services/supabaseClient.ts`
- `src/services/workflow.ts`
- `src/types/database.ts`
- `src/components/Pricing.tsx`
- `src/pages/Templates.tsx`
- `src/pages/ClientDashboard.tsx`
- `src/pages/AttorneyDashboard.tsx`
- `src/pages/ClientOnboarding.tsx`
- `src/pages/AttorneyOnboarding.tsx`
- `.env.example`

### Modified Files
- `package.json` - Added Supabase and Anthropic dependencies
- `src/App.tsx` - Added new routes
- `src/pages/Index.tsx` - Updated homepage messaging
- `src/pages/Terms.tsx` - Legal compliance updates
- `src/components/Footer.tsx` - Added disclaimer

## Deployment Checklist

Before going live:

- [ ] Run database migration in production Supabase
- [ ] Deploy edge function to production
- [ ] Configure all environment variables
- [ ] Set up Paystack webhooks
- [ ] Configure email templates
- [ ] Test full workflow end-to-end
- [ ] Verify RLS policies are working
- [ ] Add sample templates to database
- [ ] Test attorney onboarding and verification
- [ ] Configure Google Tag Manager
- [ ] Set up error monitoring (Sentry)
- [ ] Configure CDN for static assets
- [ ] Test payment flows
- [ ] Verify SEO meta tags

## Compliance Notes

This implementation complies with:
- **South Africa**: Legal Practice Act 28 of 2014
- **Kenya**: Advocates Act
- **Nigeria**: Legal Practitioners Act

All legal advice is provided by independent licensed attorneys. The platform is a technology provider only.

## Support

For implementation questions: legal@monogamy.legal
