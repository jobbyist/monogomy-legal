import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Scale, Users, Award, CheckCircle, BookOpen, Briefcase, GraduationCap } from 'lucide-react';
import AttorneyCard from '@/components/AttorneyCard';
import LocationCarousel from '@/components/LocationCarousel';
import { attorneyProfiles } from '@/data/attorneys';

const Index = () => {
  const featuredAttorneys = attorneyProfiles.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-primary/10 to-background animate-fade-in">
          <div className="container-blog">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground animate-slide-in">
                Africa's Leading Legal Services Platform
              </h1>
              <p className="text-xl text-muted-foreground">
                Connect with licensed legal practitioners, verified attorneys, and reputable law firms across various areas of legal expertise throughout Africa. 
                Professional, reliable, and accessible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="hover:scale-105 transition-transform rounded-lg">
                  <Link to="/attorneys">Find an Attorney</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="hover:scale-105 transition-transform rounded-lg">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Browse by Location */}
        <section className="py-16 bg-background">
          <div className="container-blog">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl font-heading font-bold mb-4">Browse by Location</h2>
              <p className="text-lg text-muted-foreground">
                Discover qualified legal practitioners across Africa's major cities
              </p>
            </div>
            <LocationCarousel />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/50">
          <div className="container-blog">
            <h2 className="text-3xl font-heading font-bold text-center mb-12 animate-fade-in">Why Choose Monogamy</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-all duration-300 animate-scale-in rounded-xl">
                <CardHeader>
                  <Shield className="w-12 h-12 mb-4 text-primary" />
                  <CardTitle className="font-heading">Verified Attorneys</CardTitle>
                  <CardDescription>
                    All legal practitioners are verified, licensed, and in good standing with their respective bar associations.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 animate-scale-in rounded-xl" style={{ animationDelay: '0.1s' }}>
                <CardHeader>
                  <Scale className="w-12 h-12 mb-4 text-primary" />
                  <CardTitle className="font-heading">Expert Legal Advice</CardTitle>
                  <CardDescription>
                    Access specialized legal expertise across multiple practice areas including corporate, criminal, family, and property law.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 animate-scale-in rounded-xl" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <Users className="w-12 h-12 mb-4 text-primary" />
                  <CardTitle className="font-heading">Accessible & Convenient</CardTitle>
                  <CardDescription>
                    Connect with attorneys through our platform for consultations, case management, and ongoing legal support.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Attorneys */}
        <section className="py-16">
          <div className="container-blog">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl font-heading font-bold mb-4">Featured Legal Practitioners</h2>
              <p className="text-lg text-muted-foreground">
                Meet some of our highly-rated attorneys
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {featuredAttorneys.map((attorney, index) => (
                <div key={attorney.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <AttorneyCard attorney={attorney} />
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button size="lg" asChild className="hover:scale-105 transition-transform rounded-lg">
                <Link to="/attorneys">View All Attorneys</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-muted/50">
          <div className="container-blog">
            <h2 className="text-3xl font-heading font-bold text-center mb-12 animate-fade-in">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: '0s' }}>
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto hover:scale-110 transition-transform">
                  1
                </div>
                <h3 className="text-xl font-heading font-semibold">Sign Up</h3>
                <p className="text-muted-foreground">
                  Create your account to browse attorney profiles
                </p>
              </div>

              <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto hover:scale-110 transition-transform">
                  2
                </div>
                <h3 className="text-xl font-heading font-semibold">Browse & Select</h3>
                <p className="text-muted-foreground">
                  Find the right attorney from our verified network
                </p>
              </div>

              <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto hover:scale-110 transition-transform">
                  3
                </div>
                <h3 className="text-xl font-heading font-semibold">Subscribe</h3>
                <p className="text-muted-foreground">
                  Subscribe to access contact details and consultation booking
                </p>
              </div>

              <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto hover:scale-110 transition-transform">
                  4
                </div>
                <h3 className="text-xl font-heading font-semibold">Connect Securely</h3>
                <p className="text-muted-foreground">
                  Schedule consultations and manage your legal matters through our secure platform
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Become An Attorney Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container-blog">
            <div className="max-w-4xl mx-auto text-center">
              <GraduationCap className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Join as a Legal Practitioner
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Expand your practice reach across Africa. Create your profile, showcase your expertise, 
                and connect with clients seeking legal services. Build your client base with our secure platform.
              </p>
              <Button size="lg" asChild className="hover:scale-105 transition-transform rounded-lg">
                <Link to="/become-attorney">Learn More & Apply</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Join Subscription Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container-blog">
            <div className="max-w-4xl mx-auto text-center">
              <Briefcase className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Subscribe for Full Access
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Unlock exclusive benefits with our premium subscription for just <span className="text-primary font-bold">$29.99/month. Cancel anytime.</span> 
                Get access to verified attorney contacts and priority consultation booking!
              </p>
              <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Access to attorney contact details</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Priority consultation booking</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Secure document sharing</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">30-day money back guarantee</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Direct messaging with attorneys</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Case tracking dashboard</span>
                </div>
              </div>
              <Button size="lg" asChild className="hover:scale-105 transition-transform rounded-lg">
                <Link to="/membership">Subscribe Now</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground animate-fade-in">
          <div className="container-blog text-center space-y-6">
            <h2 className="text-4xl font-heading font-bold">Ready to Get Started?</h2>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Join Monogamy today and connect with qualified legal practitioners across Africa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="hover:scale-105 transition-transform rounded-lg">
                <Link to="/signup">Sign Up Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary hover:scale-105 transition-all rounded-lg" asChild>
                <Link to="/attorneys">Browse Attorneys</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stories Section - Instagram Reel Style */}
        <StoriesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
