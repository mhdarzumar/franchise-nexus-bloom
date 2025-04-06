
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomButton from '@/components/ui/CustomButton';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-franchise-blue to-franchise-blue/90 text-white">
      <div className="container-custom py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="heading-1">
              Find Your Perfect <span className="text-franchise-teal">Franchise</span> Opportunity
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-lg">
              Connect with industry-leading franchise brands and start your entrepreneurial journey with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <CustomButton 
                size="lg" 
                variant="secondary" 
                as={Link} 
                to="/franchises"
                className="bg-franchise-teal hover:bg-franchise-teal/90"
              >
                Explore Franchises
              </CustomButton>
              <CustomButton 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/20"
              >
                How It Works
              </CustomButton>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="bg-green-500 rounded-full h-3 w-3"></div>
                <p className="text-sm">500+ Active Listings</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-green-500 rounded-full h-3 w-3"></div>
                <p className="text-sm">Vetted Opportunities</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-green-500 rounded-full h-3 w-3"></div>
                <p className="text-sm">Expert Guidance</p>
              </div>
            </div>
          </div>

          <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl animate-fade-up">
            <div className="absolute inset-0 bg-gradient-to-tr from-franchise-blue/50 to-transparent z-10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Placeholder image - would be replaced with actual franchise image */}
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <svg className="w-32 h-32 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 6v3l4-4-4-4v3a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"></path>
                </svg>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <h3 className="font-bold text-lg">Start Your Business Today</h3>
              <p className="text-sm opacity-90">Explore vetted franchise opportunities</p>
              <Link 
                to="/franchises/tech-haven" 
                className="mt-4 inline-flex items-center text-sm font-medium hover:underline"
              >
                Featured: Tech Haven
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
