import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-6 left-6 md:left-12 lg:left-24 z-50"
    >
      <a 
        href="#" 
        className="font-display text-2xl md:text-3xl font-bold text-gold text-glow hoverable inline-block"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        ARYVERSE
      </a>
    </motion.div>
  );
};

export default Logo;
