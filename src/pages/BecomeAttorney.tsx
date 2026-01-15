import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Briefcase, Calendar, Shield, Settings, MessageSquare, TrendingUp, CheckCircle, Scale, GraduationCap } from 'lucide-react';

const BecomeAttorney = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main id="main-content" className="container-blog py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Scale className="w-20 h-20 text-primary mx-auto mb-6" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Become an Attorney Partner
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join Africa's premier legal services platform. Build your practice, connect with verified clients, 
              and expand your professional network in a secure, professional environment.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-center mb-12">Why Join Our Platform?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <TrendingUp className="w-12 h-12 mb-4 text-primary" />
                  <CardTitle>Grow Your Practice</CardTitle>
                  <CardDescription>
                    Access a growing network of clients seeking quality legal services. 
                    Build your reputation with verified client reviews and ratings.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <Calendar className="w-12 h-12 mb-4 text-primary" />
                  <CardTitle>Flexible Scheduling</CardTitle>
                  <CardDescription>
                    Set your own availability and consultation rates. Accept or decline consultation requests 
                    and manage your calendar with ease.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <Shield className="w-12 h-12 mb-4 text-primary" />
                  <CardTitle>Safe & Professional</CardTitle>
                  <CardDescription>
                    All clients are verified professionals. Secure payment processing and 
                    confidential client management through our secure platform.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <Briefcase className="w-12 h-12 mb-4 text-primary" />
                  <CardTitle>Professional Profile</CardTitle>
                  <CardDescription>
                    Showcase your credentials, specializations, and expertise. 
                    Highlight your experience and bar admission details.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <MessageSquare className="w-12 h-12 mb-4 text-primary" />
                  <CardTitle>Direct Client Communication</CardTitle>
                  <CardDescription>
                    Chat with potential clients through our secure messaging system. 
                    Screen consultation requests before accepting.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <Award className="w-12 h-12 mb-4 text-primary" />
                  <CardTitle>Credibility & Visibility</CardTitle>
                  <CardDescription>
                    Build your professional credibility with verified credentials. 
                    Featured profiles receive priority placement and increased visibility.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          {/* Requirements Section */}
          <div className="mb-16 bg-muted p-8 rounded-lg">
            <h2 className="font-heading text-3xl font-bold text-center mb-8">Requirements</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-heading text-xl font-semibold text-foreground">Legal Qualifications</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Admitted to practice law in your jurisdiction</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Valid law degree (LLB or equivalent)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Current practicing license</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Valid professional identification</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-heading text-xl font-semibold text-foreground">What We Look For</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Professional experience and expertise</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Clear specialization areas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Excellent communication skills</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Commitment to client confidentiality and ethics</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                  1
                </div>
                <h3 className="font-heading text-xl font-semibold">Apply</h3>
                <p className="text-muted-foreground">
                  Submit your application with credentials and professional information
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                  2
                </div>
                <h3 className="font-heading text-xl font-semibold">Verification</h3>
                <p className="text-muted-foreground">
                  We verify your credentials, license, and professional standing
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                  3
                </div>
                <h3 className="font-heading text-xl font-semibold">Create Your Profile</h3>
                <p className="text-muted-foreground">
                  Set your specializations, consultation rates, and availability
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                  4
                </div>
                <h3 className="font-heading text-xl font-semibold">Start Consulting</h3>
                <p className="text-muted-foreground">
                  Go live and start accepting consultation requests
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 p-12 rounded-lg">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              Ready to Join Our Network?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of successful attorneys already growing their practice on our platform. 
              Start your application today and expand your professional reach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="hover:scale-105 transition-transform">
                Apply Now
              </Button>
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BecomeAttorney;
