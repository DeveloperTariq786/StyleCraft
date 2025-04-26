import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "The Summer Collection",
    subtitle: "Effortless elegance for the modern wardrobe",
    buttonText: "Shop Now",
    buttonLink: "/products?collection=summer",
    image: "https://images.unsplash.com/photo-1592669241067-2f95a559ec1f?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Artisanal Heritage",
    subtitle: "Exquisite handcrafted designs with contemporary sensibilities",
    buttonText: "Explore Collection",
    buttonLink: "/collections/heritage",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
  }
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevSlide = () => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNextSlide = () => {
    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <section className="relative overflow-hidden">
      <div className="relative">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={slides[currentIndex].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-[70vh] md:h-[80vh] w-full"
          >
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img 
              src={slides[currentIndex].image} 
              alt={slides[currentIndex].title} 
              className="object-cover h-full w-full"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-20">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="font-serif text-4xl md:text-6xl mb-4"
              >
                {slides[currentIndex].title}
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-lg md:text-xl mb-8 max-w-2xl"
              >
                {slides[currentIndex].subtitle}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Link href={slides[currentIndex].buttonLink}>
                  <Button className="bg-white text-gray-800 hover:bg-primary hover:text-white transition-colors duration-300 px-8">
                    {slides[currentIndex].buttonText}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <button 
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-800 hover:bg-primary hover:text-white transition duration-300 z-20"
          onClick={goToPrevSlide}
          aria-label="Previous slide"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button 
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-800 hover:bg-primary hover:text-white transition duration-300 z-20"
          onClick={goToNextSlide}
          aria-label="Next slide"
        >
          <i className="fas fa-chevron-right"></i>
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
