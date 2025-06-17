import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Button } from '@/components/ui/button';
import { Menu, X, ShoppingBag, Search } from 'lucide-react'; // Example icons
// import FrostedGlassPanel from '@/components/FrostedGlassPanel'; // If MegaMenu uses it

// Define types for navigation items
interface NavItem {
  label: string;
  href: string;
  children?: SubNavItem[]; // For dropdowns or mega menus
}

interface SubNavItem {
  label: string;
  href: string;
  description?: string;
}

const mainNavItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products', children: [ // Example of a dropdown/megamenu trigger
    { label: 'All Products', href: '/products/all', description: 'Browse our entire collection.' },
    { label: 'New Arrivals', href: '/products/new', description: 'Check out the latest items.' },
    { label: 'Featured', href: '/products/featured', description: 'Our most popular products.' },
  ]},
  { label: 'Support', href: '/support' },
  { label: 'Search', href: '/searchresults' }, // Could also be an input field
];

const NavigationMenu: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  console.log("Rendering NavigationMenu. Mobile open:", mobileMenuOpen, "Active mega menu:", activeMegaMenu);

  const toggleMobileMenu = () => {
    console.log("Toggling mobile menu");
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMegaMenuToggle = (label: string) => {
    console.log("Toggling mega menu for:", label);
    setActiveMegaMenu(activeMegaMenu === label ? null : label);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-gray-800">
            MyApp
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 items-center">
            {mainNavItems.map((item) => (
              <div key={item.label} className="relative">
                {item.children ? (
                  <Button variant="ghost" onClick={() => handleMegaMenuToggle(item.label)} className="text-gray-600 hover:text-gray-900">
                    {item.label}
                  </Button>
                ) : (
                  <Link to={item.href}>
                    <Button variant="ghost" className="text-gray-600 hover:text-gray-900">{item.label}</Button>
                  </Link>
                )}
                {/* Placeholder for MegaMenu content */}
                {item.children && activeMegaMenu === item.label && (
                  // <FrostedGlassPanel className="absolute top-full left-0 mt-2 w-96 p-4 shadow-lg rounded-md">
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-auto min-w-[20rem] max-w-md p-4 bg-white/90 backdrop-blur-lg shadow-xl rounded-lg border border-gray-200/50">
                    <p className="font-semibold text-gray-800 mb-2">{item.label} Menu</p>
                    <ul className="space-y-2">
                      {item.children.map(subItem => (
                        <li key={subItem.label}>
                          <Link to={subItem.href} className="block p-2 hover:bg-gray-100 rounded-md text-sm text-gray-700" onClick={() => setActiveMegaMenu(null)}>
                            <span className="font-medium">{subItem.label}</span>
                            {subItem.description && <p className="text-xs text-gray-500">{subItem.description}</p>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  // </FrostedGlassPanel>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/searchresults"><Search className="h-5 w-5 text-gray-600 hover:text-gray-900" /></Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/cart"><ShoppingBag className="h-5 w-5 text-gray-600 hover:text-gray-900" /></Link>
            </Button>
            {/* Add Login/Profile Button */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle menu">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-40 p-4 border-t border-gray-200/50">
          <ul className="space-y-2">
            {mainNavItems.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <div>
                    <Button variant="ghost" className="w-full justify-start text-gray-700" onClick={() => handleMegaMenuToggle(item.label)}>
                      {item.label}
                    </Button>
                    {activeMegaMenu === item.label && (
                      <ul className="pl-4 mt-1 space-y-1">
                        {item.children.map(subItem => (
                           <li key={subItem.label}>
                             <Link to={subItem.href} className="block p-2 hover:bg-gray-100 rounded-md text-sm text-gray-600" onClick={toggleMobileMenu}>
                               {subItem.label}
                             </Link>
                           </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link to={item.href}>
                    <Button variant="ghost" className="w-full justify-start text-gray-700" onClick={toggleMobileMenu}>{item.label}</Button>
                  </Link>
                )}
              </li>
            ))}
            <li className="pt-2 border-t border-gray-200">
                 <Link to="/cart">
                    <Button variant="ghost" className="w-full justify-start text-gray-700" onClick={toggleMobileMenu}>
                        <ShoppingBag className="h-5 w-5 mr-2"/> Cart
                    </Button>
                 </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavigationMenu;