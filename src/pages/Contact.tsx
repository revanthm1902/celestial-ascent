import { useRef, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ParticleField from '@/components/ParticleField';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollToTop from '@/components/ScrollToTop';

// ──────────────────────────────────────────
// Contact Info Data
// ──────────────────────────────────────────
const contactChannels = [
    {
        label: 'Email',
        value: 'contact@aryverse.com',
        href: 'mailto:contact@aryverse.com',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
    },
    {
        label: 'Discord',
        value: 'Join our server',
        href: '#',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
        ),
    },
    {
        label: 'Twitter / X',
        value: '@aryverse',
        href: '#',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        label: 'YouTube',
        value: 'ARYVERSE Studios',
        href: '#',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        ),
    },
];

const faqs = [
    { q: 'How can I apply for a role?', a: 'Visit our Careers page and click "Apply" on any open position. You\'ll be redirected to our application form.' },
    { q: 'Is ARYVERSE hiring remotely?', a: 'Yes — all our current roles are open to remote collaboration, with flexible working hours.' },
    { q: 'I have a partnership proposal. Where should I send it?', a: 'Please reach out via email at contact@aryverse.com with your proposal details.' },
    { q: 'What technologies does ARYVERSE use?', a: 'We work with React, Three.js, TensorFlow/PyTorch, Unity, Blender, and a range of modern web and AI technologies.' },
];

// ──────────────────────────────────────────
// Contact Page
// ──────────────────────────────────────────
const Contact = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const heroInView = useInView(heroRef, { once: true });

    return (
        <SmoothScroll>
            <Navbar />
            <CustomCursor />
            <Suspense fallback={null}>
                <ParticleField />
            </Suspense>

            <main className="relative min-h-screen">
                {/* ── Hero ── */}
                <section className="relative flex items-center justify-center py-32 md:py-44 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-void via-secondary/10 to-void" />

                    <motion.div
                        ref={heroRef}
                        className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="text-gold tracking-[0.4em] uppercase text-sm font-body block mb-6"
                        >
                            Get In Touch
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-stardust text-glow mb-8"
                        >
                            Contact{' '}
                            <span className="text-gold">Us</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto font-body leading-relaxed"
                        >
                            Have a question, partnership idea, or just want to say hello?
                            We'd love to hear from you. Reach out through any of the channels below.
                        </motion.p>
                    </motion.div>
                </section>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

                {/* ── Contact Channels ── */}
                <section className="relative py-20 md:py-28">
                    <div className="max-w-5xl mx-auto px-6 md:px-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-display text-3xl md:text-4xl font-bold text-stardust text-center mb-12"
                        >
                            Reach <span className="text-gold text-glow">Out</span>
                        </motion.h2>

                        <div className="grid sm:grid-cols-2 gap-5">
                            {contactChannels.map((ch, i) => (
                                <motion.a
                                    key={ch.label}
                                    href={ch.href}
                                    target={ch.href.startsWith('http') ? '_blank' : undefined}
                                    rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group relative overflow-hidden rounded-2xl p-6 hoverable"
                                    style={{
                                        background: 'rgba(10, 12, 20, 0.4)',
                                        backdropFilter: 'blur(16px)',
                                        border: '1px solid rgba(255, 215, 0, 0.08)',
                                    }}
                                >
                                    <div
                                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{ boxShadow: 'inset 0 0 40px rgba(255, 215, 0, 0.05), 0 0 30px rgba(255, 215, 0, 0.08)' }}
                                    />

                                    <div className="relative z-10 flex items-center gap-4">
                                        <div
                                            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-gold/70 group-hover:text-gold transition-colors duration-300"
                                            style={{ background: 'rgba(255, 215, 0, 0.08)', border: '1px solid rgba(255, 215, 0, 0.1)' }}
                                        >
                                            {ch.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-display text-base font-semibold text-stardust group-hover:text-gold transition-colors duration-300">
                                                {ch.label}
                                            </h3>
                                            <p className="text-muted-foreground text-sm font-body">{ch.value}</p>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent transition-all duration-500" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

                {/* ── Contact Form ── */}
                <section className="relative py-20 md:py-28">
                    <div className="max-w-4xl mx-auto px-6 md:px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
                            style={{
                                background: 'rgba(12, 14, 24, 0.6)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 215, 0, 0.1)',
                                boxShadow: '0 0 80px rgba(0,0,0,0.5)',
                            }}
                        >
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03]" />
                            <div className="absolute -top-20 -right-20 w-60 h-60 bg-gold/5 rounded-full blur-[80px]" />

                            <div className="relative z-10">
                                <div className="text-center mb-10">
                                    <h2 className="font-display text-3xl md:text-4xl font-bold text-stardust mb-4">
                                        Send us a <span className="text-gold text-glow">Message</span>
                                    </h2>
                                    <p className="text-muted-foreground font-body">
                                        Prefer to write to us directly? Fill out the form below and we'll get back to you as soon as possible.
                                    </p>
                                </div>

                                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-xs font-bold font-display text-gold/80 uppercase tracking-widest mb-2 block">Name</label>
                                            <input
                                                type="text"
                                                placeholder="Your Name"
                                                className="w-full px-4 py-3 rounded-xl text-sm font-body text-stardust bg-white/[0.03] border border-white/10 placeholder:text-muted-foreground/40 focus:outline-none focus:bg-white/[0.05] focus:border-gold/30 focus:ring-1 focus:ring-gold/20 transition-all duration-300"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold font-display text-gold/80 uppercase tracking-widest mb-2 block">Email</label>
                                            <input
                                                type="email"
                                                placeholder="your@email.com"
                                                className="w-full px-4 py-3 rounded-xl text-sm font-body text-stardust bg-white/[0.03] border border-white/10 placeholder:text-muted-foreground/40 focus:outline-none focus:bg-white/[0.05] focus:border-gold/30 focus:ring-1 focus:ring-gold/20 transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold font-display text-gold/80 uppercase tracking-widest mb-2 block">Subject</label>
                                        <select className="w-full px-4 py-3 rounded-xl text-sm font-body text-stardust bg-white/[0.03] border border-white/10 placeholder:text-muted-foreground/40 focus:outline-none focus:bg-white/[0.05] focus:border-gold/30 focus:ring-1 focus:ring-gold/20 transition-all duration-300">
                                            <option value="" disabled selected className="bg-void text-muted-foreground">Select a Subject</option>
                                            <option value="general" className="bg-void">General Inquiry</option>
                                            <option value="partnership" className="bg-void">Partnership / Collaboration</option>
                                            <option value="careers" className="bg-void">Careers / Hiring</option>
                                            <option value="press" className="bg-void">Press / Media</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold font-display text-gold/80 uppercase tracking-widest mb-2 block">Message</label>
                                        <textarea
                                            rows={4}
                                            placeholder="How can we help you?"
                                            className="w-full px-4 py-3 rounded-xl text-sm font-body text-stardust bg-white/[0.03] border border-white/10 placeholder:text-muted-foreground/40 focus:outline-none focus:bg-white/[0.05] focus:border-gold/30 focus:ring-1 focus:ring-gold/20 transition-all duration-300 resize-none"
                                        />
                                    </div>

                                    <div className="flex justify-center pt-2">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-10 py-4 rounded-xl font-display font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] hoverable"
                                            style={{
                                                background: 'linear-gradient(135deg, hsl(45, 100%, 50%), hsl(35, 100%, 55%))',
                                                color: 'hsl(222, 47%, 5%)',
                                            }}
                                        >
                                            Send Message
                                        </motion.button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

                {/* ── FAQ ── */}
                <section className="relative py-20 md:py-28 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-void via-secondary/10 to-void" />

                    <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-display text-3xl md:text-4xl font-bold text-stardust text-center mb-12"
                        >
                            Frequently <span className="text-gold text-glow">Asked</span>
                        </motion.h2>

                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="rounded-xl p-5"
                                    style={{
                                        background: 'rgba(10, 12, 20, 0.4)',
                                        backdropFilter: 'blur(12px)',
                                        border: '1px solid rgba(255, 215, 0, 0.08)',
                                    }}
                                >
                                    <h4 className="font-display text-sm font-semibold text-stardust mb-2">{faq.q}</h4>
                                    <p className="text-muted-foreground text-sm font-body leading-relaxed">{faq.a}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

                {/* ── CTA ── */}
                <section className="relative py-20 md:py-28">
                    <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-display text-2xl md:text-3xl font-bold text-stardust mb-4"
                        >
                            Ready to join the <span className="text-gold text-glow">ARYVERSE</span>?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-muted-foreground text-sm md:text-base font-body mb-8"
                        >
                            Explore open positions and become part of our team.
                        </motion.p>
                        <motion.a
                            href="/careers"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-block px-8 py-4 rounded-xl font-display font-semibold text-sm uppercase tracking-widest hoverable"
                            style={{
                                background: 'linear-gradient(135deg, hsl(45, 100%, 50%), hsl(35, 100%, 55%))',
                                color: 'hsl(222, 47%, 5%)',
                                boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
                            }}
                        >
                            View Careers
                        </motion.a>
                    </div>
                </section>
            </main>

            <Footer />
            <ScrollToTop />
        </SmoothScroll>
    );
};

export default Contact;
