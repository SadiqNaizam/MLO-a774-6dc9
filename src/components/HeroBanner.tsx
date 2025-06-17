import React from 'react';
import { Button } from '@/components/ui/button'; // Example: shadcn Button
import { Link } from 'react-router-dom';

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  imageUrl?: string; // Background image
  ctaText?: string;
  ctaLink?: string;
  children?: React.ReactNode; // For custom content
  className?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  subtitle,
  imageUrl,
  ctaText,
  ctaLink,
  children,
  className = ''
}) => {
  console.log("Rendering HeroBanner with title:", title);

  const backgroundStyle = imageUrl ? { backgroundImage: `url(${imageUrl})` } : {};

  return (
    <div
      className={`relative bg-gray-900 text-white py-20 sm:py-32 md:py-40 bg-cover bg-center ${className}`}
      style={backgroundStyle}
    >
      {!imageUrl && <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700"></div>}
      {imageUrl && <div className="absolute inset-0 bg-black/50"></div>} {/* Overlay for better text readability */}
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        {ctaText && ctaLink && (
          <div className="mt-8">
            <Link to={ctaLink}>
              <Button size="lg" variant="default" className="bg-white text-gray-900 hover:bg-gray-200 transition-colors duration-300 ease-in-out transform hover:scale-105">
                {ctaText}
              </Button>
            </Link>
          </div>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
};

export default HeroBanner;