import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Button } from '@/components/ui/button';
import HeroBanner from '@/components/HeroBanner';
import ProductShowcaseModule from '@/components/ProductShowcaseModule';
import DynamicProductCard from '@/components/DynamicProductCard';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Label } from '@/components/ui/label';
import Footer from '@/components/layout/Footer';
import { useParams, Link } from 'react-router-dom'; // To get category from URL

// Sample products for different categories
const allProducts = [
  // iPhones
  { id: 'iphone-15-pro', name: 'iPhone 15 Pro', price: '$999', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708', description: 'The ultimate iPhone.', category: 'iPhone', productUrl: '/product-detail/iphone-15-pro' },
  { id: 'iphone-15', name: 'iPhone 15', price: '$799', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923777972', description: 'A total powerhouse.', category: 'iPhone', productUrl: '/product-detail/iphone-15' },
  // Macs
  { id: 'macbook-pro-14', name: 'MacBook Pro 14"', price: '$1999', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697230830200', description: 'Mind-blowing performance.', category: 'Mac', productUrl: '/product-detail/macbook-pro-14' },
  { id: 'imac-24', name: 'iMac 24"', price: '$1299', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697303731631', description: 'Say hello to the new iMac.', category: 'Mac', productUrl: '/product-detail/imac-24' },
  // iPads
  { id: 'ipad-air', name: 'iPad Air', price: '$599', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=940&hei=1112&fmt=p-jpg&qlt=95&.v=1645065732619', description: 'Light. Bright. Full of might.', category: 'iPad', productUrl: '/product-detail/ipad-air' },
  { id: 'ipad-mini', name: 'iPad mini', price: '$499', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-mini-finish-select-gallery-202211-space-gray?wid=2560&hei=1440&fmt=p-jpg&qlt=95&.v=1667605720015', description: 'Mega power. Mini sized.', category: 'iPad', productUrl: '/product-detail/ipad-mini' },
  // Generic "All" products
  { id: 'watch-ultra-2', name: 'Apple Watch Ultra 2', price: '$799', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQE23ref_VW_34FR+watch-49-titanium-ultra2_VW_34FR+watch-face-49-alpine-ultra2_VW_34FR_GEO_US?wid=700&hei=700&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1693250009039', description: 'Next-level adventure.', category: 'Watch', productUrl: '/product-detail/watch-ultra-2' },
  { id: 'airpods-pro-2', name: 'AirPods Pro (2nd gen)', price: '$249', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361', description: 'Adaptive Audio. Now playing.', category: 'AirPods', productUrl: '/product-detail/airpods-pro-2' },
];

const ProductCategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName?: string }>();
  console.log(`ProductCategoryPage loaded for category: ${categoryName}`);

  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = React.useState(1);

  const categoryTitle = categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : 'All Products';
  
  const filteredProducts = categoryName && categoryName !== 'all'
    ? allProducts.filter(p => p.category.toLowerCase() === categoryName.toLowerCase())
    : allProducts;

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const heroImages: { [key: string]: string } = {
    iphone: 'https://images.unsplash.com/photo-1604054923518-504191722f17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXBob25lJTIwbGludXVwfGVufDB8fDB8fHww&w=1000&q=80',
    mac: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
    ipad: 'https://images.unsplash.com/photo-1587027144724-99990f05a71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aXBhZHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
    all: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHN8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
  };
  const heroImage = categoryName ? (heroImages[categoryName.toLowerCase()] || heroImages.all) : heroImages.all;


  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <NavigationMenu />
      <main className="flex-grow">
        <HeroBanner
          title={categoryTitle}
          subtitle={`Browse our collection of ${categoryTitle.toLowerCase()}.`}
          imageUrl={heroImage}
          className="text-white"
        />
        <ProductShowcaseModule
          title={`Explore ${categoryTitle}`}
          description={`Find the perfect ${categoryName && categoryName !== 'all' ? categoryName.toLowerCase() : 'product'} for your needs.`}
          className="py-12"
        >
          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {currentProducts.map((product) => (
                <DynamicProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(id) => console.log('Add to cart:', id)}
                  className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl overflow-hidden border border-gray-200/50"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Label className="text-xl text-gray-500">No products found in this category.</Label>
              <div className="mt-6">
                <Link to="/products/all">
                  <Button variant="outline">Browse All Products</Button>
                </Link>
              </div>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); setCurrentPage(prev => Math.max(1, prev - 1)); }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1); }}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {/* Add Ellipsis logic if many pages */}
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); setCurrentPage(prev => Math.min(totalPages, prev + 1)); }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </ProductShowcaseModule>
      </main>
      <Footer />
    </div>
  );
};

export default ProductCategoryPage;