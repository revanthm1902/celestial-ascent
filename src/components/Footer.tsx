import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LegalModal from './LegalModal';

const socialLinks = [
  { name: 'Discord', icon: 'M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z' },
  { name: 'Twitter', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  { name: 'YouTube', icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
  { name: 'Twitch', icon: 'M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z' },
];

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Careers', href: '/careers' },
  { name: 'Creators', href: 'https://creators.aryverse.com/' },
  { name: 'Contact', href: '/contact' },
];

const Footer = () => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | 'cookies' | null>(null);
  const navigate = useNavigate();

  const handleQuickLink = (href: string) => {
    if (href.startsWith('http')) {
      window.location.href = href;
      return;
    }
    if (href === '/') {
      if (window.location.pathname !== '/') {
        navigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <>
      <LegalModal
        isOpen={legalModal !== null}
        onClose={() => setLegalModal(null)}
        type={legalModal || 'privacy'}
      />

      <footer className="relative overflow-hidden">
        {/* Glass background */}
        <div className="absolute inset-0 glass-strong" />

        {/* Top border gradient */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="lg:col-span-2">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-3xl font-bold text-gold text-glow mb-4"
              >
                ARYVERSE
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground max-w-md mb-6 font-body"
              >
                Master the mysteries of physics through interactive lessons and stunning animations.
                Join thousands of learners exploring the fundamental forces of the universe.
              </motion.p>
            </div>

            {/* Quick Links */}
            <div>
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-lg font-semibold text-stardust mb-4"
              >
                Quick Links
              </motion.h4>
              <ul className="space-y-3">
                {quickLinks.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <button
                      onClick={() => handleQuickLink(link.href)}
                      className="text-muted-foreground hover:text-gold transition-colors duration-300 font-body hoverable"
                    >
                      {link.name}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-lg font-semibold text-stardust mb-4"
              >
                Contact Us
              </motion.h4>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-4 rounded-xl text-muted-foreground bg-white/5 border border-white/5"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a href="mailto:info@aryverse.com" className="hover:text-gold transition-colors hoverable text-sm font-body tracking-wide">
                  info@aryverse.com
                </a>
              </motion.div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gold/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-muted-foreground text-sm font-body"
              >
                © 2026 ARYVERSE Studios. All Rights Reserved.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex gap-6 text-sm font-body"
              >
                <button
                  onClick={() => setLegalModal('privacy')}
                  className="text-muted-foreground hover:text-gold transition-colors hoverable"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setLegalModal('terms')}
                  className="text-muted-foreground hover:text-gold transition-colors hoverable"
                >
                  Terms of Service
                </button>
                <button
                  onClick={() => setLegalModal('cookies')}
                  className="text-muted-foreground hover:text-gold transition-colors hoverable"
                >
                  Cookie Policy
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
