import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | 'cookies';
}

const legalContent = {
  privacy: {
    title: 'Privacy Policy',
    content: `
## Information We Collect

We collect information you provide directly to us, including when you create an account, use our services, or communicate with us. This may include your name, email address, and usage data.

## How We Use Your Information

We use the information we collect to:
- Provide, maintain, and improve our services
- Process transactions and send related information
- Send you technical notices and support messages
- Respond to your comments and questions
- Monitor and analyze trends, usage, and activities

## Information Sharing

We do not sell your personal information. We may share your information with:
- Service providers who perform services on our behalf
- Law enforcement when required by law
- Other parties with your consent

## Data Security

We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

## Your Rights

You have the right to:
- Access your personal information
- Correct inaccurate data
- Request deletion of your data
- Opt-out of marketing communications

## Contact Us

For privacy-related questions, please contact us at privacy@aryverse.com

Last updated: January 2026
    `
  },
  terms: {
    title: 'Terms of Service',
    content: `
## Acceptance of Terms

By accessing and using ARYVERSE, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.

## Use License

We grant you a limited, non-exclusive, non-transferable license to access and use ARYVERSE for personal, non-commercial purposes, subject to these terms.

## User Accounts

You are responsible for:
- Maintaining the confidentiality of your account credentials
- All activities that occur under your account
- Notifying us of any unauthorized use

## Prohibited Uses

You may not:
- Use our services for any illegal purpose
- Attempt to gain unauthorized access to our systems
- Interfere with or disrupt our services
- Transmit viruses or malicious code
- Harass, abuse, or harm other users

## Intellectual Property

All content, features, and functionality are owned by ARYVERSE and protected by international copyright, trademark, and other intellectual property laws.

## Limitation of Liability

ARYVERSE shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.

## Termination

We may terminate or suspend your account immediately, without prior notice, for conduct that violates these Terms or is harmful to other users or our business.

## Changes to Terms

We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.

## Governing Law

These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.

Last updated: January 2026
    `
  },
  cookies: {
    title: 'Cookie Policy',
    content: `
## What Are Cookies

Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our services.

## Types of Cookies We Use

### Essential Cookies
Required for the website to function properly. These cannot be disabled.

### Performance Cookies
Help us understand how visitors interact with our website by collecting anonymous information.

### Functionality Cookies
Enable enhanced functionality and personalization, such as remembering your preferences.

### Analytics Cookies
Allow us to analyze website traffic and user behavior to improve our services.

## Third-Party Cookies

We may use third-party services that set cookies, including:
- Analytics providers (e.g., Google Analytics)
- Social media platforms
- Advertising partners

## Managing Cookies

You can control and manage cookies through your browser settings. However, disabling certain cookies may limit your ability to use some features of our website.

### Browser Controls
- **Chrome**: Settings > Privacy and security > Cookies
- **Firefox**: Settings > Privacy & Security > Cookies
- **Safari**: Preferences > Privacy > Cookies
- **Edge**: Settings > Privacy > Cookies

## Cookie Duration

- **Session Cookies**: Deleted when you close your browser
- **Persistent Cookies**: Remain on your device for a set period or until manually deleted

## Updates to This Policy

We may update this Cookie Policy from time to time. We encourage you to review this policy periodically for any changes.

## Contact Us

For questions about our use of cookies, please contact us at support@aryverse.com

Last updated: January 2026
    `
  }
};

const LegalModal = ({ isOpen, onClose, type }: LegalModalProps) => {
  const content = legalContent[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-void/90 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl md:max-h-[80vh] z-50"
          >
            <div className="glass-strong border border-gold/20 rounded-2xl h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gold/10">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gold text-glow">
                  {content.title}
                </h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/10 hover:border-gold transition-all hoverable"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 font-body">
                <div className="prose prose-invert max-w-none">
                  {content.content.split('\n\n').map((paragraph, i) => {
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h3 key={i} className="text-xl font-display font-semibold text-stardust mt-6 mb-3">
                          {paragraph.replace('## ', '')}
                        </h3>
                      );
                    } else if (paragraph.startsWith('### ')) {
                      return (
                        <h4 key={i} className="text-lg font-display font-semibold text-gold mt-4 mb-2">
                          {paragraph.replace('### ', '')}
                        </h4>
                      );
                    } else if (paragraph.startsWith('- ')) {
                      const items = paragraph.split('\n');
                      return (
                        <ul key={i} className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                          {items.map((item, j) => (
                            <li key={j}>{item.replace('- ', '')}</li>
                          ))}
                        </ul>
                      );
                    } else {
                      return (
                        <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LegalModal;
