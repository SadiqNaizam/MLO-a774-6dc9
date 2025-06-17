import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import CustomCarousel from '@/components/Carousel'; // Renamed to avoid conflict with shadcn if it existed
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import FrostedGlassPanel from '@/components/FrostedGlassPanel';
import { Label } from '@/components/ui/label';
import Footer from '@/components/layout/Footer';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Zap, ShieldCheck, Layers } from 'lucide-react'; // Icons

// Sample product data, should ideally be fetched or passed via state/props
const sampleProductDetails: { [key: string]: any } = {
  'iphone-15-pro': {
    name: 'iPhone 15 Pro',
    category: 'iPhone',
    categoryLink: '/products/iphone',
    price: '$999',
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=2000&hei=2000&fmt=jpeg&qlt=90&.v=1692845702708',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium?wid=2000&hei=2000&fmt=jpeg&qlt=90&.v=1692845699190',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-whitetitanium?wid=2000&hei=2000&fmt=jpeg&qlt=90&.v=1692845707313',
    ],
    shortDescription: 'The ultimate iPhone, powered by the A17 Pro chip. Pro camera system. Action button. Titanium design.',
    features: [
      { icon: <Zap className="w-5 h-5 mr-2 text-blue-500" />, title: 'A17 Pro Chip', description: 'Game-changing chip with groundbreaking performance.' },
      { icon: <Layers className="w-5 h-5 mr-2 text-green-500" />, title: 'Titanium Design', description: 'Strong and light aerospace-grade titanium.' },
      { icon: <ShieldCheck className="w-5 h-5 mr-2 text-red-500" />, title: 'Pro Camera System', description: 'Capture stunning photos and videos with more detail.' },
    ],
    specs: 'Display: 6.1" Super Retina XDR | Chip: A17 Pro | Camera: 48MP Main, Ultra Wide, Telephoto | Battery: All-day battery life',
    faqs: [
      { q: 'Is it water resistant?', a: 'Yes, iPhone 15 Pro is rated IP68 (maximum depth of 6 meters up to 30 minutes) under IEC standard 60529.' },
      { q: 'What colors are available?', a: 'Natural Titanium, Blue Titanium, White Titanium, and Black Titanium.' },
    ]
  },
   'macbook-air-m2': {
    name: 'MacBook Air M2',
    category: 'Mac',
    categoryLink: '/products/mac',
    price: '$1099',
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=2000&hei=2000&fmt=jpeg&qlt=90&.v=1653084303665',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-spacegray-select-20220606?wid=2000&hei=2000&fmt=jpeg&qlt=90&.v=1653084303687',
      'https://store.storeimages.cdn-apple.com/is/macbook-air-starlight-select-20220606?wid=2000&hei=2000&fmt=jpeg&qlt=90&.v=1653084305816',
    ],
    shortDescription: 'Redesigned around the next-generation M2 chip, MacBook Air is strikingly thin and brings exceptional speed and power efficiency.',
    features: [
      { icon: <Zap className="w-5 h-5 mr-2 text-blue-500" />, title: 'M2 Chip', description: 'Next-generation performance and efficiency.' },
      { icon: <Layers className="w-5 h-5 mr-2 text-green-500" />, title: 'Liquid Retina Display', description: 'Stunning 13.6-inch display with True Tone.' },
      { icon: <ShieldCheck className="w-5 h-5 mr-2 text-red-500" />, title: 'All-Day Battery', description: 'Up to 18 hours of battery life.' },
    ],
    specs: 'Display: 13.6" Liquid Retina | Chip: Apple M2 | Memory: Up to 24GB | Storage: Up to 2TB SSD',
    faqs: [
      { q: 'Does it have a fan?', a: 'No, the MacBook Air M2 features a fanless design for silent operation.' },
      { q: 'What ports are included?', a: 'Two Thunderbolt / USB 4 ports, MagSafe 3 charging port, and a 3.5 mm headphone jack.' },
    ]
  }
  // Add more products as needed
};


const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId?: string }>();
  console.log(`ProductDetailPage loaded for product: ${productId}`);

  const product = productId ? sampleProductDetails[productId] : null;

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
        <NavigationMenu />
        <main className="flex-grow container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold">Product Not Found</h1>
          <p className="mt-4 text-lg">We couldn't find the product you were looking for.</p>
          <Link to="/products/all" className="mt-6 inline-block">
            <Button variant="default">Browse All Products</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const carouselSlides = product.images.map((imgUrl: string, index: number) => (
    <div key={index} className="h-[300px] md:h-[500px] bg-gray-200 flex items-center justify-center">
      <img src={imgUrl} alt={`${product.name} - View ${index + 1}`} className="object-contain max-h-full max-w-full" />
    </div>
  ));

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to={product.categoryLink || "/products/all"}>{product.category || "Products"}</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Carousel */}
          <FrostedGlassPanel className="rounded-lg overflow-hidden shadow-xl" backgroundColor="bg-gray-500/10" blurAmount="sm">
            <CustomCarousel slides={carouselSlides} options={{ loop: true }} autoplay={false} />
          </FrostedGlassPanel>

          {/* Right Column: Product Info */}
          <div className="flex flex-col space-y-6">
            <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
            <p className="text-2xl font-semibold text-blue-600">{product.price}</p>
            <p className="text-gray-600 text-lg">{product.shortDescription}</p>
            
            <div className="space-y-3 pt-4">
                {product.features.map((feature: {icon: React.ReactNode, title: string, description: string}, index: number) => (
                    <div key={index} className="flex items-start p-3 bg-slate-100/70 rounded-lg">
                        {feature.icon}
                        <div>
                            <h3 className="font-semibold text-md">{feature.title}</h3>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="flex-1 bg-blue-600 hover:bg-blue-700">
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                Buy Now
              </Button>
            </div>
            <Label htmlFor="product-actions" className="sr-only">Product Actions</Label>
          </div>
        </div>

        {/* Lower Section: Tabs for Details, Specs, FAQs */}
        <div className="mt-12 lg:mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 bg-gray-100/80 backdrop-blur-sm p-1 rounded-lg">
              <TabsTrigger value="details" className="data-[state=active]:bg-white data-[state=active]:shadow-md">Features</TabsTrigger>
              <TabsTrigger value="specs" className="data-[state=active]:bg-white data-[state=active]:shadow-md">Specifications</TabsTrigger>
              <TabsTrigger value="faqs" className="data-[state=active]:bg-white data-[state=active]:shadow-md">FAQs</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="py-6">
              <FrostedGlassPanel backgroundColor="bg-slate-500/5" blurAmount="sm" className="p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">In-Depth Features</h2>
                <ul className="space-y-2 list-disc list-inside text-gray-700">
                  {product.features.map((feature: {title: string, description: string}, index: number) => (
                    <li key={index}><strong>{feature.title}:</strong> {feature.description}</li>
                  ))}
                  <li>Premium 'Liquid Glass' finish for unparalleled aesthetic appeal.</li>
                  <li>Intuitive user interface designed for seamless interaction.</li>
                </ul>
              </FrostedGlassPanel>
            </TabsContent>
            <TabsContent value="specs" className="py-6">
              <FrostedGlassPanel backgroundColor="bg-slate-500/5" blurAmount="sm" className="p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Technical Specifications</h2>
                <p className="text-gray-700 whitespace-pre-line">{product.specs}</p>
              </FrostedGlassPanel>
            </TabsContent>
            <TabsContent value="faqs" className="py-6">
              <FrostedGlassPanel backgroundColor="bg-slate-500/5" blurAmount="sm" className="p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {product.faqs.map((faq: {q: string, a: string}, index: number) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger className="hover:no-underline">{faq.q}</AccordionTrigger>
                      <AccordionContent className="text-gray-600">{faq.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </FrostedGlassPanel>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;