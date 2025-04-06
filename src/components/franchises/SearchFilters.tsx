
import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '@/components/ui/CustomButton';

interface SearchFiltersProps {
  onSearch?: (searchTerm: string) => void;
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  category: string;
  investmentMin: number | null;
  investmentMax: number | null;
  country: string;
}

const SearchFilters = ({ onSearch, onFilterChange }: SearchFiltersProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    investmentMin: null,
    investmentMax: null,
    country: '',
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    } else {
      navigate(`/franchises?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleFilterChange = (filterName: keyof FilterState, value: string | number | null) => {
    const updatedFilters = { ...filters, [filterName]: value };
    setFilters(updatedFilters);
    
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };

  const clearFilters = () => {
    const resetFilters = {
      category: '',
      investmentMin: null,
      investmentMax: null,
      country: '',
    };
    
    setFilters(resetFilters);
    
    if (onFilterChange) {
      onFilterChange(resetFilters);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search franchises..."
            className="w-full py-2.5 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-franchise-blue focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <CustomButton type="submit">
          Search
        </CustomButton>
        
        <CustomButton
          type="button"
          variant="outline"
          className="flex items-center gap-1.5"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
          {showFilters ? 'Hide Filters' : 'Filters'}
        </CustomButton>
      </form>

      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-franchise-blue"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Retail">Retail</option>
                <option value="Services">Services</option>
                <option value="Health & Fitness">Health & Fitness</option>
                <option value="Education">Education</option>
                <option value="Technology">Technology</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Investment</label>
              <select
                className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-franchise-blue"
                value={filters.investmentMin?.toString() || ''}
                onChange={(e) => handleFilterChange('investmentMin', e.target.value ? parseInt(e.target.value) : null)}
              >
                <option value="">No Minimum</option>
                <option value="50000">$50K</option>
                <option value="100000">$100K</option>
                <option value="250000">$250K</option>
                <option value="500000">$500K</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Investment</label>
              <select
                className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-franchise-blue"
                value={filters.investmentMax?.toString() || ''}
                onChange={(e) => handleFilterChange('investmentMax', e.target.value ? parseInt(e.target.value) : null)}
              >
                <option value="">No Maximum</option>
                <option value="100000">$100K</option>
                <option value="250000">$250K</option>
                <option value="500000">$500K</option>
                <option value="1000000">$1M</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <select
                className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-franchise-blue"
                value={filters.country}
                onChange={(e) => handleFilterChange('country', e.target.value)}
              >
                <option value="">All Countries</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <CustomButton
              type="button"
              variant="ghost"
              className="text-gray-600 flex items-center gap-1.5"
              onClick={clearFilters}
            >
              <X className="h-4 w-4" />
              Clear Filters
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
