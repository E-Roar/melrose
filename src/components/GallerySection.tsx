import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import gallery5 from '@/assets/gallery-5.jpg';
import gallery6 from '@/assets/gallery-6.jpg';

const galleryImages = [
  { src: gallery1, title: 'Salle de classe', description: 'Environnement coloré et stimulant' },
  { src: gallery2, title: 'Aire de jeux', description: 'Activités en plein air' },
  { src: gallery3, title: 'Bibliothèque', description: 'Coin lecture confortable' },
  { src: gallery4, title: 'Atelier créatif', description: 'Arts plastiques et créativité' },
  { src: gallery5, title: 'Salle de musique', description: 'Éveil musical et expression' },
  { src: gallery6, title: 'Laboratoire', description: 'Découverte scientifique' },
];

export const GallerySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const normalizedDiff = ((diff + galleryImages.length) % galleryImages.length);
    
    let adjustedDiff = normalizedDiff;
    if (normalizedDiff > galleryImages.length / 2) {
      adjustedDiff = normalizedDiff - galleryImages.length;
    }

    const absDistance = Math.abs(adjustedDiff);
    
    if (absDistance > 2) {
      return {
        opacity: 0,
        scale: 0.6,
        x: adjustedDiff > 0 ? 500 : -500,
        rotateY: adjustedDiff > 0 ? 45 : -45,
        z: -500,
        display: 'none',
      };
    }

    return {
      opacity: absDistance === 0 ? 1 : absDistance === 1 ? 0.7 : 0.4,
      scale: absDistance === 0 ? 1 : absDistance === 1 ? 0.85 : 0.7,
      x: adjustedDiff * 280,
      rotateY: adjustedDiff * -15,
      z: absDistance === 0 ? 100 : absDistance * -100,
      display: 'block',
    };
  };

  return (
    <section id="galerie" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-transparent to-muted/20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-melrose-blue/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-melrose-purple/10 blur-3xl" />

      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Notre <span className="gradient-text">Galerie</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos espaces d'apprentissage modernes et colorés, 
            conçus pour stimuler la curiosité et la créativité de vos enfants.
          </p>
        </motion.div>

        {/* 3D Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative perspective-1000 h-[400px] md:h-[500px] mb-8"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-md preserve-3d">
              <AnimatePresence mode="sync">
                {galleryImages.map((image, index) => {
                  const style = getCardStyle(index);
                  if (style.display === 'none') return null;

                  return (
                    <motion.div
                      key={image.src}
                      initial={false}
                      animate={{
                        opacity: style.opacity,
                        scale: style.scale,
                        x: style.x,
                        rotateY: style.rotateY,
                        z: style.z,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.32, 0.72, 0, 1],
                      }}
                      className="absolute inset-0 preserve-3d cursor-pointer"
                      style={{ transformStyle: 'preserve-3d' }}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setCurrentIndex(index);
                      }}
                    >
                      <div className="relative rounded-3xl overflow-hidden shadow-neo-lg bg-card">
                        <img
                          src={image.src}
                          alt={image.title}
                          className="w-full h-[300px] md:h-[400px] object-cover"
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: index === currentIndex ? 1 : 0, y: index === currentIndex ? 0 : 20 }}
                          className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/80 to-transparent"
                        >
                          <h3 className="text-xl font-bold text-background font-display">{image.title}</h3>
                          <p className="text-background/80">{image.description}</p>
                        </motion.div>
                        
                        {/* Colorful glow effect on active */}
                        {index === currentIndex && (
                          <div className="absolute inset-0 rounded-3xl border-2 border-white/30 pointer-events-none" />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation buttons */}
          <Button
            variant="neo"
            size="icon"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 rounded-full"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="neo"
            size="icon"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 rounded-full"
            onClick={goToNext}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </motion.div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-3">
          {galleryImages.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-melrose-purple to-melrose-blue w-8 shadow-glow-purple'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
