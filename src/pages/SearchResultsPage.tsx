import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DynamicProductCard from '@/components/DynamicProductCard';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Label } from '@/components/ui/label';
import Footer from '@/components/layout/Footer';
import { useSearchParams, Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const allProductsForSearch = [
  { id: 'iphone-15-pro', name: 'iPhone 15 Pro', price: '$999', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708', description: 'The ultimate iPhone experience with A17 Pro chip.', category: 'iPhone', productUrl: '/product-detail/iphone-15-pro' },
  { id: 'macbook-air-m2', name: 'MacBook Air M2', price: '$1099', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665', description: 'Impressively big. Impossibly thin. Powered by M2.', category: 'Mac', productUrl: '/product-detail/macbook-air-m2' },
  { id: 'ipad-pro', name: 'iPad Pro', price: '$799', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-13-select-wifi-spacegray-202405?wid=940&hei=1112&fmt=p-jpg&qlt=95&.v=1713488281166', description: 'The ultimate iPad with the M2 chip.', category: 'iPad', productUrl: '/product-detail/ipad-pro' },
  { id: 'apple-watch-s9', name: 'Apple Watch Series 9', price: '$399', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MPLP3ref_VW_34FR+watch-45-alum-midnight-nc-9s_VW_34FR+watch-face-45-modular-9s_VW_34FR_GEO_US?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1693013373247', description: 'Smarter. Brighter. Mightier.', category: 'Watch', productUrl: '/product-detail/apple-watch-s9' },
  { id: 'support-article-sync', name: 'Support: Syncing across devices', price: 'Article', imageUrl: 'https://images.unsplash.com/photo-1544228790-5314169cba8d?w=300&h=300&fit=crop', description: 'Learn how to sync your data and settings seamlessly.', category: 'Support', productUrl: '/support/article/syncing' },
];

const ITEMS_PER_PAGE = 8;

const SearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = React.useState(query);
  const [currentPage, setCurrentPage] = React.useState(1);

  console.log(`SearchResultsPage loaded for query: ${query}`);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchTerm });
    setCurrentPage(1); // Reset to first page on new search
  };

  const filteredResults = React.useMemo(() => {
    if (!query.trim()) return [];
    return allProductsForSearch.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
  const currentResults = filteredResults.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-12">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Search Results {query && `for "${query}"`}
          </h1>
          <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto">
            <Label htmlFor="page-search-input" className="sr-only">Search</Label>
            <Input
              id="page-search-input"
              type="search"
              placeholder="Search products and articles..."
              className="w-full p-3 pr-12 text-base rounded-lg shadow focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600">
              <Search className="h-5 w-5" />
            </Button>
          </form>
        </header>

        {query && currentResults.length > 0 && (
          <p className="text-gray-600 mb-6">
            Showing {currentResults.length} of {filteredResults.length} results.
          </p>
        )}

        {query && currentResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {currentResults.map((item) => (
              <DynamicProductCard
                key={item.id}
                product={item}
                onAddToCart={(id) => console.log('Add to cart from search:', id)}
                className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl overflow-hidden border border-gray-200/50"
              />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-10">
            <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <Label className="text-xl text-gray-500">No results found for "{query}".</Label>
            <p className="mt-2 text-gray-400">Try a different search term or browse our categories.</p>
            <div className="mt-6">
              <Link to="/products/all">
                <Button variant="outline">Browse All Products</Button>
              </Link>
            </div>
          </div>
        ) : (
           <div className="text-center py-10">
             <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
             <Label className="text-xl text-gray-500">Enter a term to search.</Label>
             <p className="mt-2 text-gray-400">Find products, support articles, and more.</p>
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
      </main>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;