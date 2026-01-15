import { useState, useEffect, Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AttorneyCard from '@/components/AttorneyCard';
import { attorneyProfiles } from '@/data/attorneys';
import { AFRICAN_CITIES, LEGAL_SPECIALIZATIONS } from '@/types/attorney';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Attorneys = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCity, setSelectedCity] = useState<string>(searchParams.get('city') || 'all');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>(searchParams.get('specialization') || 'all');

  useEffect(() => {
    const city = searchParams.get('city');
    const specialization = searchParams.get('specialization');
    if (city) {
      setSelectedCity(city);
    }
    if (specialization) {
      setSelectedSpecialization(specialization);
    }
  }, [searchParams]);

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    const params: Record<string, string> = {};
    if (value !== 'all') params.city = value;
    if (selectedSpecialization !== 'all') params.specialization = selectedSpecialization;
    setSearchParams(params);
  };

  const handleSpecializationChange = (value: string) => {
    setSelectedSpecialization(value);
    const params: Record<string, string> = {};
    if (selectedCity !== 'all') params.city = selectedCity;
    if (value !== 'all') params.specialization = value;
    setSearchParams(params);
  };

  const filteredAttorneys = attorneyProfiles.filter(attorney => {
    const cityMatch = selectedCity === 'all' || attorney.city === selectedCity;
    const specMatch = selectedSpecialization === 'all' || attorney.specializations.includes(selectedSpecialization);
    return cityMatch && specMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="container-blog py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Legal Practitioners
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Connect with qualified attorneys and law firms across Africa
            </p>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <label htmlFor="city-filter" className="font-medium text-foreground">
                  Filter by City:
                </label>
                <Select value={selectedCity} onValueChange={handleCityChange}>
                  <SelectTrigger id="city-filter" className="w-[200px] rounded-lg">
                  <SelectValue placeholder="All Cities" />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  <SelectItem value="all">All Cities</SelectItem>
                  {AFRICAN_CITIES.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <label htmlFor="spec-filter" className="font-medium text-foreground">
                  Specialization:
                </label>
                <Select value={selectedSpecialization} onValueChange={handleSpecializationChange}>
                  <SelectTrigger id="spec-filter" className="w-[200px] rounded-lg">
                    <SelectValue placeholder="All Areas" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg">
                    <SelectItem value="all">All Areas</SelectItem>
                    {LEGAL_SPECIALIZATIONS.map((spec) => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Attorneys Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAttorneys.map((attorney) => (
              <AttorneyCard key={attorney.id} attorney={attorney} />
            ))}
          </div>

          {filteredAttorneys.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No attorneys found matching your criteria. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Attorneys;
