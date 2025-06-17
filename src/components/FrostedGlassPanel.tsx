import React from 'react';
import { cn } from '@/lib/utils'; // Assuming cn utility for Tailwind class merging

interface FrostedGlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  blurAmount?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'; // Tailwind blur amounts
  backgroundColor?: string; // e.g., 'bg-white/30'
  borderRadius?: string; // e.g., 'rounded-lg'
}

const FrostedGlassPanel: React.FC<FrostedGlassPanelProps> = ({
  children,
  className,
  blurAmount = 'md',
  backgroundColor = 'bg-white/30', // Default light frosted glass
  borderRadius = 'rounded-xl',
  ...props
}) => {
  console.log("Rendering FrostedGlassPanel");

  const blurClass = `backdrop-blur-${blurAmount}`;

  return (
    <div
      className={cn(
        'p-6 shadow-lg', // Basic styling
        backgroundColor,
        blurClass,
        borderRadius,
        className // Allow overriding/extending classes
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default FrostedGlassPanel;