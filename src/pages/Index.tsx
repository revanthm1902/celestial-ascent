import { useState, Suspense } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import KingdomsSection from '@/components/KingdomsSection';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ParticleField from '@/components/ParticleField';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollToTop from '@/components/ScrollToTop';

interface IndexProps {
  hasLoaded?: boolean;
  onComplete?: () => void;
}

const Index = ({ hasLoaded = false, onComplete }: IndexProps) => {
  const [isLoading, setIsLoading] = useState(!hasLoaded);

  return (
    <>
      {isLoading && <Preloader onComplete={() => {
        setIsLoading(false);
        onComplete?.();
      }} />}

      {!isLoading && (
        <SmoothScroll>
          <Navbar />
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
