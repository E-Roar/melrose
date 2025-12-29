import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/logo.png';

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center animated-gradient-bg"
        >
          <div className="flex flex-col items-center gap-8">
            {/* Animated logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative"
            >
              {/* Glow rings */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 -m-8 rounded-full bg-gradient-to-r from-melrose-purple/30 via-melrose-blue/30 to-melrose-green/30 blur-2xl"
              />
              <motion.div
                animate={{ scale: [1.1, 1.3, 1.1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                className="absolute inset-0 -m-12 rounded-full bg-gradient-to-r from-melrose-yellow/20 via-melrose-red/20 to-melrose-orange/20 blur-3xl"
              />
              
              {/* Logo container with neomorphism */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 p-8 rounded-full shadow-neo-lg bg-background/80 backdrop-blur-sm"
              >
                <img 
                  src={logo} 
                  alt="Les Écoles Melrose" 
                  className="w-40 h-40 md:w-56 md:h-56 object-contain"
                />
              </motion.div>
            </motion.div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold font-display gradient-text mb-2">
                Les Écoles Melrose
              </h2>
              <p className="text-muted-foreground">Préscolaire & Primaire</p>
            </motion.div>

            {/* Loading dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }}
                  className="w-3 h-3 rounded-full bg-gradient-to-r from-melrose-purple to-melrose-blue"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
