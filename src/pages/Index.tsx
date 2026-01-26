import { useState, Suspense } from 'react';
import Preloader from '@/components/Preloader';
import HeroSection from '@/components/HeroSection';
import KingdomsSection from '@/components/KingdomsSection';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ParticleField from '@/components/ParticleField';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollToTop from '@/components/ScrollToTop';
import Logo from '@/components/Logo';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <SmoothScroll>
          
          <CustomCursor />
          <Suspense fallback={null}>
            <ParticleField />
          </Suspense>
          <main className="relative">
            <HeroSection />
            <KingdomsSection />
          </main>
          <Footer />
          <ScrollToTop />
        </SmoothScroll>
      )}
    </>
  );
};

export default Index;
