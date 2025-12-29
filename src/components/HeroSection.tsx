import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, Sparkles, GraduationCap, Heart } from 'lucide-react';
import heroImage from '@/assets/hero-children.jpg';
import logo from '@/assets/logo.png';

export const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="accueil"
      className="min-h-screen flex items-center justify-center relative overflow-hidden animated-gradient-bg"
    >
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-10 w-20 h-20 rounded-full bg-melrose-yellow/30 blur-xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-40 right-20 w-32 h-32 rounded-full bg-melrose-purple/20 blur-xl"
        />
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-40 left-1/4 w-24 h-24 rounded-full bg-melrose-blue/25 blur-xl"
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 right-1/4 w-16 h-16 rounded-full bg-melrose-green/30 blur-xl"
        />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-neo bg-background/80 mb-6"
            >
              <Sparkles className="w-5 h-5 text-melrose-yellow" />
              <span className="text-sm font-medium">Inscriptions ouvertes 2024-2025</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 leading-tight"
            >
              Bienvenue à{' '}
              <span className="gradient-text">Les Écoles Melrose</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Un environnement éducatif exceptionnel où chaque enfant s'épanouit, apprend et grandit avec passion et créativité.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                variant="gradient"
                size="xl"
                onClick={() => scrollToSection('#contact')}
                className="group"
              >
                <GraduationCap className="w-5 h-5" />
                Inscrivez votre enfant
              </Button>
              <Button
                variant="neo"
                size="xl"
                onClick={() => scrollToSection('#apropos')}
              >
                <Heart className="w-5 h-5" />
                Découvrir l'école
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 mt-12"
            >
              {[
                { value: '15+', label: 'Ans d\'expérience' },
                { value: '500+', label: 'Élèves diplômés' },
                { value: '100%', label: 'Satisfaction parents' },
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-2xl shadow-neo bg-background/50">
                  <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-neo-lg">
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img
                  src={heroImage}
                  alt="Enfants heureux à l'école Melrose"
                  className="w-full h-auto rounded-3xl"
                />
              </motion.div>
              
              {/* Overlay with colorful glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent rounded-3xl" />
              
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -right-4 p-4 rounded-2xl shadow-neo bg-background/90 backdrop-blur-sm"
              >
                <img src={logo} alt="Logo Melrose" className="h-16 w-auto" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            onClick={() => scrollToSection('#apropos')}
            className="p-3 rounded-full shadow-neo bg-background/80 text-foreground hover:shadow-neo-lg transition-all"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
