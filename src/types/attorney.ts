export interface AttorneyProfile {
  id: string;
  name: string;
  title: string;
  firm: string;
  city: string;
  country: string;
  bio: string;
  profileImage: string;
  images: string[];
  consultationFee: number;
  specializations: string[];
  yearsOfExperience: number;
  availability: string;
  // Contact details - only visible to subscribed users
  phone?: string;
  email?: string;
  location?: string;
  rating: number;
  reviewCount: number;
  licenseNumber?: string;
  barAdmission?: string;
}

export interface Consultation {
  id: string;
  attorneyId: string;
  userId: string;
  date: string;
  duration: number;
  totalCost: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export const AFRICAN_CITIES = [
  'Johannesburg',
  'Cape Town',
  'Durban',
  'Nairobi',
  'Lagos',
  'Accra',
  'Cairo',
  'Casablanca',
  'Addis Ababa',
  'Dar es Salaam',
  'Kampala',
  'Kigali',
];

export const LEGAL_SPECIALIZATIONS = [
  'Corporate Law',
  'Criminal Law',
  'Family Law',
  'Real Estate Law',
  'Intellectual Property',
  'Employment Law',
  'Tax Law',
  'Immigration Law',
  'Civil Litigation',
  'Contract Law',
];
