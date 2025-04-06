
import { categories } from '@/data/franchises';
import { Link } from 'react-router-dom';

const CategorySection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-franchise-blue">Browse By Category</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Explore franchise opportunities across different industries to find the perfect match for your entrepreneurial goals
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link 
              key={category.name}
              to={`/franchises?category=${encodeURIComponent(category.name)}`}
              className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-shadow group"
            >
              <div className="text-3xl mb-3">{category.icon}</div>
              <h3 className="font-medium text-lg text-franchise-blue group-hover:text-franchise-teal transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {category.count} opportunities
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
