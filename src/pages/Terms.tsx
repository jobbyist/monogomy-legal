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
                These terms govern your use of our legal technology platform, including access to our network of independent 
                licensed attorneys and subscription-based services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Nature of Service</h2>
              <p>
                <strong>Technology Platform Only:</strong> Monogamy.legal is a legal technology platform that provides:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>A marketplace connecting users with independent licensed attorneys</li>
                <li>Access to attorney profiles, contact information, and scheduling tools</li>
                <li>Secure document sharing and case management features</li>
                <li>Priority consultation booking for subscribers</li>
              </ul>
              <p className="mt-4">
                <strong>We Are NOT a Law Firm:</strong> Monogamy.legal does not provide legal advice, practice law, 
                or represent clients. All legal services, advice, and representations are provided exclusively by 
                independent, licensed legal practitioners who are members of our network.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Professional Liability & Indemnity</h2>
              <p>
                <strong>Attorney Responsibility:</strong> Professional indemnity insurance and legal liability for all 
                legal advice and services rest solely with the independent attorney providing those services. Each attorney 
                maintains their own professional indemnity insurance as required by their respective bar associations.
              </p>
              <p className="mt-4">
                <strong>Platform Limitation:</strong> Monogamy.legal's liability is limited to the operation of our 
                technology platform. We are not liable for legal advice, services, or professional conduct provided by 
                independent attorneys on our network.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Subscription Terms & Pricing</h2>
              <p>
                Subscription fees are charged monthly in advance. By subscribing, you agree to:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Monthly recurring billing at $29.99 USD until cancellation</li>
                <li>Access to attorney contact details and priority consultation booking</li>
                <li>30-day money back guarantee on your first subscription</li>
                <li>Ability to cancel at any time with no further charges</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Jurisdictional Compliance</h2>
              <p>
                Our platform operates in compliance with legal practice regulations across Africa. All attorneys on our 
                network are licensed and in good standing with their respective bar associations. You will only be matched 
                with attorneys licensed in your jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. User Responsibilities</h2>
              <p>
                As a user of Monogamy.legal, you agree to:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Be at least 18 years of age or the age of majority in your jurisdiction</li>
                <li>Maintain confidentiality of your account credentials</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not misuse or abuse the platform</li>
                <li>Conduct yourself professionally when communicating with attorneys</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Attorney Network</h2>
              <p>
                Attorneys on our network are independent contractors, not employees of Monogamy.legal. Each attorney:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Maintains their own professional license and insurance</li>
                <li>Is solely responsible for their legal advice and services</li>
                <li>Sets their own fees and service standards within our platform guidelines</li>
                <li>Must comply with their bar association's rules and ethics</li>
                <li>Is verified through our screening process</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Payment Processing</h2>
              <p>
                All subscription payments are processed securely through our payment partners. By making a payment, you agree to:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Provide accurate payment information</li>
                <li>Authorize recurring monthly charges for subscriptions</li>
                <li>Pay any fees directly to attorneys for legal services (separate from subscription)</li>
                <li>Review our Refund Policy for cancellation terms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Data Privacy & Security</h2>
              <p>
                We take data security seriously. All documents and communications are encrypted. However, you acknowledge 
                that no system is 100% secure. See our Privacy Policy for detailed information on data handling.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Disclaimer of Warranties</h2>
              <p>
                Monogamy.legal provides a platform connecting clients with attorneys. We do not employ attorneys and are 
                not responsible for the legal services they provide. All interactions and agreements regarding legal services 
                are between you and the attorney. Monogamy.legal makes no warranties regarding the quality, outcome, or 
                suitability of legal services provided by third-party attorneys.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Monogamy.legal's total liability for any claims arising from 
                platform use shall not exceed the total subscription fees paid by you in the 12 months preceding the claim. 
                We are not liable for any legal advice, services, or professional conduct provided by independent attorneys.
              </p>
              <p className="mt-4">
                In no event shall Monogamy.legal be liable for any indirect, incidental, special, consequential, or punitive 
                damages arising from your use of the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Termination</h2>
              <p>
                Either party may terminate the subscription at any time. You may cancel your subscription through your 
                account settings. We reserve the right to suspend or terminate accounts that violate these terms, abuse 
                the platform, or engage in fraudulent activity.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">13. Governing Law</h2>
              <p>
                These terms are governed by the laws of South Africa. Disputes will be resolved through arbitration 
                in accordance with South African law before resorting to litigation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">14. Changes to Terms</h2>
              <p>
                Monogamy.legal may revise these Terms of Service at any time. We will notify users of material changes 
                via email. Continued use of our services after changes constitutes acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">15. Contact Information</h2>
              <p>
                For questions about these Terms of Service, contact us at{' '}
                <a href="mailto:support@monogamy.legal" className="text-primary hover:underline">
                  support@monogamy.legal
                </a>.
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Last updated: January 2026
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