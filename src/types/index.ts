
export type FranchiseCategory = 
  | 'Food & Beverage'
  | 'Retail'
  | 'Services'
  | 'Health & Fitness'
  | 'Education'
  | 'Entertainment'
  | 'Automotive'
  | 'Technology';

export interface InvestmentRange {
  min: number;
  max: number;
}

export interface Location {
  city?: string;
  state?: string;
  country: string;
}

export interface Franchise {
  id: string;
  name: string;
  slug: string;
  logo: string;
  featuredImage: string;
  gallery: string[];
  category: FranchiseCategory;
  investmentRange: InvestmentRange;
  locations: Location[];
  description: string;
  benefits: string[];
  requirements: string[];
  established: number;
  unitsCount: number;
  featured: boolean;
  rating: number;
  contactEmail: string;
  companyWebsite?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'seeker' | 'owner' | 'admin';
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  budget?: number;
  timeframe?: string;
  location?: string;
}
