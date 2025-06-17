import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Shadcn button for controls
import { cn } from '@/lib/utils';

interface CarouselProps {
  slides: React.ReactNode[]; // Array of slide contents (JSX elements)
  options?: Parameters<typeof useEmblaCarousel>[0];
  showArrows?: boolean;
  showDots?: boolean;
  autoplay?: boolean;
  autoplayOptions?: Parameters<typeof Autoplay>[0];
  className?: string;
  slideClassName?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  options = { loop: true },
  showArrows = true,
  showDots = true,
  autoplay = true,
  autoplayOptions = { delay: 4000, stopOnInteraction: false },
  className,
  slideClassName,
}) => {
  const plugins = autoplay ? [Autoplay(autoplayOptions)] : [];
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  console.log("Rendering Carousel with", slides.length, "slides.");

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    onSelect(); // Set initial selected index
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  if (!slides || slides.length === 0) {
    return <div className={cn("flex items-center justify-center h-64 bg-gray-100 rounded-lg", className)}>No slides to display.</div>;
  }

  return (
    <div className={cn("relative overflow-hidden embla", className)} ref={emblaRef}>
      <div className="embla__container flex">
        {slides.map((slide, index) => (
          <div
            className={cn("embla__slide flex-[0_0_100%] min-w-0", slideClassName)}
            key={index}
          >
            {slide}
          </div>
        ))}
      </div>

      {showArrows && emblaApi && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-2 -translate-y-1/2 z-10 rounded-full bg-white/50 hover:bg-white/80"
            onClick={scrollPrev}
            disabled={!emblaApi?.canScrollPrev()}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-2 -translate-y-1/2 z-10 rounded-full bg-white/50 hover:bg-white/80"
            onClick={scrollNext}
            disabled={!emblaApi?.canScrollNext()}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {showDots && emblaApi && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                index === selectedIndex ? "bg-white w-4 scale-110" : "bg-white/50 hover:bg-white/75"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;