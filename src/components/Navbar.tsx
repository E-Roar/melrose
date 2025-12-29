import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

const navItems = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'À Propos', href: '#apropos' },
  { label: 'Programmes', href: '#programmes' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-2 bg-background/80 backdrop-blur-xl shadow-neo'
            : 'py-4 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <motion.a
            href="#accueil"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#accueil');
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3"
          >
            <img src={logo} alt="Les Ecoles Melrose" className="h-16 md:h-24 w-auto" />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 rounded-xl text-foreground/80 hover:text-foreground hover:bg-background/50 transition-all duration-300 font-medium"
              >
                {item.label}
              </motion.button>
            ))}
            <Button
              variant="gradient"
              size="sm"
              onClick={() => scrollToSection('#contact')}
              className="ml-2"
            >
              Inscription
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="neo"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 pt-24 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container mx-auto px-4 flex flex-col gap-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.href)}
                  className="p-4 rounded-2xl shadow-neo text-lg font-semibold text-foreground hover:shadow-neo-lg transition-all"
                >
                  {item.label}
                </motion.button>
              ))}
              <Button
                variant="gradient"
                size="lg"
                onClick={() => scrollToSection('#contact')}
                className="mt-4"
              >
                Inscription
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
