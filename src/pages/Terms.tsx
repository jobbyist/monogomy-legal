import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main id="main-content" className="container-blog py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <Alert className="bg-primary/10 border-primary">
              <AlertDescription className="text-sm">
                <strong>Important:</strong> Monogamy.legal is a technology platform, not a law firm. 
                All legal services are provided by independent, licensed attorneys.
              </AlertDescription>
            </Alert>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Monogamy.legal platform, you accept and agree to be bound by these Terms of Service. 
                These terms govern your use of our legal technology platform, including AI-powered document preparation tools 
                and access to our network of independent legal practitioners.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Nature of Service</h2>
              <p>
                <strong>Technology Platform Only:</strong> Monogamy.legal is a legal technology platform that provides:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>AI-powered document drafting and analysis tools</li>
                <li>Contract checking and compliance verification systems</li>
                <li>A marketplace connecting users with independent licensed attorneys</li>
                <li>Document management and workflow automation</li>
              </ul>
              <p className="mt-4">
                <strong>We Are NOT a Law Firm:</strong> Monogamy.legal does not provide legal advice, practice law, 
                or represent clients. All legal services, advice, document approvals, and representations are provided 
                exclusively by independent, licensed legal practitioners who are members of our network.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Professional Liability & Indemnity</h2>
              <p>
                <strong>Attorney Responsibility:</strong> Professional indemnity insurance and legal liability for all 
                legal advice, document reviews, and approvals rest solely with the independent attorney who reviews and 
                signs off on your documents. Each attorney maintains their own professional indemnity insurance as required 
                by their respective bar associations.
              </p>
              <p className="mt-4">
                <strong>Platform Limitation:</strong> Monogamy.legal's liability is limited to the operation of our 
                technology platform. We are not liable for legal advice, document content, or professional services 
                provided by independent attorneys on our network.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Service Level Agreements (SLA)</h2>
              <p>Standard turnaround times by subscription tier:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Essential Plan:</strong> AI analysis (instant), human consultation responses within 48 hours</li>
                <li><strong>Professional Plan:</strong> Attorney document review and approval within 24 hours</li>
                <li><strong>Enterprise Plan:</strong> Priority review queue with responses within 12 hours</li>
              </ul>
              <p className="mt-4">
                These are target timeframes. Actual delivery may vary based on document complexity, attorney availability, 
                and jurisdictional requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Subscription Terms & Pricing</h2>
              <p>
                Subscription fees are charged monthly in advance. All prices are in South African Rand (ZAR) unless 
                otherwise specified. By subscribing, you agree to:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Monthly recurring billing until cancellation</li>
                <li>Usage limits as specified in your chosen plan</li>
                <li>Enterprise plans require a minimum 3-month commitment</li>
                <li>No refunds for partial months upon cancellation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Jurisdictional Compliance</h2>
              <p>
                Our platform operates in compliance with:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>South Africa:</strong> Legal Practice Act 28 of 2014</li>
                <li><strong>Kenya:</strong> Advocates Act</li>
                <li><strong>Nigeria:</strong> Legal Practitioners Act</li>
              </ul>
              <p className="mt-4">
                All attorneys on our network are licensed and in good standing with their respective bar associations. 
                You will only be matched with attorneys licensed in your jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. AI Technology Disclaimer</h2>
              <p>
                Our AI-powered tools are designed to assist with document preparation and analysis. However:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>AI outputs are NOT legal advice and should not be relied upon without attorney review</li>
                <li>All AI-generated documents must be reviewed and approved by a licensed attorney before use</li>
                <li>AI analysis may not catch all issues - human attorney oversight is mandatory</li>
                <li>We continuously improve our AI, but do not guarantee 100% accuracy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. User Responsibilities</h2>
              <p>
                As a user of Monogamy.legal, you agree to:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Not misuse or abuse the platform or AI tools</li>
                <li>Maintain confidentiality of your account credentials</li>
                <li>Use documents only after attorney approval</li>
                <li>Comply with all applicable laws in your jurisdiction</li>
                <li>Not attempt to circumvent platform security or limits</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Attorney Network</h2>
              <p>
                Attorneys on our network are independent contractors, not employees of Monogamy.legal. Each attorney:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Maintains their own professional license and insurance</li>
                <li>Is solely responsible for their legal advice and services</li>
                <li>Sets their own service standards within our platform guidelines</li>
                <li>Must comply with their bar association's rules and ethics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Data Privacy & Security</h2>
              <p>
                We take data security seriously. All documents and communications are encrypted. However, you acknowledge 
                that no system is 100% secure. See our Privacy Policy for detailed information on data handling.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Monogamy.legal's total liability for any claims arising from 
                platform use shall not exceed the total fees paid by you in the 12 months preceding the claim. We are 
                not liable for any legal advice, document content, or services provided by independent attorneys.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Termination</h2>
              <p>
                Either party may terminate the subscription at any time. We reserve the right to suspend or terminate 
                accounts that violate these terms, abuse the platform, or engage in fraudulent activity.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">13. Governing Law</h2>
              <p>
                These terms are governed by the laws of South Africa. Disputes will be resolved through arbitration 
                in Johannesburg, South Africa, before resorting to litigation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">14. Contact Information</h2>
              <p>
                For questions about these Terms of Service, contact us at{' '}
                <a href="mailto:legal@monogamy.legal" className="text-primary hover:underline">
                  legal@monogamy.legal
                </a>.
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Last updated: January 2025
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;