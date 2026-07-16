import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border" role="contentinfo">
      <div className="container-blog py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
              <Link to="/" className="inline-flex" aria-label="Cumpani home">
              <img
                src="/monogamyblk.svg"
                alt="Monogamy"
                className="w-[200px] h-auto dark:hidden"
              />
              <img
                src="/monogamywht.svg"
                alt="Monogamy"
                className="hidden w-[200px] h-auto dark:block"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Monogamy is a legal technology platform connecting clients with independent, licensed attorneys across Africa. Our AI-powered tools streamline document preparation, while all legal advice and approvals are provided exclusively by qualified legal professionals.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-heading font-medium text-foreground">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/attorneys" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">Find Attorneys</Link></li>
              <li><Link to="/partners" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">Lawyer Partners</Link></li>
              <li><Link to="/membership" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">Pricing</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">How It Works</Link></li>
            </ul>
          </div>
          
            <div className="space-y-4">
              <h3 className="font-heading font-medium text-foreground">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">Terms</Link></li>
                <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">Privacy</Link></li>
                <li><Link to="/refunds" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">Refunds</Link></li>
                <li><Link to="/cookies" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">Cookies</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-heading font-medium text-foreground">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">About</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">Contact</Link></li>
                <li className="text-muted-foreground">Need help?</li>
                <li><a href="mailto:support@monogamy.legal" className="text-primary hover:text-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">support@monogamy.legal</a></li>
              </ul>
            </div>
        </div>
        
        <div className="mt-8">
          <Alert className="bg-muted/50 border-border">
            <AlertDescription className="text-xs text-muted-foreground">
              <strong>Legal Disclaimer:</strong> Monogamy.legal is a technology provider, not a law firm. 
              All legal advice, custom contract approvals, and representation are provided strictly by independent, 
              licensed legal practitioners on our network. We do not practice law. Professional indemnity and 
              liability rest solely with the signing attorney who approves each document.
            </AlertDescription>
          </Alert>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Monogamy.legal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
