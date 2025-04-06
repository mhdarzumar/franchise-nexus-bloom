
import { Link } from 'react-router-dom';
import { Star, MapPin, DollarSign } from 'lucide-react';
import { Franchise } from '@/types';
import { cn } from '@/lib/utils';

interface FranchiseCardProps {
  franchise: Franchise;
  variant?: 'default' | 'featured';
}

const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
};

const FranchiseCard = ({ franchise, variant = 'default' }: FranchiseCardProps) => {
  const isFeatured = variant === 'featured';

  return (
    <div 
      className={cn(
        "bg-white rounded-xl overflow-hidden card-shadow transition-all duration-300",
        isFeatured && "border-2 border-franchise-teal"
      )}
    >
      <div className="relative">
        <div className="aspect-video w-full bg-gray-200 overflow-hidden">
          {/* Replace with actual image */}
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500">{franchise.name}</span>
          </div>
        </div>
        {franchise.featured && (
          <div className="absolute top-3 right-3 bg-franchise-teal text-white text-xs font-medium px-2 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>

      <div className="p-5 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg line-clamp-1">{franchise.name}</h3>
            <p className="text-sm text-gray-600">{franchise.category}</p>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium ml-1">{franchise.rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">{franchise.description}</p>

        <div className="flex flex-col gap-2">
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="w-4 h-4 mr-2 text-franchise-blue" />
            <span>
              {formatCurrency(franchise.investmentRange.min)} - {formatCurrency(franchise.investmentRange.max)}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-franchise-blue" />
            <span className="line-clamp-1">
              {franchise.locations.length > 1 
                ? `${franchise.locations[0].country} +${franchise.locations.length - 1} more`
                : franchise.locations[0].country}
            </span>
          </div>
        </div>

        <Link
          to={`/franchise/${franchise.slug}`}
          className={cn(
            "block w-full py-2.5 px-4 rounded-md text-center text-sm font-medium transition-colors",
            isFeatured 
              ? "bg-franchise-teal text-white hover:bg-franchise-teal/90"
              : "bg-franchise-blue text-white hover:bg-franchise-blue/90"
          )}
        >
          View Opportunity
        </Link>
      </div>
    </div>
  );
};

export default FranchiseCard;
