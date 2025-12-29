import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import { useSiteContent } from '@/contexts/SiteContext';
import heroImage from '@/assets/hero-children.jpg';

export const HeroSection = () => {
  const { scrollToSection: smoothScrollTo } = useSmoothScroll();
  const { content } = useSiteContent();
  const { hero } = content;

  return (
    <section id="accueil" className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-melrose-purple/20 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-melrose-blue/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[20%] w-64 h-64 bg-melrose-yellow/20 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-start rtl:lg:text-right"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-melrose-yellow" />
              <span className="text-sm font-medium text-foreground/80">{hero.bannerText}</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
              {hero.title} <br />
              <span className="gradient-text">{hero.highlight}</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-quicksand rtl:font-tajawal">
              {hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <Button
                variant="gradient"
                size="lg"
                className="w-full sm:w-auto group text-lg h-14 px-8"
                onClick={() => smoothScrollTo('#contact')}
              >
                {hero.ctaPrimary}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
              </Button>
              <Button
                variant="glass"
                size="lg"
                className="w-full sm:w-auto text-lg h-14 px-8"
                onClick={() => smoothScrollTo('#programmes')}
              >
                {hero.ctaSecondary}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 border-t border-foreground/5 pt-8">
              {hero.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-melrose-purple/10 to-melrose-blue/10 rounded-full animate-float max-w-[500px] max-h-[500px] mx-auto blur-3xl opacity-50" />
            <motion.img
              src={heroImage}
              alt="Happy Students"
              className="relative z-10 w-full max-w-[600px] object-contain drop-shadow-2xl animate-float"
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 6,
                ease: "easeInOut"
              }}
            />

            {/* Floating Cards */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute top-20 right-10 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-neo border border-white/40 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-melrose-yellow/20 flex items-center justify-center">
                  <Star className="w-5 h-5 text-melrose-yellow fill-current" />
                </div>
                <div>
                  <div className="text-sm font-bold">Top Class</div>
                  <div className="text-xs text-muted-foreground">Education</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
