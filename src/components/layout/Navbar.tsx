
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import CustomButton from '@/components/ui/CustomButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <nav className="container-custom py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-franchise-blue">FranchiseNexus</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          <div className="space-x-6 text-sm font-medium">
            <Link to="/" className="text-franchise-blue hover:text-franchise-teal transition">
              Home
            </Link>
            <Link to="/franchises" className="text-gray-600 hover:text-franchise-teal transition">
              Explore Franchises
            </Link>
            <div className="relative inline-block group">
              <button className="flex items-center text-gray-600 hover:text-franchise-teal transition">
                Resources
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute hidden group-hover:block right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <Link to="/blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Blog & Insights
                </Link>
                <Link to="/faq" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  FAQ
                </Link>
              </div>
            </div>
            <Link to="/contact" className="text-gray-600 hover:text-franchise-teal transition">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <CustomButton variant="outline" size="sm">
              Sign In
            </CustomButton>
            <CustomButton size="sm">
              Sign Up
            </CustomButton>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <button 
            onClick={toggleMenu}
            className="p-2 text-gray-600 hover:text-franchise-blue"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white pt-16 px-4 md:hidden">
          <div className="flex flex-col space-y-4 py-6">
            <Link 
              to="/" 
              className="text-lg font-medium py-2 text-franchise-blue hover:text-franchise-teal"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/franchises" 
              className="text-lg font-medium py-2 text-gray-600 hover:text-franchise-teal"
              onClick={toggleMenu}
            >
              Explore Franchises
            </Link>
            <div className="py-2">
              <p className="text-lg font-medium text-gray-600 mb-2">Resources</p>
              <div className="ml-4 space-y-2">
                <Link 
                  to="/blog" 
                  className="block text-gray-600 hover:text-franchise-teal"
                  onClick={toggleMenu}
                >
                  Blog & Insights
                </Link>
                <Link 
                  to="/faq" 
                  className="block text-gray-600 hover:text-franchise-teal"
                  onClick={toggleMenu}
                >
                  FAQ
                </Link>
              </div>
            </div>
            <Link 
              to="/contact" 
              className="text-lg font-medium py-2 text-gray-600 hover:text-franchise-teal"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <div className="pt-4 space-y-3">
              <CustomButton variant="outline" fullWidth>
                Sign In
              </CustomButton>
              <CustomButton fullWidth>
                Sign Up
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
