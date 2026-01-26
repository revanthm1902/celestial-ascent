import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import KingdomCard from './KingdomCard';

import kingdom1 from '@/assets/kingdom-0.png';
import kingdom2 from '@/assets/kingdom-1.png';
import kingdom3 from '@/assets/kingdom-2.png';

const kingdoms = [
  {
    title: 'Learning',
    description: 'Master the fundamentals through interactive lessons and comprehensive tutorials. Build your knowledge step by step with our carefully crafted educational content and hands-on practice modules.',
    features: [
      'Interactive tutorials and lessons',
      'Step-by-step guided learning paths',
      'Practice exercises and quizzes',
    ],
    image: kingdom1,
  },
  {
    title: 'Ranking',
    description: 'Track your progress and compete with others on the leaderboards. Climb the ranks by completing challenges, earning achievements, and demonstrating your mastery of physics concepts.',
    features: [
      'Global leaderboard rankings',
      'Achievement system and badges',
      'Progress tracking and analytics',
    ],
    image: kingdom2,
  },
  {
    title: 'Gaming',
    description: 'Learn through play with engaging physics-based games and challenges. Apply your knowledge in fun, interactive scenarios that make learning enjoyable and memorable.',
    features: [
      'Physics-based game challenges',
      'Interactive simulations',
      'Multiplayer learning competitions',
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
            Choose Your Path
          </motion.span>
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
