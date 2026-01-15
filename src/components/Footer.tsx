import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border" role="contentinfo">
      <div className="container-blog py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2" aria-label="Monogamy home">
              <Scale className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Monogamy
              </h2>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your premier legal services platform connecting clients with licensed attorneys and law firms across Africa.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-heading font-medium text-foreground">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/attorneys" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">Find Attorneys</Link></li>
              <li><Link to="/become-attorney" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">Join as Attorney</Link></li>
              <li><Link to="/membership" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">Subscribe</Link></li>
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
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Monogamy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
