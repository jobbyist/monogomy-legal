import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { attorneyProfiles } from '@/data/attorneys';
import { AttorneyProfile } from '@/types/attorney';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Phone, Mail, Lock, Calendar, Briefcase, Scale, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/components/ui/sonner';

const AttorneyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isPaidUser } = useAuth();
  const [attorney, setAttorney] = useState<AttorneyProfile | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const profile = attorneyProfiles.find(a => a.id === id);
    if (!profile) {
      navigate('/attorneys');
    } else {
      setAttorney(profile);
    }
  }, [id, navigate, isAuthenticated]);

  if (!attorney) {
    return null;
  }

  const handleRequestConsultation = () => {
    toast.success('Consultation Request Sent', {
      description: 'The attorney will contact you shortly to schedule your consultation.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="container-blog py-12">
        <div className="max-w-6xl mx-auto">
          <Button variant="outline" onClick={() => navigate('/attorneys')} className="mb-6">
            ← Back to Attorneys
          </Button>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-[3/4] overflow-hidden rounded-lg">
                <img
                  src={attorney.profileImage}
                  alt={attorney.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {attorney.images.slice(1).map((img, idx) => (
                  <div key={idx} className="aspect-[3/4] overflow-hidden rounded-lg">
                    <img
                      src={img}
                      alt={`${attorney.name} photo ${idx + 2}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h1 className="font-heading text-4xl font-bold text-foreground mb-2">
                  {attorney.name}
                </h1>
                <p className="text-lg text-muted-foreground mb-2">{attorney.title}</p>
                <div className="flex items-center text-muted-foreground mb-4">
                  <Briefcase className="w-5 h-5 mr-2" />
                  {attorney.firm}
                </div>
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="w-5 h-5 mr-2" />
                  {attorney.city}, {attorney.country}
                </div>
                <div className="flex items-center mb-4">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-lg font-medium mr-2">{attorney.rating}</span>
                  <span className="text-muted-foreground">
                    ({attorney.reviewCount} reviews)
                  </span>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  R{attorney.consultationFee} per consultation
                </Badge>
              </div>

              <div>
                <h2 className="font-heading text-xl font-semibold mb-2">Professional Background</h2>
                <p className="text-muted-foreground">{attorney.bio}</p>
              </div>

              <div>
                <h2 className="font-heading text-xl font-semibold mb-4">Specializations</h2>
                <div className="flex flex-wrap gap-2">
                  {attorney.specializations.map((spec, idx) => (
                    <Badge key={idx} variant="outline">
                      <Scale className="w-3 h-3 mr-1" />
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <GraduationCap className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Experience</p>
                    <p className="text-2xl font-bold">{attorney.yearsOfExperience} years</p>
                  </CardContent>
                </Card>
                {attorney.barAdmission && (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Scale className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">Bar Admission</p>
                      <p className="text-lg font-bold">{attorney.barAdmission}</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div>
                <h2 className="font-heading text-xl font-semibold mb-2">Availability</h2>
                <p className="text-muted-foreground">{attorney.availability}</p>
              </div>

              {/* Contact Details - Only for Paid Users */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {isPaidUser ? (
                      <>
                        <Phone className="w-5 h-5" />
                        Contact Details
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        Contact Details Locked
                      </>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {isPaidUser
                      ? 'Get in touch to arrange your consultation'
                      : 'Upgrade to a paid account to view contact details'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isPaidUser ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${attorney.phone}`} className="hover:underline">
                          {attorney.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${attorney.email}`} className="hover:underline">
                          {attorney.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{attorney.location}</span>
                      </div>
                      {attorney.licenseNumber && (
                        <div className="flex items-center gap-2 pt-2 border-t">
                          <Briefcase className="w-4 h-4" />
                          <span className="text-sm"><strong>License:</strong> {attorney.licenseNumber}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Alert>
                        <Lock className="h-4 w-4" />
                        <AlertDescription>
                          Upgrade to a paid account to unlock contact details and license information
                          for all attorneys.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Consultation Request Section - Only for Paid Users */}
              {isPaidUser && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Request Consultation
                    </CardTitle>
                    <CardDescription>
                      Schedule a legal consultation with this attorney
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Consultation Fee:</p>
                      <p className="text-2xl font-bold">R{attorney.consultationFee}</p>
                    </div>

                    <Button
                      onClick={handleRequestConsultation}
                      className="w-full"
                    >
                      Request Consultation
                    </Button>
                  </CardContent>
                </Card>
              )}

              {!isPaidUser && (
                <Alert>
                  <Lock className="h-4 w-4" />
                  <AlertDescription>
                    Upgrade to a paid account to unlock consultation request features and access
                    to attorney contact information.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AttorneyDetail;
