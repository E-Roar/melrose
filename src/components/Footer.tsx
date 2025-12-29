import { motion } from 'framer-motion';
import logo from '@/assets/logo.png';
import { Heart } from 'lucide-react';
import { useSiteContent } from '@/contexts/SiteContext';

export const Footer = () => {
  const { content } = useSiteContent();

  return (
    <footer className="py-12 bg-gradient-to-t from-muted/50 to-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center gap-6"
        >
          <img src={logo} alt="Les Écoles Melrose" className="h-20 w-auto" />
          <p className="text-muted-foreground max-w-md font-quicksand rtl:font-tajawal">
            {content.siteInfo.name} - {content.siteInfo.tagline}. Un avenir brillant pour vos enfants.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Fait avec</span>
            <Heart className="w-4 h-4 text-melrose-red fill-melrose-red" />
            <span>à Casablanca, Maroc</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2024 {content.siteInfo.name}. Tous droits réservés.</p>
        </motion.div>
      </div>
    </footer>
  );
};
