import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Button } from '@/components/ui/button';
import HeroBanner from '@/components/HeroBanner';
import ProductShowcaseModule from '@/components/ProductShowcaseModule';
import DynamicProductCard from '@/components/DynamicProductCard';
import { Label } from '@/components/ui/label';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';

const sampleProducts = [
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    price: '$999',
    imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708',
    description: 'The ultimate iPhone experience.',
    category: 'iPhone',
    productUrl: '/product-detail/iphone-15-pro',
  },
  {
    id: 'macbook-air-m2',
    name: 'MacBook Air M2',
    price: '$1099',
    imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665',
    description: 'Impressively big. Impossibly thin.',
    category: 'Mac',
    productUrl: '/product-detail/macbook-air-m2',
  },
  {
    id: 'ipad-pro',
    name: 'iPad Pro',
    price: '$799',
    imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-13-select-wifi-spacegray-202405?wid=940&hei=1112&fmt=p-jpg&qlt=95&.v=1713488281166',
    description: 'The ultimate iPad with M2 chip.',
    category: 'iPad',
    productUrl: '/product-detail/ipad-pro',
  },
];

const Homepage: React.FC = () => {
  console.log('Homepage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <NavigationMenu />
      <main className="flex-grow">
        <HeroBanner
          title="Innovation Unleashed."
          subtitle="Discover the future of technology. Elegantly designed, powerfully built."
          imageUrl="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" // Placeholder image for a sleek tech product
          ctaText="Explore Our Range"
          ctaLink="/products/all"
          className="text-white"
        />

        <ProductShowcaseModule
          title="Featured Products"
          description="Experience the cutting edge with our latest innovations."
          className="py-16 bg-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleProducts.slice(0, 3).map((product) => (
              <DynamicProductCard
                key={product.id}
                product={product}
                onAddToCart={(id) => console.log('Add to cart:', id)}
              />
            ))}
          </div>
           <div className="text-center mt-12">
            <Label htmlFor="view-all-products" className="sr-only">View all products</Label>
            <Link to="/products/all">
              <Button id="view-all-products" variant="outline" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </ProductShowcaseModule>

        <section className="py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-lg text-slate-300 mb-8">
              We are committed to delivering exceptional quality, innovative design, and unparalleled user experience.
              Our products are crafted with precision and passion.
            </p>
            <Link to="/about">
                <Button variant="secondary" size="lg">Learn More About Our Vision</Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;