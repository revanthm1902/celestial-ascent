import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import KingdomCard from './KingdomCard';
import KingdomArrow from './KingdomArrow';

import kingdom1 from '@/assets/kingdom-0.png';
import kingdom2 from '@/assets/kingdom-1.png';
import kingdom3 from '@/assets/kingdom-2.png';

const kingdoms = [
  {
    id: 'kingdom-learning',
    title: 'Kingdom of Adventure',
    description: 'Unlock the secrets of reality. From the quantum realm to cosmic scale, master the fundamental forces and living systems that weave the fabric of existence.',
    features: [
      'Interactive Simulations',
      'Visual Archives',
      'Discovery Trails',
    ],
    image: kingdom1,
  },
  {
    id: 'kingdom-gaming',
    title: 'Kingdom of Fun',
    description: 'The ultimate sandbox. Apply your knowledge to build, break, and master the simulation in arenas where only the master of forces survives.',
    features: [
      'Engineering Challenges',
      'Bio-Labs',
      'Physics Arenas',
    ],
    image: kingdom3,
  },
  {
    id: 'kingdom-ranking',
    title: 'Kingdom of Ranking',
    description: 'Ascend the celestial hierarchy. Compete with global minds, solve the riddles of the universe, and claim your throne among the stars.',
    features: [
      'Global Leaderboards',
      'Prestige Tiers',
      'Legendary Achievements',
    ],
    image: kingdom2,
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
            Choose Your Path
          </motion.span>
        </motion.div>

        {/* Kingdom Cards */}
        <div className="space-y-32 md:space-y-48 relative">
          {kingdoms.map((kingdom, index) => (
            <div key={kingdom.title} className="relative">
              <div id={kingdom.id} className="scroll-mt-24">
                <KingdomCard
                  {...kingdom}
                  index={index}
                  isReversed={index % 2 === 1}
                />
              </div>

              {/* Arrow Connector */}
              {index < kingdoms.length - 1 && (
                <div
                  className={`hidden md:block absolute -bottom-32 lg:-bottom-48 z-0 opacity-80 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 pointer-events-none`}
                >
                  <KingdomArrow
                    direction={index === 0 ? 'ltr' : 'rtl'}
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section >
  );
};

export default KingdomsSection;
