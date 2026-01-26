import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

const mediaItems = [
  {
    type: 'video',
    title: 'Electromagnetic Field Visualization',
    description: 'Watch electric and magnetic fields interact in real-time 3D simulations',
    thumbnail: <svg viewBox="0 0 24 24" fill="none" className="w-full h-full"><defs><linearGradient id="video-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient></defs><path d="M8 5v14l11-7z" fill="url(#video-grad)"/><rect x="2" y="3" width="20" height="18" rx="2" fill="none" stroke="url(#video-grad)" strokeWidth="2"/></svg>,
    duration: '3:24',
  },
  {
    type: 'video',
    title: 'Gravity Wells & Spacetime',
    description: 'Experience how massive objects curve spacetime in stunning animations',
    thumbnail: <svg viewBox="0 0 24 24" fill="none" className="w-full h-full"><defs><linearGradient id="star-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fbbf24"/><stop offset="50%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#d97706"/></linearGradient></defs><path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" fill="url(#star-grad)" stroke="url(#star-grad)" strokeWidth="0.5"/></svg>,
    duration: '5:12',
  },
  {
    type: 'gallery',
    title: 'Thermodynamic Processes',
    description: 'Explore heat flow and energy transfer through interactive diagrams',
    thumbnail: <svg viewBox="0 0 24 24" fill="none" className="w-full h-full"><defs><linearGradient id="chart-grad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#10b981"/><stop offset="50%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient></defs><path d="M3 3v18h18" stroke="url(#chart-grad)" strokeWidth="2"/><path d="M7 16l4-8 4 4 4-6" stroke="url(#chart-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    items: '24 images',
  },
  {
    type: 'video',
    title: 'Wave Motion & Interference',
    description: 'See sound and light waves propagate and interfere in beautiful patterns',
    thumbnail: <svg viewBox="0 0 24 24" fill="none" className="w-full h-full"><defs><linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#06b6d4"/><stop offset="50%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#0ea5e9"/></linearGradient></defs><path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0" stroke="url(#wave-grad)" strokeWidth="2.5" strokeLinecap="round"/><path d="M2 16c2-3 4-3 6 0s4 3 6 0 4-3 6 0" stroke="url(#wave-grad)" strokeWidth="2" opacity="0.5" strokeLinecap="round"/></svg>,
    duration: '4:35',
  },
  {
    type: 'interactive',
    title: 'Particle Simulation Lab',
    description: 'Manipulate particles and observe quantum phenomena firsthand',
    thumbnail: <svg viewBox="0 0 24 24" fill="none" className="w-full h-full"><defs><linearGradient id="atom-grad"><stop offset="0%" stopColor="#06b6d4"/><stop offset="50%" stopColor="#0891b2"/><stop offset="100%" stopColor="#3b82f6"/></linearGradient></defs><circle cx="12" cy="12" r="2" fill="url(#atom-grad)"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="url(#atom-grad)" strokeWidth="2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="url(#atom-grad)" strokeWidth="2" transform="rotate(-60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="url(#atom-grad)" strokeWidth="2"/></svg>,
    items: 'Interactive',
  },
  {
    type: 'gallery',
    title: 'Student Achievements',
    description: 'Discover amazing physics projects created by our learning community',
    thumbnail: <svg viewBox="0 0 24 24" fill="none" className="w-full h-full"><defs><linearGradient id="trophy-grad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#fbbf24"/><stop offset="50%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#d97706"/></linearGradient></defs><path d="M6 3v4c0 2 1 3 3 3h6c2 0 3-1 3-3V3h2v4c0 3-2 5-5 5v2h2v2h-8v-2h2v-2c-3 0-5-2-5-5V3h2zm6 18c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2z" fill="url(#trophy-grad)"/></svg>,
    items: '50+ projects',
  },
];

const MediaSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <section 
      ref={sectionRef}
      id="media"
      className="relative py-32 overflow-hidden"
    >
      {/* Multi-layer background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-void to-secondary/5"
        style={{ y: backgroundY }}
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
            Experience The Magic
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-stardust text-glow mb-6"
          >
            Media Gallery
          </motion.h2>

          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto font-body"
          >
            Immerse yourself in stunning visualizations, interactive simulations, and 
            educational content that brings physics to life.
          </motion.p>
        </motion.div>

        {/* Media Grid with Scroll Morphing */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaItems.map((item, index) => (
            <MediaCard key={index} item={item} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-celestial hoverable"
          >
            View Full Gallery
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// Magnetic Media Card with Scroll Morphing
const MediaCard = ({ item, index }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [deviceTilt, setDeviceTilt] = useState({ x: 0, y: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Device orientation for mobile
  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta !== null && event.gamma !== null) {
        setDeviceTilt({
          x: event.gamma / 3,
          y: event.beta / 3,
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

  // Magnetic effect - card follows cursor
  const cardX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const cardY = useSpring(mouseY, { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Magnetic pull effect
    const distanceX = (e.clientX - centerX) * 0.1;
    const distanceY = (e.clientY - centerY) * 0.1;
    
    mouseX.set(distanceX);
    mouseY.set(distanceY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: cardX, y: cardY }}
      className="relative cursor-pointer group"
    >
      <motion.div
        className="relative overflow-hidden rounded-xl glass-strong border border-gold/20 p-6 h-full"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {/* Thumbnail with spotlight effect */}
        <motion.div
          className="relative mb-4 aspect-video rounded-lg bg-gradient-to-br from-secondary/30 to-void/50 flex items-center justify-center overflow-hidden"
          animate={{
            boxShadow: isHovered
              ? '0 0 30px rgba(212, 175, 55, 0.4)'
              : '0 0 0px rgba(212, 175, 55, 0)',
          }}
          style={{
            rotateX: deviceTilt.y,
            rotateY: deviceTilt.x,
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.div 
            className="w-16 h-16 text-gold"
            animate={{ 
              scale: isHovered ? [1, 1.1, 1] : 1,
              filter: isHovered ? ['brightness(1)', 'brightness(1.3)', 'brightness(1)'] : 'brightness(1)',
            }}
            transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
          >
            {item.thumbnail}
          </motion.div>
          
          {/* Type badge */}
          <div className="absolute top-2 right-2 px-3 py-1 rounded-full glass-strong text-xs uppercase tracking-wider text-gold">
            {item.type}
          </div>

          {/* Duration/Items */}
          {(item.duration || item.items) && (
            <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-void/80 text-xs text-stardust">
              {item.duration || item.items}
            </div>
          )}
        </motion.div>

        {/* Content */}
        <h3 className="text-lg font-display font-semibold text-stardust mb-2 group-hover:text-gold transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {item.description}
        </p>

        {/* Play/View button with physics */}
        <motion.div
          className="mt-4 flex items-center gap-2 text-gold text-sm font-semibold"
          animate={{
            x: isHovered ? 5 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <span>{item.type === 'video' ? 'Watch Now' : 'Explore'}</span>
          <motion.span
            animate={{
              x: isHovered ? [0, 5, 0] : 0,
            }}
            transition={{
              repeat: isHovered ? Infinity : 0,
              duration: 1,
            }}
          >
            →
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MediaSection;
