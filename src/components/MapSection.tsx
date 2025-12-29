import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { MapPin, Navigation, Phone } from 'lucide-react';
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
            {/* Map container with neomorphism frame */}
            <div className="relative">
              <div className="aspect-[16/9] md:aspect-[21/9] relative overflow-hidden rounded-t-3xl bg-muted">
                {/* Google Maps Embed - No external dependencies needed */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106376.72691454886!2d-7.6824308!3d33.5731104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca%2C%20Morocco!5e0!3m2!1sen!2s!4v1703000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation Les Écoles Melrose"
                  className="absolute inset-0"
                />
              </div>

              {/* Map overlay with CTA */}
              <div className="p-6 bg-background border-t border-border">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 rounded-2xl bg-melrose-blue/20 flex items-center justify-center shadow-neo-sm"
                    >
                      <MapPin className="w-6 h-6 text-melrose-blue" />
                    </motion.div>
                    <div>
                      <p className="font-bold font-display">Casablanca, Maroc</p>
                      <p className="text-sm text-muted-foreground">Facilement accessible</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="neo"
                      onClick={() => window.open('tel:+212652561659', '_self')}
                    >
                      <Phone className="w-5 h-5" />
                      Appeler
                    </Button>
                    <Button variant="gradient" onClick={openGoogleMaps}>
                      <Navigation className="w-5 h-5" />
                      Itinéraire
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
