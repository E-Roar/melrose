import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Baby, BookOpen, Calculator, Globe, ArrowRight } from 'lucide-react';

const programs = [
  {
    icon: Baby,
    title: 'Préscolaire',
    age: '3 - 5 ans',
    description: 'Un environnement ludique et sécurisé pour les premiers pas de l\'apprentissage. Éveil, motricité et socialisation.',
    features: ['Éveil sensoriel', 'Activités manuelles', 'Initiation aux chiffres', 'Jeux éducatifs'],
    color: 'from-melrose-yellow to-melrose-orange',
    iconBg: 'bg-melrose-yellow',
  },
  {
    icon: BookOpen,
    title: 'CP - CE1 - CE2',
    age: '6 - 8 ans',
    description: 'Acquisition des fondamentaux en lecture, écriture et mathématiques avec une pédagogie adaptée.',
    features: ['Lecture et écriture', 'Calcul mental', 'Découverte du monde', 'Expression orale'],
    color: 'from-melrose-blue to-melrose-purple',
    iconBg: 'bg-melrose-blue',
  },
  {
    icon: Calculator,
    title: 'CM1 - CM2',
    age: '9 - 11 ans',
    description: 'Approfondissement des connaissances et préparation à l\'entrée au collège avec rigueur.',
    features: ['Sciences', 'Histoire-Géographie', 'Langues vivantes', 'Méthodologie'],
    color: 'from-melrose-purple to-melrose-red',
    iconBg: 'bg-melrose-purple',
  },
  {
    icon: Globe,
    title: 'Langues',
    age: 'Tous niveaux',
    description: 'Apprentissage multilingue : Arabe, Français et Anglais dès le préscolaire.',
    features: ['Arabe littéraire', 'Français', 'Anglais', 'Communication'],
    color: 'from-melrose-green to-melrose-blue',
    iconBg: 'bg-melrose-green',
  },
];

export const ProgramsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="programmes" className="py-20 md:py-32 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-melrose-yellow/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-melrose-green/10 blur-3xl" />

      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Nos <span className="gradient-text">Programmes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des programmes pédagogiques adaptés à chaque niveau, conçus pour accompagner 
            votre enfant de la maternelle jusqu'à l'entrée au collège.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className="h-full group overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${program.color}`} />
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className={`w-14 h-14 rounded-2xl ${program.iconBg} flex items-center justify-center shadow-neo-sm`}
                    >
                      <program.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <span className="px-3 py-1 rounded-full text-sm font-medium shadow-neo-sm bg-background">
                      {program.age}
                    </span>
                  </div>
                  <CardTitle className="text-xl mt-4">{program.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{program.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {program.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${program.color}`} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button variant="gradient" size="xl" onClick={scrollToContact} className="group">
            Demander plus d'informations
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
