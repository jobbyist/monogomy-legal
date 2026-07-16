-- Sample templates for the legal document library
-- Run this after the initial migration to populate the templates table

INSERT INTO templates (title, description, category, raw_markdown_content, jurisdiction, is_active) VALUES

-- South African Templates
(
  'Non-Disclosure Agreement (NDA) - South Africa',
  'Protect confidential information shared between parties in business discussions or employment relationships.',
  'Business',
  '# NON-DISCLOSURE AGREEMENT

This Agreement is entered into on {{date}} between:

**Disclosing Party:** {{party_a_name}}
**Receiving Party:** {{party_b_name}}

## 1. Definition of Confidential Information
Confidential Information includes all written, electronic, or oral information...

[Full template content would go here with variables]',
  'ZA',
  true
),

(
  'Cohabitation Agreement - South Africa',
  'Legal agreement for unmarried couples living together, outlining property and financial arrangements.',
  'Relationship',
  '# COHABITATION AGREEMENT

Between {{partner_1_name}} and {{partner_2_name}}

## Recitals
The parties are in a relationship and intend to cohabit...

[Full template content]',
  'ZA',
  true
),

-- Kenyan Templates
(
  'Independent Contractor Agreement - Kenya',
  'Service agreement for freelancers and independent contractors providing services to businesses.',
  'Employment',
  '# INDEPENDENT CONTRACTOR AGREEMENT

**Client:** {{client_name}}
**Contractor:** {{contractor_name}}

## 1. Services
The Contractor agrees to provide the following services...

[Full template content]',
  'KE',
  true
),

-- Nigerian Templates
(
  'Website Terms of Service - Nigeria',
  'Standard terms and conditions for website operation and user agreements.',
  'Corporate',
  '# TERMS OF SERVICE

Last Updated: {{date}}

## 1. Acceptance of Terms
By accessing {{website_name}}, you agree to these terms...

[Full template content]',
  'NG',
  true
),

-- Multi-Jurisdiction Templates
(
  'Freelance Services Agreement',
  'General service agreement for freelance work, adaptable across African jurisdictions.',
  'Freelance',
  '# FREELANCE SERVICES AGREEMENT

[Jurisdiction-neutral template content]',
  NULL,
  true
);
