import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { MapPin, Navigation, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Casablanca coordinates (approximate location for school)
const SCHOOL_POSITION: [number, number] = [33.5731, -7.5898];

export const MapSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [MapComponent, setMapComponent] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    // Dynamically import Leaflet components to avoid SSR issues
    const loadMap = async () => {
      const L = await import('leaflet');
      const { MapContainer, TileLayer, Marker, Popup } = await import('react-leaflet');
      await import('leaflet/dist/leaflet.css');

      // Fix default marker icon
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      // Create the map component
      const Map = () => (
        <MapContainer
          center={SCHOOL_POSITION}
          zoom={14}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={SCHOOL_POSITION}>
            <Popup>
              <div className="text-center p-2">
                <strong className="text-lg">Les Écoles Melrose</strong>
                <br />
                <span className="text-sm text-gray-600">Préscolaire & Primaire</span>
                <br />
                <span className="text-sm">Casablanca, Maroc</span>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      );

      setMapComponent(() => Map);
    };

    loadMap();
  }, []);

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
                {MapComponent ? (
                  <MapComponent />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="w-12 h-12 border-4 border-melrose-purple border-t-transparent rounded-full mx-auto mb-4"
                      />
                      <p className="text-muted-foreground">Chargement de la carte...</p>
                    </div>
                  </div>
                )}
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
