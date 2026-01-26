import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const stats = [
  { value: '250+', label: 'Active Learners', icon: <svg viewBox="0 0 24 24" fill="none" className="w-full h-full"><defs><linearGradient id="users-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient></defs><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="url(#users-grad)"/></svg> },
  { value: '12', label: 'Study Groups', icon: <svg viewBox="0 0 24 24" fill="none" className="w-full h-full"><defs><linearGradient id="books-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient></defs><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" fill="url(#books-grad)"/></svg> },
  { value: '1,200+', label: 'Questions Answered', icon: <svg viewBox="0 0 24 24" fill="none" className="w-full h-full"><defs><linearGradient id="bulb-grad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#fbbf24"/><stop offset="100%" stopColor="#f59e0b"/></linearGradient></defs><path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z" fill="url(#bulb-grad)"/></svg> },
  { value: '4.2', label: 'Community Rating', icon: <svg viewBox="0 0 24 24" fill="none" className="w-full h-full"><defs><linearGradient id="star2-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fbbf24"/><stop offset="100%" stopColor="#f59e0b"/></linearGradient></defs><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="url(#star2-grad)"/></svg> },
];

const features = [
  {
    title: 'Study Groups',
    description: 'Join collaborative learning circles with students from around the world',
    icon: <svg viewBox="0 0 24 24" fill="none" className="w-full h-full"><defs><linearGradient id="group-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient></defs><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="url(#group-grad)" strokeWidth="2"/><circle cx="9" cy="7" r="4" stroke="url(#group-grad)" strokeWidth="2"/><path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75" stroke="url(#group-grad)" strokeWidth="2"/></svg>,
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    title: 'Live Sessions',
    description: 'Participate in real-time physics experiments and Q&A with instructors',
    icon: <svg viewBox="0 0 24 24" fill="none" className="w-full h-full"><defs><linearGradient id="session-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#0891b2"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient></defs><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="url(#session-grad)"/></svg>,
    color: 'from-cyan-500/20 to-teal-500/20',
  },
  {
    title: 'Discussion Forums',
    description: 'Share insights, ask questions, and help fellow learners master concepts',
    icon: <svg viewBox="0 0 24 24" fill="none" className="w-full h-full"><defs><linearGradient id="forum-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#14b8a6"/><stop offset="100%" stopColor="#f97316"/></linearGradient></defs><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="url(#forum-grad)" strokeWidth="2"/></svg>,
    color: 'from-teal-500/20 to-orange-500/20',
  },
  {
    title: 'Leaderboards',
    description: 'Track your progress and compete with peers in friendly challenges',
    icon: <svg viewBox="0 0 24 24" fill="none" className="w-full h-full"><defs><linearGradient id="leader-grad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#fbbf24"/><stop offset="100%" stopColor="#f59e0b"/></linearGradient></defs><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" fill="url(#leader-grad)"/></svg>,
    color: 'from-orange-500/20 to-yellow-500/20',
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Physics Student',
    avatar: <svg viewBox="0 0 24 24" fill="none" className="w-full h-full"><defs><linearGradient id="avatar1-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#06b6d4"/><stop offset="100%" stopColor="#3b82f6"/></linearGradient></defs><circle cx="12" cy="8" r="4" fill="url(#avatar1-grad)"/><path d="M12 14c-6 0-8 3-8 5v2h16v-2c0-2-2-5-8-5z" fill="url(#avatar1-grad)"/><path d="M17 10h2v2h2v2h-2v2h-2v-2h-2v-2h2v-2z" fill="url(#avatar1-grad)" opacity="0.6"/></svg>,
    text: 'The interactive animations made electromagnetics finally click for me!',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Engineering Major',
    avatar: <svg viewBox="0 0 24 24" fill="none" className="w-full h-full"><defs><linearGradient id="avatar2-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient></defs><circle cx="12" cy="8" r="4" fill="url(#avatar2-grad)"/><path d="M12 14c-6 0-8 3-8 5v2h16v-2c0-2-2-5-8-5z" fill="url(#avatar2-grad)"/><rect x="6" y="16" width="2" height="1" fill="url(#avatar2-grad)" opacity="0.6"/><rect x="10" y="16" width="2" height="1" fill="url(#avatar2-grad)" opacity="0.6"/><rect x="14" y="16" width="2" height="1" fill="url(#avatar2-grad)" opacity="0.6"/></svg>,
    text: 'Best physics platform ever. The community is incredibly supportive.',
  },
  {
    name: 'Aisha Patel',
    role: 'High School Senior',
    avatar: <svg viewBox="0 0 24 24" fill="none" className="w-full h-full"><defs><linearGradient id="avatar3-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient></defs><circle cx="12" cy="8" r="4" fill="url(#avatar3-grad)"/><path d="M12 14c-6 0-8 3-8 5v2h16v-2c0-2-2-5-8-5z" fill="url(#avatar3-grad)"/><path d="M12 3l-1.5 4.5h-4.5l3.5 2.5-1.5 4.5 4-3 4 3-1.5-4.5 3.5-2.5h-4.5z" fill="url(#avatar3-grad)" opacity="0.6" transform="scale(0.4) translate(15, 5)"/></svg>,
    text: 'Gravity lessons with 3D visualizations changed how I see the universe.',
  },
];

const CommunitySection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section 
      ref={sectionRef}
      id="community"
      className="relative py-32 overflow-hidden"
    >
      {/* Layered background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-secondary/20 to-void" />
      
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
            Learn Together
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-stardust text-glow mb-6"
          >
            Our Community
          </motion.h2>

          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto font-body"
          >
            Join thousands of curious minds exploring the wonders of physics together. 
            Learn, share, and grow in a supportive educational environment.
          </motion.p>
        </motion.div>

        {/* Stats with Spring Animation */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Testimonials with Scroll Effect */}
        <motion.div style={{ y }} className="relative">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold text-stardust text-center mb-12"
          >
            What Learners Say
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </motion.div>

        {/* CTA */}
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
            Join the Community
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// Stat Card with Counter Animation
const StatCard = ({ stat, index }: any) => {
  const [deviceTilt, setDeviceTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta !== null && event.gamma !== null) {
        setDeviceTilt({
          x: event.gamma / 4,
          y: event.beta / 4,
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        type: 'spring',
        stiffness: 200,
        damping: 15,
      }}
      whileHover={{ scale: 1.05, y: -5 }}
      style={{
        rotateX: deviceTilt.y,
        rotateY: deviceTilt.x,
        transformStyle: 'preserve-3d',
      }}
      className="relative glass-strong rounded-xl p-6 text-center border border-gold/20 group cursor-pointer"
    >
      <motion.div
        className="w-12 h-12 mb-2 text-gold mx-auto"
        whileHover={{ rotate: 360, scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        {stat.icon}
      </motion.div>
      <div className="text-3xl font-display font-bold text-gold text-glow mb-1">
        {stat.value}
      </div>
      <div className="text-sm text-muted-foreground uppercase tracking-wider">
        {stat.label}
      </div>
    </motion.div>
  );
};

// Feature Card with Neumorphism
const FeatureCard = ({ feature, index }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        className="glass-strong rounded-xl p-8 border border-gold/20 h-full relative overflow-hidden"
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${feature.color}`}
          animate={{
            opacity: isHovered ? 1 : 0.5,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.4 }}
        />

        <div className="relative z-10">
          <motion.div
            className="w-14 h-14 mb-4 text-gold"
            animate={{
              y: isHovered ? -5 : 0,
              rotate: isHovered ? [0, -10, 10, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            {feature.icon}
          </motion.div>
          <h3 className="text-xl font-display font-semibold text-stardust mb-3">
            {feature.title}
          </h3>
          <p className="text-muted-foreground">
            {feature.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Testimonial Card
const TestimonialCard = ({ testimonial, index }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="glass-strong rounded-xl p-6 border border-gold/20"
    >
      <div className="w-12 h-12 mb-4 text-gold">{testimonial.avatar}</div>
      <p className="text-muted-foreground italic mb-4">"{testimonial.text}"</p>
      <div>
        <p className="font-semibold text-stardust">{testimonial.name}</p>
        <p className="text-xs text-gold">{testimonial.role}</p>
      </div>
    </motion.div>
  );
};

export default CommunitySection;
