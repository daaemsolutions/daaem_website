import { LanguageProvider, useLang } from '@/components/LanguageContext';
import Navbar from '@/components/home/Navbar';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import AboutSection from '@/components/home/AboutSection';
import ServicesSection from '@/components/home/ServicesSection';
import WhyDaaemSection from '@/components/home/WhyDaaemSection';
import TechnologySection from '@/components/home/TechnologySection';
import PortfolioGallery from '@/components/portfolio/PortfolioGallery';
import ContactSection from '@/components/home/ContactSection';
import FooterSection from '@/components/home/FooterSection';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

function SiteContent() {
  const { lang } = useLang();
  const isRtl = lang === 'ar';
  return (
    <div
      className="min-h-screen bg-white"
      dir={isRtl ? 'rtl' : 'ltr'}
      style={{
        fontFamily: isRtl
          ? "'Tajawal', sans-serif"
          : "'Montserrat', sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Tajawal:wght@300;400;500;700&display=swap"
        rel="stylesheet"
      />
      <Navbar />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <WhyDaaemSection />
      <TechnologySection />
      <PortfolioGallery />
      <ContactSection />
      <FooterSection />
      <FloatingWhatsApp />
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <SiteContent />
    </LanguageProvider>
  );
}
