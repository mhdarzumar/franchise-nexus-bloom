
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FranchiseCard from '@/components/franchises/FranchiseCard';
import SearchFilters from '@/components/franchises/SearchFilters';
import { franchises } from '@/data/franchises';
import { Franchise } from '@/types';

const Franchises = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredFranchises, setFilteredFranchises] = useState<Franchise[]>(franchises);
  
  // Get initial search parameters
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  useEffect(() => {
    // Filter franchises based on URL parameters
    let results = [...franchises];
    
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const minInvestment = searchParams.get('minInvestment');
    const maxInvestment = searchParams.get('maxInvestment');
    const country = searchParams.get('country');
    
    if (category) {
      results = results.filter(franchise => 
        franchise.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      results = results.filter(franchise => 
        franchise.name.toLowerCase().includes(searchLower) || 
        franchise.description.toLowerCase().includes(searchLower)
      );
    }
    
    if (minInvestment) {
      const minValue = parseInt(minInvestment);
      results = results.filter(franchise => 
        franchise.investmentRange.min >= minValue
      );
    }
    
    if (maxInvestment) {
      const maxValue = parseInt(maxInvestment);
      results = results.filter(franchise => 
        franchise.investmentRange.max <= maxValue
      );
    }
    
    if (country) {
      results = results.filter(franchise => 
        franchise.locations.some(location => 
          location.country.toLowerCase() === country.toLowerCase()
        )
      );
    }
    
    setFilteredFranchises(results);
  }, [searchParams]);

  const handleSearch = (searchTerm: string) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (searchTerm) {
      newParams.set('search', searchTerm);
    } else {
      newParams.delete('search');
    }
    
    setSearchParams(newParams);
  };

  const handleFilterChange = (filters: any) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (filters.category) {
      newParams.set('category', filters.category);
    } else {
      newParams.delete('category');
    }
    
    if (filters.investmentMin) {
      newParams.set('minInvestment', filters.investmentMin.toString());
    } else {
      newParams.delete('minInvestment');
    }
    
    if (filters.investmentMax) {
      newParams.set('maxInvestment', filters.investmentMax.toString());
    } else {
      newParams.delete('maxInvestment');
    }
    
    if (filters.country) {
      newParams.set('country', filters.country);
    } else {
      newParams.delete('country');
    }
    
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-8">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="heading-2 text-franchise-blue mb-2">Explore Franchises</h1>
            <p className="text-gray-600">
              Discover the perfect franchise opportunity to match your goals and investment capacity
            </p>
          </div>

          <SearchFilters 
            onSearch={handleSearch} 
            onFilterChange={handleFilterChange} 
          />

          {filteredFranchises.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFranchises.map(franchise => (
                <FranchiseCard 
                  key={franchise.id} 
                  franchise={franchise} 
                  variant={franchise.featured ? 'featured' : 'default'} 
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <h3 className="text-lg font-medium mb-2">No franchises found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any franchises matching your current filters.
              </p>
              <button 
                onClick={() => setSearchParams({})} 
                className="text-franchise-blue hover:text-franchise-teal underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Franchises;
