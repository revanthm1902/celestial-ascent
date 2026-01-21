import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

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
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

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
      {/* Image */}
      <motion.div
        className={`relative overflow-hidden rounded-2xl aspect-square lg:aspect-[4/3] ${
          isReversed ? 'lg:col-start-2' : ''
        }`}
        variants={itemVariants}
      >
        <motion.div
          className="absolute inset-0"
          style={{ y: imageY, scale: imageScale }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60" />
        
        {/* Decorative border */}
        <div className="absolute inset-0 border border-gold/20 rounded-2xl" />
        
        {/* Corner accents */}
        <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-gold/40" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-gold/40" />
        
        {/* Kingdom number */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute top-6 right-6 w-14 h-14 rounded-full glass-strong flex items-center justify-center"
        >
          <span className="font-display text-xl font-bold text-gold">
            {String(index + 1).padStart(2, '0')}
          </span>
        </motion.div>
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

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-ghost mt-4 hoverable"
        >
          Explore Realm
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default KingdomCard;
