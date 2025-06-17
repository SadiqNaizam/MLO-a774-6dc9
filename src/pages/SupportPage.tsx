import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import Footer from '@/components/layout/Footer';
import { LifeBuoy, MessageSquare, Phone, Search } from 'lucide-react';

const faqItems = [
  {
    id: "faq1",
    question: "How do I track my order?",
    answer: "You can track your order by logging into your account and navigating to the 'Order History' section. Alternatively, use the tracking link provided in your shipping confirmation email.",
  },
  {
    id: "faq2",
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for most items. Products must be in original condition with all packaging. Some exclusions apply. Please visit our 'Returns' page for full details.",
  },
  {
    id: "faq3",
    question: "How can I update my account information?",
    answer: "To update your account information, log in and go to 'My Account'. From there, you can edit your personal details, shipping addresses, and payment methods.",
  },
  {
    id: "faq4",
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by destination. Please check our 'Shipping Information' page or proceed to checkout to see options for your location.",
  },
];

const SupportPage: React.FC = () => {
  console.log('SupportPage loaded');
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching support for:', searchTerm);
    // Implement search logic here or redirect to search results
  };


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-slate-200 text-gray-800">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <LifeBuoy className="mx-auto h-16 w-16 text-blue-600 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Support Center</h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            We're here to help! Find answers to your questions, contact our team, or explore resources.
          </p>
        </header>

        {/* Search Bar */}
        <section className="mb-12 max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="relative">
            <Label htmlFor="support-search" className="sr-only">Search Support</Label>
            <Input
              id="support-search"
              type="search"
              placeholder="Search FAQs and articles..."
              className="w-full p-4 pr-12 text-lg rounded-lg shadow-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" size="icon" variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600">
              <Search className="h-6 w-6" />
            </Button>
          </form>
        </section>

        {/* Contact Options & FAQ */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Cards */}
          <div className="md:col-span-1 space-y-6">
            <Card className="shadow-lg hover:shadow-xl transition-shadow bg-white/70 backdrop-blur-md rounded-xl border border-gray-200/50">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <MessageSquare className="mr-3 h-6 w-6 text-blue-600" />
                  Chat With Us
                </CardTitle>
                <CardDescription>Get instant answers from our support team.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Live Chat</Button>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow bg-white/70 backdrop-blur-md rounded-xl border border-gray-200/50">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Phone className="mr-3 h-6 w-6 text-green-600" />
                  Call Us
                </CardTitle>
                <CardDescription>Speak directly to a support agent.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-green-700">1-800-123-4567</p>
                <p className="text-sm text-gray-500">Mon-Fri, 9am-5pm EST</p>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Accordion */}
          <div className="md:col-span-2">
            <Card className="shadow-xl bg-white/80 backdrop-blur-lg rounded-xl border border-gray-200/50 p-2 sm:p-0">
                <CardHeader className="px-4 pt-4 sm:px-6 sm:pt-6">
                    <CardTitle className="text-2xl font-semibold">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="px-2 pb-4 sm:px-6 sm:pb-6">
                    <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item) => (
                        <AccordionItem value={item.id} key={item.id} className="border-b border-gray-200/70 last:border-b-0">
                        <AccordionTrigger className="text-left hover:no-underline py-4 text-gray-700 font-medium data-[state=open]:text-blue-600">
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="pt-1 pb-4 text-gray-600 leading-relaxed">
                            {item.answer}
                        </AccordionContent>
                        </AccordionItem>
                    ))}
                    </Accordion>
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SupportPage;