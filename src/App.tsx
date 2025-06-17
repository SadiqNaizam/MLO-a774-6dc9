import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import ProductCategoryPage from "./pages/ProductCategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SupportPage from "./pages/SupportPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          
          {/* Product Category Routes */}
          <Route path="/products/:categoryName" element={<ProductCategoryPage />} />
          {/* Specific Product Detail Route */}
          <Route path="/product-detail/:productId" element={<ProductDetailPage />} />
          
          <Route path="/support" element={<SupportPage />} />
          <Route path="/searchresults" element={<SearchResultsPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;