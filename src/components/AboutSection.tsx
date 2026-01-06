import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, Users, Star, Award, Palette, Music } from 'lucide-react';
import { useSiteContent } from '@/contexts/SiteContext';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen, Users, Star, Award, Palette, Music
};

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useSiteContent();
  const { about } = content;

  return (
    <section id="apropos" className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {about.title} <span className="gradient-text">{about.highlight}</span> ?
            </h2>
            <p className="text-lg text-muted-foreground font-quicksand rtl:font-tajawal">
              {about.subtitle}
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {about.features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Star;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-background rounded-3xl p-6 shadow-neo hover:shadow-neo-lg transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-melrose-${feature.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 text-melrose-${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-quicksand rtl:font-tajawal">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-melrose-purple to-melrose-blue text-white text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">{about.missionTitle}</h3>
            <p className="text-lg md:text-xl font-medium leading-relaxed font-quicksand rtl:font-tajawal">
              "{about.missionText}"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
