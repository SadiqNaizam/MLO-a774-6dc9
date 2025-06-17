import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ShoppingCart, Eye } from 'lucide-react'; // Example icons
import { Link } from 'react-router-dom'; // Assuming react-router-dom for product details link

interface Product {
  id: string | number;
  name: string;
  price: string | number; // Can be formatted string like "$99.99" or number
  imageUrl: string;
  description?: string;
  category?: string;
  productUrl?: string; // Link to product detail page
}

interface DynamicProductCardProps {
  product: Product;
  onAddToCart?: (productId: string | number) => void;
  className?: string;
}

const DynamicProductCard: React.FC<DynamicProductCardProps> = ({ product, onAddToCart, className = '' }) => {
  console.log("Rendering DynamicProductCard:", product.name);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation if card is wrapped in Link
    e.stopPropagation();
    if (onAddToCart) {
      console.log("Adding to cart:", product.id);
      onAddToCart(product.id);
    }
  };

  const cardContent = (
    <Card className={`w-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl group ${className}`}>
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={1 / 1} className="bg-gray-100">
          <img
            src={product.imageUrl || '/placeholder.svg'}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
        {product.category && (
          <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
            {product.category}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 space-y-1">
        <CardTitle className="text-lg font-semibold leading-tight truncate group-hover:text-blue-600">
          {product.name}
        </CardTitle>
        {product.description && (
          <CardDescription className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </CardDescription>
        )}
        <p className="text-lg font-bold text-gray-800 pt-1">
          {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row gap-2">
        {onAddToCart && (
          <Button variant="outline" size="sm" className="w-full sm:w-auto flex-1 group/button" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4 transition-transform duration-200 group-hover/button:scale-110" /> Add to Cart
          </Button>
        )}
        {product.productUrl && (
           <Button variant="ghost" size="sm" className="w-full sm:w-auto flex-1" asChild>
             <Link to={product.productUrl}>
               <Eye className="mr-2 h-4 w-4" /> View
             </Link>
           </Button>
        )}
      </CardFooter>
    </Card>
  );
  
  return product.productUrl ? <Link to={product.productUrl} className="block">{cardContent}</Link> : cardContent;
};

export default DynamicProductCard;