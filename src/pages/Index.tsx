
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedListings from '@/components/home/FeaturedListings';
import CategorySection from '@/components/home/CategorySection';
import CustomButton from '@/components/ui/CustomButton';
import { ArrowRight, CheckCircle2, BarChart, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Hero />
        
        <FeaturedListings />
        
        <CategorySection />
        
        {/* How It Works Section */}
        <section className="section-padding bg-franchise-blue text-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-2">How FranchiseNexus Works</h2>
              <p className="mt-2 text-gray-300 max-w-2xl mx-auto">
                Our platform simplifies the franchise discovery process to help you find the perfect opportunity
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <div className="bg-franchise-teal/20 w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4">
                  <span className="text-2xl">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Explore Opportunities</h3>
                <p className="text-gray-300">
                  Browse our comprehensive directory of franchise opportunities across various industries and investment levels.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <div className="bg-franchise-teal/20 w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4">
                  <span className="text-2xl">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Request Information</h3>
                <p className="text-gray-300">
                  Connect directly with franchise representatives to get detailed information and answers to your questions.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <div className="bg-franchise-teal/20 w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4">
                  <span className="text-2xl">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Make Informed Decisions</h3>
                <p className="text-gray-300">
                  Access resources, compare options, and get the support you need to make your franchise investment with confidence.
                </p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <CustomButton 
                as={Link} 
                to="/how-it-works"
                variant="secondary"
                size="lg"
              >
                Learn More About Our Process
              </CustomButton>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-6">
                  <h2 className="heading-2 text-franchise-blue">Why Choose FranchiseNexus?</h2>
                  <p className="text-gray-600 mt-2">
                    We help entrepreneurs find the right franchise opportunity by providing verified listings, comprehensive information, and personalized support.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex">
                    <CheckCircle2 className="h-6 w-6 text-franchise-teal mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Verified Listings</h3>
                      <p className="text-gray-600 text-sm">
                        All franchises on our platform are thoroughly vetted to ensure legitimacy and quality.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <CheckCircle2 className="h-6 w-6 text-franchise-teal mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Expert Guidance</h3>
                      <p className="text-gray-600 text-sm">
                        Our franchise consultants provide personalized advice throughout your journey.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <CheckCircle2 className="h-6 w-6 text-franchise-teal mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Comprehensive Resources</h3>
                      <p className="text-gray-600 text-sm">
                        Access guides, articles, and tools to help you make informed investment decisions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <CheckCircle2 className="h-6 w-6 text-franchise-teal mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Direct Communication</h3>
                      <p className="text-gray-600 text-sm">
                        Connect directly with franchise representatives to get your questions answered.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <CustomButton 
                    as={Link} 
                    to="/franchises"
                  >
                    Find Your Franchise
                    <ArrowRight size={16} className="ml-2" />
                  </CustomButton>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                  <BarChart className="h-10 w-10 mx-auto mb-3 text-franchise-blue" />
                  <h3 className="text-2xl font-bold text-franchise-blue">500+</h3>
                  <p className="text-gray-600">Active Listings</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                  <Users className="h-10 w-10 mx-auto mb-3 text-franchise-blue" />
                  <h3 className="text-2xl font-bold text-franchise-blue">12K+</h3>
                  <p className="text-gray-600">Entrepreneurs</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                  <Award className="h-10 w-10 mx-auto mb-3 text-franchise-blue" />
                  <h3 className="text-2xl font-bold text-franchise-blue">98%</h3>
                  <p className="text-gray-600">Satisfaction</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                  <div className="h-10 w-10 mx-auto mb-3 text-franchise-blue flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-timer">
                      <path d="M10 2h4"></path><path d="M12 14v-4"></path><path d="M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6"></path><path d="M9 17H4v5"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-franchise-blue">15+</h3>
                  <p className="text-gray-600">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-franchise-blue to-franchise-blue/90 text-white">
          <div className="container-custom text-center">
            <h2 className="heading-2 mb-4 max-w-2xl mx-auto">Ready to Start Your Entrepreneurial Journey?</h2>
            <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
              Explore our curated franchise opportunities and take the first step toward business ownership today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <CustomButton 
                as={Link} 
                to="/franchises"
                variant="secondary"
                size="lg"
              >
                Browse Franchises
              </CustomButton>
              <CustomButton 
                as={Link} 
                to="/contact"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/20"
              >
                Contact Our Team
              </CustomButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
