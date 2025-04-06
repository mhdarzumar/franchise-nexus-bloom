
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import InquiryForm from '@/components/common/InquiryForm';
import CustomButton from '@/components/ui/CustomButton';
import { Franchise } from '@/types';
import { franchises } from '@/data/franchises';
import { 
  DollarSign, 
  MapPin, 
  Calendar, 
  Store, 
  Star, 
  Globe, 
  Mail,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
};

const FranchiseListing = () => {
  const { slug } = useParams<{ slug: string }>();
  const [franchise, setFranchise] = useState<Franchise | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    // In a real implementation, this would fetch from an API
    const foundFranchise = franchises.find(f => f.slug === slug);
    setFranchise(foundFranchise || null);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">Loading franchise details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!franchise) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="max-w-md mx-auto text-center p-6">
            <h1 className="text-2xl font-bold mb-4">Franchise Not Found</h1>
            <p className="mb-6 text-gray-600">
              The franchise you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              to="/franchises"
              className="flex items-center justify-center text-franchise-blue hover:text-franchise-teal"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Franchises
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Franchise Header */}
        <div className="bg-franchise-blue text-white py-12">
          <div className="container-custom">
            <Link 
              to="/franchises" 
              className="inline-flex items-center text-gray-300 hover:text-white mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Franchises
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{franchise.name}</h1>
                <p className="mt-2 text-gray-300">{franchise.category}</p>
              </div>
              
              <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-2" />
                <span className="font-medium">{franchise.rating}</span>
                <span className="mx-2 text-gray-400">•</span>
                <span>Established {franchise.established}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container-custom py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="mb-10">
                <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden mb-3">
                  {/* Placeholder for main image */}
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-lg">{franchise.name} - Image {activeImageIndex + 1}</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {franchise.gallery.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`aspect-video bg-gray-200 rounded-md overflow-hidden ${
                        activeImageIndex === index ? 'ring-2 ring-franchise-teal' : ''
                      }`}
                    >
                      {/* Thumbnail image */}
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">{index + 1}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Overview */}
              <div className="mb-10">
                <h2 className="heading-3 text-franchise-blue mb-4">Overview</h2>
                <p className="text-gray-700 mb-6">{franchise.description}</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <DollarSign className="h-5 w-5 text-franchise-blue mb-1" />
                    <p className="text-sm text-gray-500">Investment</p>
                    <p className="font-medium">
                      {formatCurrency(franchise.investmentRange.min)} - {formatCurrency(franchise.investmentRange.max)}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <MapPin className="h-5 w-5 text-franchise-blue mb-1" />
                    <p className="text-sm text-gray-500">Locations</p>
                    <p className="font-medium">
                      {franchise.locations.length} {franchise.locations.length === 1 ? 'Country' : 'Countries'}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Calendar className="h-5 w-5 text-franchise-blue mb-1" />
                    <p className="text-sm text-gray-500">Established</p>
                    <p className="font-medium">{franchise.established}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Store className="h-5 w-5 text-franchise-blue mb-1" />
                    <p className="text-sm text-gray-500">Units</p>
                    <p className="font-medium">{franchise.unitsCount}+</p>
                  </div>
                </div>
              </div>
              
              {/* Benefits & Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div>
                  <h2 className="heading-3 text-franchise-blue mb-4">Franchise Benefits</h2>
                  <ul className="space-y-3">
                    {franchise.benefits.map((benefit, index) => (
                      <li key={index} className="flex">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h2 className="heading-3 text-franchise-blue mb-4">Requirements</h2>
                  <ul className="space-y-3">
                    {franchise.requirements.map((requirement, index) => (
                      <li key={index} className="flex">
                        <CheckCircle className="h-5 w-5 text-franchise-blue mr-3 flex-shrink-0 mt-0.5" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Contact Details */}
              <div className="bg-gray-50 p-6 rounded-lg mb-10">
                <h2 className="heading-3 text-franchise-blue mb-4">Contact Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-franchise-blue mr-3" />
                    <span>{franchise.contactEmail}</span>
                  </div>
                  
                  {franchise.companyWebsite && (
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 text-franchise-blue mr-3" />
                      <a 
                        href={franchise.companyWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-franchise-blue hover:underline"
                      >
                        {franchise.companyWebsite.replace(/(^\w+:|^)\/\//, '')}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <InquiryForm franchiseName={franchise.name} />
                
                <div className="mt-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="font-bold mb-4">Similar Franchises</h3>
                  
                  <div className="space-y-4">
                    {franchises
                      .filter(f => 
                        f.id !== franchise.id && 
                        f.category === franchise.category
                      )
                      .slice(0, 3)
                      .map(similarFranchise => (
                        <Link 
                          key={similarFranchise.id}
                          to={`/franchise/${similarFranchise.slug}`}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center">
                            {/* Logo placeholder */}
                            <span className="text-xs text-gray-500">{similarFranchise.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h4 className="font-medium">{similarFranchise.name}</h4>
                            <p className="text-sm text-gray-600">
                              {formatCurrency(similarFranchise.investmentRange.min)} - {formatCurrency(similarFranchise.investmentRange.max)}
                            </p>
                          </div>
                        </Link>
                      ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link 
                      to={`/franchises?category=${encodeURIComponent(franchise.category)}`}
                      className="text-franchise-blue hover:text-franchise-teal font-medium text-sm inline-flex items-center"
                    >
                      View All {franchise.category} Franchises
                      <ArrowLeft className="ml-1 h-4 w-4 rotate-180" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <section className="bg-gray-50 border-t border-gray-200 py-12">
          <div className="container-custom text-center">
            <h2 className="heading-3 text-franchise-blue mb-3">Interested in Other Opportunities?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Explore our full directory of franchise opportunities across various industries and investment levels.
            </p>
            <CustomButton 
              as={Link}
              to="/franchises"
              variant="primary"
              size="lg"
            >
              Browse All Franchises
            </CustomButton>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FranchiseListing;
