import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import nebulaHero from '@/assets/nebula-hero.jpg';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const progressRef = useRef(0);

  useEffect(() => {
    // Simulate asset loading with smooth progress
    const duration = 3000;
    const interval = 30;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      progressRef.current += increment + Math.random() * 0.5;
      if (progressRef.current >= 100) {
        progressRef.current = 100;
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 1200);
        }, 500);
      } else {
        setProgress(progressRef.current);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.6, 0, 0.2, 1],
      },
    }),
  };

  const letters = 'ARYVERSE'.split('');

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1.2, ease: [0.6, 0, 0.2, 1] }
          }}
        >
          {/* Background Image */}
          <motion.div 
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3, ease: 'easeOut' }}
          >
            <img 
              src={nebulaHero} 
              alt="" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-void/60" />
          </motion.div>

          {/* Ambient particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-gold/60"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0,
                }}
                animate={{
                  y: [null, Math.random() * -200],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Logo Text */}
            <div className="overflow-hidden mb-8">
              <motion.div className="flex justify-center gap-1 md:gap-2">
                {letters.map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="font-display text-5xl md:text-7xl lg:text-9xl font-bold text-stardust text-glow"
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="font-body text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-12"
            >
              Enter the Realm of Legends
            </motion.p>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-64 md:w-80 h-[2px] bg-muted/30 rounded-full overflow-hidden mx-auto"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-gold via-primary to-gold"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            {/* Progress Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4 font-body text-xs tracking-widest text-gold/70"
            >
              {Math.floor(progress)}%
            </motion.p>
          </div>

          {/* Curtain Reveal Effect */}
          <motion.div
            className="absolute inset-0 bg-void-deep"
            initial={{ scaleY: 0, originY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{ duration: 1, ease: [0.6, 0, 0.2, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
