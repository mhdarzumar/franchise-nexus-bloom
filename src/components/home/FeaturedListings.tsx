
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FranchiseCard from '@/components/franchises/FranchiseCard';
import { franchises } from '@/data/franchises';

const FeaturedListings = () => {
  const featuredFranchises = franchises.filter(franchise => franchise.featured);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div className="mb-4 md:mb-0">
            <h2 className="heading-2 text-franchise-blue">Featured Franchises</h2>
            <p className="text-gray-600 mt-2">Explore our top opportunities for entrepreneurs</p>
          </div>
          <Link 
            to="/franchises"
            className="inline-flex items-center text-franchise-blue font-medium hover:text-franchise-teal transition-colors"
          >
            View All Opportunities
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredFranchises.map((franchise) => (
            <FranchiseCard 
              key={franchise.id} 
              franchise={franchise} 
              variant={franchise.id === "1" ? "featured" : "default"} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
