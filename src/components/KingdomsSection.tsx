import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import KingdomCard from './KingdomCard';

import kingdom1 from '@/assets/kingdom-1.jpg';
import kingdom2 from '@/assets/kingdom-2.jpg';
import kingdom3 from '@/assets/kingdom-3.jpg';

const kingdoms = [
  {
    title: 'Aethoria',
    description: 'A celestial kingdom floating among the clouds, where ancient magic flows through crystalline spires and the eternal sun casts golden light upon its blessed inhabitants.',
    features: [
      'Floating islands connected by light bridges',
      'Ancient celestial magic system',
      'Home to the legendary Sky Guardians',
    ],
    image: kingdom1,
  },
  {
    title: 'Abyssal Depths',
    description: 'Deep beneath the endless ocean lies a realm of bioluminescent wonders, where the lost civilization of the Deep Ones guards secrets older than time itself.',
    features: [
      'Underwater crystal palaces',
      'Bioluminescent flora and fauna',
      'Ancient ruins with forbidden knowledge',
    ],
    image: kingdom2,
  },
  {
    title: 'Emberfell',
    description: 'Forged in the heart of eternal volcanoes, this kingdom of obsidian and flame breeds the mightiest warriors and the most powerful forgemasters in all the realms.',
    features: [
      'Volcanic fortress cities',
      'Master blacksmiths and artificers',
      'Dragon allies and war beasts',
    ],
    image: kingdom3,
  },
];

const KingdomsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Gradient background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-void via-secondary/20 to-void"
        style={{ opacity: backgroundOpacity }}
      />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-20 md:mb-32"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-gold tracking-[0.4em] uppercase text-sm font-body block mb-6"
          >
            Discover Your Destiny
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-stardust text-glow mb-6"
          >
            The Kingdoms
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto font-body"
          >
            Three legendary realms await your conquest. Each kingdom holds unique 
            treasures, ancient powers, and challenges that will test your worth.
          </motion.p>
        </motion.div>

        {/* Kingdom Cards */}
        <div className="space-y-32 md:space-y-48">
          {kingdoms.map((kingdom, index) => (
            <KingdomCard
              key={kingdom.title}
              {...kingdom}
              index={index}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KingdomsSection;
