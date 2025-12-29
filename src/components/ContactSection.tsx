import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send, Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle } from 'lucide-react';

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    email: '',
    phone: '',
    childAge: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create WhatsApp message
      const whatsappMessage = encodeURIComponent(
        `📚 *Nouvelle demande d'inscription - Les Écoles Melrose*\n\n` +
        `👨‍👩‍👧 *Parent:* ${formData.parentName}\n` +
        `👶 *Enfant:* ${formData.childName}\n` +
        `📧 *Email:* ${formData.email}\n` +
        `📱 *Téléphone:* ${formData.phone}\n` +
        `🎂 *Âge de l'enfant:* ${formData.childAge}\n` +
        `💬 *Message:* ${formData.message || 'Pas de message supplémentaire'}`
      );

      // Open WhatsApp with the message
      const whatsappNumber = '212652561659';
      window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');

      // Create mailto link for email
      const emailSubject = encodeURIComponent('Nouvelle demande d\'inscription - Les Écoles Melrose');
      const emailBody = encodeURIComponent(
        `Nouvelle demande d'inscription\n\n` +
        `Parent: ${formData.parentName}\n` +
        `Enfant: ${formData.childName}\n` +
        `Email: ${formData.email}\n` +
        `Téléphone: ${formData.phone}\n` +
        `Âge de l'enfant: ${formData.childAge}\n` +
        `Message: ${formData.message || 'Pas de message supplémentaire'}`
      );
      
      // Open email client
      window.location.href = `mailto:lesecolesmelrose@gmail.com?subject=${emailSubject}&body=${emailBody}`;

      toast({
        title: "Message envoyé !",
        description: "Nous vous recontacterons très bientôt.",
      });

      // Reset form
      setFormData({
        parentName: '',
        childName: '',
        email: '',
        phone: '',
        childAge: '',
        message: '',
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Phone, label: 'Téléphone', value: '+212 6525-61659', href: 'tel:+212652561659' },
    { icon: Mail, label: 'Email', value: 'lesecolesmelrose@gmail.com', href: 'mailto:lesecolesmelrose@gmail.com' },
    { icon: MapPin, label: 'Adresse', value: 'Casablanca, Maroc', href: '#localisation' },
    { icon: Clock, label: 'Horaires', value: 'Lun-Ven: 8h-17h', href: null },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-melrose-green/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-melrose-yellow/10 blur-3xl" />

      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            <span className="gradient-text">Contactez</span>-Nous
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vous avez des questions ? Vous souhaitez inscrire votre enfant ? 
            N'hésitez pas à nous contacter, nous serons ravis de vous répondre.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-melrose-yellow via-melrose-red to-melrose-purple" />
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-melrose-purple/20 flex items-center justify-center">
                    <Send className="w-5 h-5 text-melrose-purple" />
                  </div>
                  Demande d'inscription
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Nom du parent *</label>
                      <Input
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleChange}
                        placeholder="Votre nom complet"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Nom de l'enfant *</label>
                      <Input
                        name="childName"
                        value={formData.childName}
                        onChange={handleChange}
                        placeholder="Nom de l'enfant"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Téléphone *</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+212 6XX-XXXXXX"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Âge de l'enfant *</label>
                    <Input
                      name="childAge"
                      value={formData.childAge}
                      onChange={handleChange}
                      placeholder="Ex: 5 ans"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message (optionnel)</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Des informations supplémentaires..."
                      rows={4}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Envoyer la demande
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Contact cards */}
            <div className="grid grid-cols-2 gap-4">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href || '#'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="block"
                >
                  <Card className="h-full p-4 hover:-translate-y-1 transition-all cursor-pointer">
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-melrose-purple/20 to-melrose-blue/20 flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-melrose-purple" />
                      </div>
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                      <span className="text-sm font-medium">{item.value}</span>
                    </div>
                  </Card>
                </motion.a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <Card variant="glass" className="p-6 glow-rainbow">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-melrose-green flex items-center justify-center shadow-neo">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold font-display text-lg">Contactez-nous sur WhatsApp</h3>
                  <p className="text-sm text-muted-foreground">Réponse rapide garantie !</p>
                </div>
              </div>
              <Button
                variant="melroseGreen"
                size="lg"
                className="w-full mt-4"
                onClick={() => window.open('https://wa.me/212652561659', '_blank')}
              >
                <MessageCircle className="w-5 h-5" />
                Ouvrir WhatsApp
              </Button>
            </Card>

            {/* Features */}
            <div className="space-y-3">
              {[
                'Réponse sous 24h garantie',
                'Visite de l\'école sur rendez-vous',
                'Accompagnement personnalisé',
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl shadow-neo-sm bg-background"
                >
                  <CheckCircle className="w-5 h-5 text-melrose-green" />
                  <span className="text-sm font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
