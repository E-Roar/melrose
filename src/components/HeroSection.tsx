import { useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import logoWeb from '@/assets/logo-web.png';
import frame from '@/assets/frame.png';

const HeroSection = () => {
  const { scrollToSection: smoothScrollTo } = useSmoothScroll();

  // Motion values for global mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for ease-out feel
  const rotateX = useSpring(useTransform(mouseY, [0, window.innerHeight], [10, -10]), { stiffness: 50, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, window.innerWidth], [-10, 10]), { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="accueil" className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-melrose-purple/20 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-melrose-blue/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[20%] w-64 h-64 bg-melrose-yellow/20 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto">
        <div className="w-full relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Content - Text */}
            <div className="text-center lg:text-start rtl:lg:text-right relative z-20">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm mb-6"
              >
                <Sparkles className="w-4 h-4 text-melrose-yellow" />
                <span className="text-sm font-medium text-foreground/80">Inscriptions ouvertes 2025-2026</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                Bienvenue à <br />
                <span className="gradient-text">Les Écoles Melrose</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-quicksand rtl:font-tajawal">
                Un environnement éducatif exceptionnel où chaque enfant s'épanouit, apprend et grandit avec passion et créativité.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full sm:w-auto group text-lg h-14 px-8"
                  onClick={() => smoothScrollTo('#contact')}
                >
                  Inscrivez votre enfant
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
                </Button>
                <Button
                  variant="glass"
                  size="lg"
                  className="w-full sm:w-auto text-lg h-14 px-8"
                  onClick={() => smoothScrollTo('#programmes')}
                >
                  Découvrir l'école
                </Button>
              </div>
            </div>

            {/* Right Content - 3D Logo Container */}
            <div className="relative lg:h-[600px] flex items-center justify-center perspective-1000">

              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d'
                }}
                className="relative w-[500px] h-[500px] flex items-center justify-center"
              >
                {/* Layer 1: Frosted Glass Circle Background */}
                <div
                  className="absolute w-[400px] h-[400px] rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
                  style={{ transform: 'translateZ(30px)' }}
                />

                {/* Layer 2: Main Logo - Shadow cast onto layer 1 */}
                <img
                  src={logoWeb}
                  alt="Melrose Schools Logo"
                  className="relative z-10 w-[60%] max-w-[350px] object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]"
                  style={{ transform: 'translateZ(80px)' }}
                />

                {/* Layer 3: Frame - Larger and with Reflection */}
                <div
                  className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                  style={{ transform: 'translateZ(130px)' }}
                >
                  <img
                    src={frame}
                    alt="Decorative Frame"
                    className="w-[110%] h-[110%] object-contain opacity-90 scale-110"
                  />
                  {/* Glass Reflection Overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent rounded-full opacity-60"
                  />
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
