import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const instructors = [
  {
    name: 'Professor Volta',
    title: 'Master of Electromagnetics',
    specialty: 'Electric Fields & Magnetism',
    description: 'A brilliant mind who harnesses the power of electromagnetic forces, guiding students through the mysteries of Maxwell\'s equations.',
    avatar: <svg viewBox="0 0 24 24" fill="none" className="w-full h-full"><defs><linearGradient id="volt-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6"/><stop offset="50%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#ec4899"/></linearGradient></defs><path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="url(#volt-grad)" stroke="url(#volt-grad)" strokeWidth="1"/></svg>,
    color: 'from-blue-500 to-purple-600',
  },
  {
    name: 'Dr. Newton',
    title: 'Guardian of Gravity',
    specialty: 'Gravitational Physics',
    description: 'Keeper of the secrets of spacetime, teaching the profound truths of gravity, orbits, and the fabric of the universe.',
    avatar: <svg viewBox="0 0 24 24" fill="none" className="w-full h-full"><defs><radialGradient id="gravity-grad"><stop offset="0%" stopColor="#06b6d4"/><stop offset="50%" stopColor="#6366f1"/><stop offset="100%" stopColor="#8b5cf6"/></radialGradient></defs><circle cx="12" cy="12" r="10" fill="url(#gravity-grad)" opacity="0.3"/><circle cx="8" cy="8" r="2" fill="#06b6d4"/><circle cx="16" cy="10" r="1.5" fill="#8b5cf6"/><circle cx="10" cy="16" r="1" fill="#6366f1"/><circle cx="17" cy="16" r="2" fill="#06b6d4"/><circle cx="12" cy="12" r="1.5" fill="#a855f7"/></svg>,
    color: 'from-indigo-500 to-cyan-600',
  },
  {
    name: 'Maestra Celsius',
    title: 'Mistress of Thermodynamics',
    specialty: 'Heat & Energy',
    description: 'Commands the realm of heat and entropy, revealing the fundamental laws that govern energy transfer across the cosmos.',
    avatar: <svg viewBox="0 0 24 24" fill="none" className="w-full h-full"><defs><linearGradient id="heat-grad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#fbbf24"/><stop offset="50%" stopColor="#f97316"/><stop offset="100%" stopColor="#dc2626"/></linearGradient></defs><path d="M12 2c.5 0 1 .5 1 1v1c0 .5-.5 1-1 1s-1-.5-1-1V3c0-.5.5-1 1-1zm0 17c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm6.2-11.8c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-.7.7c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l.7-.7zm-12.4 0l.7.7c.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0l-.7-.7c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0z" fill="url(#heat-grad)"/></svg>,
    color: 'from-orange-500 to-red-600',
  },
];

const CharactersSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={sectionRef}
      id="characters"
      className="relative py-32 overflow-hidden"
    >
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-void via-secondary/10 to-void"
        style={{ opacity }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            className="text-gold tracking-[0.4em] uppercase text-sm font-body block mb-6"
          >
            Meet Your Guides
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-stardust text-glow mb-6"
          >
            Master Instructors
          </motion.h2>

          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto font-body"
          >
            Learn from legendary educators who have mastered the fundamental forces of physics. 
            Each instructor brings centuries of wisdom and interactive teaching methods.
          </motion.p>
        </motion.div>

        {/* Character Cards with 3D Tilt */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map((instructor, index) => (
            <CharacterCard
              key={instructor.name}
              instructor={instructor}
              index={index}
              isHovered={hoveredCard === index}
              onHover={() => setHoveredCard(index)}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// 3D Tilt Card Component
const CharacterCard = ({ instructor, index, isHovered, onHover, onLeave }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [deviceTilt, setDeviceTilt] = useState({ x: 0, y: 0 });

  // Device orientation for mobile tilt
  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta !== null && event.gamma !== null) {
        setDeviceTilt({
          x: Math.max(-15, Math.min(15, event.gamma / 2)),
          y: Math.max(-15, Math.min(15, event.beta / 2)),
        });
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    onLeave();
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : deviceTilt.y,
        rotateY: isHovered ? rotateY : deviceTilt.x,
        transformStyle: 'preserve-3d',
      }}
      className="relative group perspective-1000"
    >
      {/* Glassmorphism card */}
      <motion.div
        className="relative overflow-hidden rounded-2xl p-8 glass-strong border border-gold/20 h-full"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${instructor.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />

        {/* Avatar */}
        <motion.div
          className="w-16 h-16 mb-4 text-gold"
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 360 : 0,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(50px)' }}
        >
          {instructor.avatar}
        </motion.div>

        {/* Content */}
        <div style={{ transformStyle: 'preserve-3d', transform: 'translateZ(25px)' }}>
          <h3 className="text-2xl font-display font-bold text-stardust mb-2">
            {instructor.name}
          </h3>
          <p className="text-gold text-sm font-semibold mb-1">{instructor.title}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
            {instructor.specialty}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {instructor.description}
          </p>
        </div>

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: isHovered
              ? `0 0 40px rgba(212, 175, 55, 0.3), inset 0 0 40px rgba(212, 175, 55, 0.1)`
              : '0 0 0px rgba(212, 175, 55, 0)',
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default CharactersSection;
