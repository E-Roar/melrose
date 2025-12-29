import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const MapSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const openGoogleMaps = () => {
    window.open('https://www.google.com/maps/search/Les+Ecoles+Melrose+Casablanca+Maroc', '_blank');
  };

  return (
    <section id="localisation" className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Background decorations */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-melrose-blue/10 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-melrose-purple/10 blur-3xl" />

      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Notre <span className="gradient-text">Localisation</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Venez nous rendre visite pour découvrir notre école et rencontrer notre équipe pédagogique.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="overflow-hidden">
            {/* Neomorphism styled map container */}
            <div className="relative">
              {/* Map placeholder with neomorphism styling */}
              <div className="aspect-[16/9] md:aspect-[21/9] bg-gradient-to-br from-muted via-background to-muted relative overflow-hidden">
                {/* Stylized map representation */}
                <div className="absolute inset-0 p-8">
                  {/* Grid pattern for map effect */}
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={`h-${i}`}
                        className="absolute left-0 right-0 h-px bg-foreground/20"
                        style={{ top: `${(i + 1) * 5}%` }}
                      />
                    ))}
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={`v-${i}`}
                        className="absolute top-0 bottom-0 w-px bg-foreground/20"
                        style={{ left: `${(i + 1) * 5}%` }}
                      />
                    ))}
                  </div>

                  {/* Decorative roads */}
                  <div className="absolute top-1/3 left-0 right-0 h-3 bg-muted-foreground/10 rounded-full shadow-neo-sm" />
                  <div className="absolute left-1/3 top-0 bottom-0 w-3 bg-muted-foreground/10 rounded-full shadow-neo-sm" />
                  <div className="absolute top-2/3 left-0 right-0 h-2 bg-muted-foreground/5 rounded-full" />
                  <div className="absolute left-2/3 top-0 bottom-0 w-2 bg-muted-foreground/5 rounded-full" />

                  {/* School marker */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.5, type: 'spring' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative"
                    >
                      {/* Glow ring */}
                      <div className="absolute inset-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-full bg-melrose-purple/20 blur-xl animate-pulse" />
                      
                      {/* Pin */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-melrose-red to-melrose-orange shadow-neo-lg flex items-center justify-center">
                          <MapPin className="w-8 h-8 text-white" />
                        </div>
                        <div className="w-4 h-4 bg-gradient-to-br from-melrose-red to-melrose-orange rounded-full mt-2 shadow-lg" />
                        <div className="w-2 h-2 bg-melrose-orange/50 rounded-full mt-1" />
                      </div>

                      {/* Label card */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.8 }}
                        className="absolute -bottom-20 left-1/2 -translate-x-1/2 whitespace-nowrap"
                      >
                        <Card variant="glass" className="px-4 py-2 text-center glow-purple">
                          <p className="font-bold font-display text-sm">Les Écoles Melrose</p>
                          <p className="text-xs text-muted-foreground">Casablanca, Maroc</p>
                        </Card>
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Decorative buildings */}
                  <div className="absolute bottom-10 left-10 w-8 h-12 rounded-lg shadow-neo-sm bg-muted-foreground/10" />
                  <div className="absolute bottom-10 left-24 w-6 h-8 rounded-lg shadow-neo-sm bg-muted-foreground/10" />
                  <div className="absolute top-10 right-10 w-10 h-14 rounded-lg shadow-neo-sm bg-muted-foreground/10" />
                  <div className="absolute top-20 right-28 w-6 h-10 rounded-lg shadow-neo-sm bg-muted-foreground/10" />
                </div>
              </div>

              {/* Map overlay with CTA */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/90 to-transparent">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-melrose-blue/20 flex items-center justify-center">
                      <Navigation className="w-6 h-6 text-melrose-blue" />
                    </div>
                    <div>
                      <p className="font-bold">Casablanca, Maroc</p>
                      <p className="text-sm text-muted-foreground">Facilement accessible</p>
                    </div>
                  </div>
                  <Button variant="gradient" onClick={openGoogleMaps}>
                    <Navigation className="w-5 h-5" />
                    Ouvrir dans Google Maps
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
