import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, Star, Award, Palette, Music } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Pédagogie Innovante',
    description: 'Méthodes d\'enseignement modernes adaptées à chaque enfant pour un apprentissage optimal.',
    color: 'text-melrose-blue',
    bgColor: 'bg-melrose-blue/10',
  },
  {
    icon: Users,
    title: 'Équipe Qualifiée',
    description: 'Enseignants passionnés et formés aux dernières méthodes pédagogiques.',
    color: 'text-melrose-purple',
    bgColor: 'bg-melrose-purple/10',
  },
  {
    icon: Star,
    title: 'Excellence Académique',
    description: 'Programme éducatif rigoureux préparant les élèves aux défis de demain.',
    color: 'text-melrose-yellow',
    bgColor: 'bg-melrose-yellow/10',
  },
  {
    icon: Award,
    title: 'Suivi Personnalisé',
    description: 'Accompagnement individuel de chaque élève pour garantir sa réussite.',
    color: 'text-melrose-green',
    bgColor: 'bg-melrose-green/10',
  },
  {
    icon: Palette,
    title: 'Activités Créatives',
    description: 'Arts plastiques, théâtre et activités manuelles pour développer la créativité.',
    color: 'text-melrose-red',
    bgColor: 'bg-melrose-red/10',
  },
  {
    icon: Music,
    title: 'Éveil Musical',
    description: 'Initiation à la musique et au chant pour une éducation complète et harmonieuse.',
    color: 'text-melrose-orange',
    bgColor: 'bg-melrose-orange/10',
  },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="apropos" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-melrose-purple/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-melrose-blue/10 blur-3xl" />

      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Pourquoi <span className="gradient-text">Melrose</span> ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Depuis plus de 15 ans, nous accompagnons les enfants dans leur épanouissement scolaire 
            et personnel avec amour et dévouement.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full group hover:-translate-y-2 transition-all duration-300">
                <CardContent className="p-6 md:p-8">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6 shadow-neo-sm`}
                  >
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </motion.div>
                  <h3 className="text-xl font-bold font-display mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mission statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 md:mt-24"
        >
          <Card variant="glass" className="p-8 md:p-12 text-center glow-rainbow">
            <h3 className="text-2xl md:text-3xl font-bold font-display mb-4">Notre Mission</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Offrir à chaque enfant un environnement d'apprentissage stimulant et bienveillant, 
              où il peut développer son plein potentiel intellectuel, créatif et social. 
              Nous croyons que chaque enfant est unique et mérite une attention personnalisée.
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
