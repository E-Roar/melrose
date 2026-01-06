import { Navbar } from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ProgramsSection } from '@/components/ProgramsSection';
import { GallerySection } from '@/components/GallerySection';
import { ContactSection } from '@/components/ContactSection';
import { MapSection } from '@/components/MapSection';
import { Chatbot } from '@/components/Chatbot';
import { Footer } from '@/components/Footer';
import { Preloader } from '@/components/Preloader';

const Index = () => {
  return (
    <>
      <Preloader />
      <main className="min-h-screen">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <GallerySection />
        <ContactSection />
        <MapSection />
        <Footer />
        <Chatbot />
      </main>
    </>
  );
};

export default Index;
