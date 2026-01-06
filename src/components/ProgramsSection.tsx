import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Baby, BookOpen, Calculator, Globe, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import { useSiteContent } from '@/contexts/SiteContext';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Baby, BookOpen, Calculator, Globe
};

export const ProgramsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollToSection: smoothScrollTo } = useSmoothScroll();
  const { content } = useSiteContent();
  const { programs } = content;

  return (
    <section id="programmes" className="py-20 px-4 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-melrose-green/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-melrose-orange/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {programs.title} <span className="gradient-text">{programs.highlight}</span>
            </h2>
            <p className="text-lg text-muted-foreground font-quicksand rtl:font-tajawal">
              {programs.subtitle}
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {programs.programs.map((program, index) => {
            const Icon = iconMap[program.icon] || BookOpen;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative bg-background rounded-[2rem] p-8 shadow-neo border border-white/50 hover:border-melrose-purple/30 transition-all duration-300"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-melrose-${program.color}/20 to-transparent rounded-bl-[100px] rounded-tr-[2rem] transition-opacity opacity-50 group-hover:opacity-100`} />

                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-melrose-${program.color}/10 flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-8 h-8 text-melrose-${program.color}`} />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
                    <h3 className="text-2xl font-bold">{program.title}</h3>
                    <span className="px-3 py-1 rounded-full bg-muted text-sm font-semibold text-muted-foreground">
                      {program.age}
                    </span>
                  </div>

                  <p className="text-muted-foreground mb-6 font-quicksand rtl:font-tajawal">
                    {program.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {program.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium">
                        <div className={`w-6 h-6 rounded-full bg-melrose-${program.color}/20 flex items-center justify-center flex-shrink-0`}>
                          <Check className={`w-3 h-3 text-melrose-${program.color}`} />
                        </div>
                        <span className="font-quicksand rtl:font-tajawal">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="ghost"
                    className={`p-0 hover:bg-transparent text-melrose-${program.color} hover:text-melrose-${program.color}/80 font-semibold group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-all`}
                    onClick={() => smoothScrollTo('#contact')}
                  >
                    {programs.ctaText} <ArrowRight className="ml-2 w-4 h-4 rtl:rotate-180" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
