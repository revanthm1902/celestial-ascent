import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';

interface KingdomCardProps {
  title: string;
  description: string;
  features: string[];
  image: string;
  index: number;
  isReversed: boolean;
}

const KingdomCard = ({ 
  title, 
  description, 
  features, 
  image, 
  index, 
  isReversed 
}: KingdomCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 150,
    damping: 20,
  });
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        isReversed ? 'lg:grid-flow-dense' : ''
      }`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {/* Image with 3D Tilt */}
      <motion.div
        ref={imageRef}
        className={`relative overflow-hidden rounded-2xl aspect-square lg:aspect-square ${
          isReversed ? 'lg:col-start-2' : ''
        }`}
        variants={itemVariants}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        animate={{
          y: [0, -20, 0],
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          damping: 30,
          y: {
            repeat: Infinity,
            duration: 4,
            ease: 'easeInOut',
          }
        }}
      >
        <motion.div
          className="absolute inset-0 scale-125"
          style={{ 
            y: imageY, 
            scale: imageScale,
            transformStyle: 'preserve-3d',
          }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain"
          />
        </motion.div>
        
        {/* Overlay gradient with depth */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60"
          style={{ transform: 'translateZ(10px)' }}
        />


        {/* Spotlight effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-gold/20 via-transparent to-transparent"
          animate={{
            opacity: isHovered ? 0.5 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className={`space-y-6 ${isReversed ? 'lg:col-start-1 lg:text-right' : ''}`}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-body">
            Kingdom {String(index + 1).padStart(2, '0')}
          </span>
        </motion.div>

        <motion.h3
          variants={itemVariants}
          className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-stardust"
        >
          {title}
        </motion.h3>

        <motion.p
          variants={itemVariants}
          className="text-muted-foreground text-lg leading-relaxed font-body"
        >
          {description}
        </motion.p>

        <motion.ul
          variants={containerVariants}
          className={`space-y-3 ${isReversed ? 'lg:ml-auto' : ''}`}
        >
          {features.map((feature, i) => (
            <motion.li
              key={i}
              variants={itemVariants}
              className={`flex items-center gap-3 text-foreground/80 ${
                isReversed ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="font-body">{feature}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
};

export default KingdomCard;
