import { useRef, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ParticleField from '@/components/ParticleField';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollToTop from '@/components/ScrollToTop';

// ──────────────────────────────────────────
// Data
// ──────────────────────────────────────────
const pillars = [
    {
        title: 'Artificial Intelligence',
        desc: 'Pioneering AI-driven motion capture and generation technologies that translate real-world movement into stunning digital animation.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
            </svg>
        ),
    },
    {
        title: '3D Animation',
        desc: 'Crafting high-fidelity 3D characters, environments, and cinematic sequences that push the boundaries of digital storytelling.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
            </svg>
        ),
    },
    {
        title: 'Gaming',
        desc: 'Developing immersive Android-based gaming experiences that blend innovative mechanics with cutting-edge visual fidelity.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="6" y1="12" x2="10" y2="12" /><line x1="8" y1="10" x2="8" y2="14" />
                <line x1="15" y1="13" x2="15.01" y2="13" /><line x1="18" y1="11" x2="18.01" y2="11" />
                <rect x="2" y="6" width="20" height="12" rx="2" />
            </svg>
        ),
    },
    {
        title: 'Interactive Technology',
        desc: 'Building responsive, real-time web and mobile platforms that deliver seamless, engaging user experiences at scale.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
            </svg>
        ),
    },
];

const values = [
    { title: 'Innovation First', desc: 'We relentlessly pursue creative and technical breakthroughs.' },
    { title: 'Execution Excellence', desc: 'Ideas matter — but meticulous execution is what defines us.' },
    { title: 'Collaborative Spirit', desc: 'Engineers, artists, and strategists work as one team.' },
    { title: 'Impact-Driven', desc: 'Every product we build is designed to make a measurable difference.' },
    { title: 'Continuous Growth', desc: 'We invest in learning, experimentation, and pushing boundaries.' },
    { title: 'User-Centric Design', desc: 'The people who use our products are at the heart of every decision.' },
];

// ──────────────────────────────────────────
// Section Components
// ──────────────────────────────────────────
const SectionDivider = () => (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
);

const About = () => {
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
                            Who We Are
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-stardust text-glow mb-8"
                        >
                            About{' '}
                            <span className="text-gold">ARYVERSE</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto font-body leading-relaxed"
                        >
                            ARYVERSE is a next-generation technology studio building intelligent, immersive,
                            and scalable creative ecosystems at the intersection of Artificial Intelligence,
                            3D Animation, Gaming, and Interactive Technology. We are redefining how users
                            engage with digital worlds.
                        </motion.p>
                    </motion.div>
                </section>

                <SectionDivider />

                {/* ── Mission ── */}
                <section className="relative py-20 md:py-28">
                    <div className="max-w-5xl mx-auto px-6 md:px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-stardust mb-6">
                                Our <span className="text-gold text-glow">Mission</span>
                            </h2>
                            <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto font-body leading-relaxed">
                                To create intelligent, immersive digital products that merge engineering precision
                                with artistic vision — empowering creators, educators, and users to experience
                                technology in ways never imagined before.
                            </p>
                        </motion.div>

                        {/* Pillars */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {pillars.map((pillar, i) => (
                                <motion.div
                                    key={pillar.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group relative overflow-hidden rounded-2xl p-6"
                                    style={{
                                        background: 'rgba(10, 12, 20, 0.4)',
                                        backdropFilter: 'blur(16px)',
                                        border: '1px solid rgba(255, 215, 0, 0.08)',
                                    }}
                                >
                                    {/* Hover glow */}
                                    <div
                                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{ boxShadow: 'inset 0 0 40px rgba(255, 215, 0, 0.05), 0 0 30px rgba(255, 215, 0, 0.08)' }}
                                    />

                                    <div className="relative z-10 flex items-start gap-4">
                                        <div
                                            className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-gold/70 group-hover:text-gold transition-colors duration-300"
                                            style={{ background: 'rgba(255, 215, 0, 0.08)', border: '1px solid rgba(255, 215, 0, 0.1)' }}
                                        >
                                            {pillar.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-display text-lg font-semibold text-stardust group-hover:text-gold transition-colors duration-300 mb-2">
                                                {pillar.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm font-body leading-relaxed">
                                                {pillar.desc}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent transition-all duration-500" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <SectionDivider />

                {/* ── Vision ── */}
                <section className="relative py-20 md:py-28 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-void via-secondary/10 to-void" />

                    <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-display text-3xl md:text-4xl font-bold text-stardust mb-6"
                        >
                            Our <span className="text-gold text-glow">Vision</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto font-body leading-relaxed mb-8"
                        >
                            To become a globally recognized studio that sets the standard for
                            AI-powered creative technology — where innovation, artistry, and engineering
                            converge to shape the future of digital interaction.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl"
                            style={{
                                background: 'rgba(255, 215, 0, 0.06)',
                                border: '1px solid rgba(255, 215, 0, 0.15)',
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(45, 100%, 50%)" strokeWidth="1.5">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            <span className="text-gold text-sm font-display tracking-wider uppercase">
                                Shaping Tomorrow's Digital Worlds
                            </span>
                        </motion.div>
                    </div>
                </section>

                <SectionDivider />

                {/* ── Values ── */}
                <section className="relative py-20 md:py-28">
                    <div className="max-w-5xl mx-auto px-6 md:px-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-display text-3xl md:text-4xl font-bold text-stardust text-center mb-12"
                        >
                            Our <span className="text-gold text-glow">Values</span>
                        </motion.h2>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {values.map((v, i) => (
                                <motion.div
                                    key={v.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="flex items-start gap-4 p-5 rounded-xl"
                                    style={{
                                        background: 'rgba(10, 12, 20, 0.4)',
                                        backdropFilter: 'blur(12px)',
                                        border: '1px solid rgba(255, 215, 0, 0.08)',
                                    }}
                                >
                                    <div
                                        className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                                        style={{ background: 'rgba(255, 215, 0, 0.1)' }}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(45, 100%, 50%)" strokeWidth="2">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-display text-sm font-semibold text-stardust mb-1">{v.title}</h4>
                                        <p className="text-muted-foreground text-xs font-body">{v.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <SectionDivider />

                {/* ── What We Do ── */}
                <section className="relative py-20 md:py-28 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-void via-secondary/10 to-void" />

                    <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-display text-3xl md:text-4xl font-bold text-stardust text-center mb-12"
                        >
                            What We <span className="text-gold text-glow">Build</span>
                        </motion.h2>

                        <div className="space-y-6">
                            {[
                                {
                                    label: 'AI Motion Systems',
                                    desc: 'Computer vision models that extract skeletal structures and bone angles from video, powering lifelike digital motion.',
                                },
                                {
                                    label: 'Immersive Web Experiences',
                                    desc: 'Responsive, high-performance web platforms featuring 3D visuals, interactive elements, and modern UI/UX.',
                                },
                                {
                                    label: 'Android Applications & Games',
                                    desc: 'Feature-rich mobile apps and games optimized for performance across a wide range of Android devices.',
                                },
                                {
                                    label: '3D Animation & Visual Content',
                                    desc: 'High-fidelity character models, environments, textures, and cinematic sequences for animation and gaming.',
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-4 p-5 rounded-xl"
                                    style={{
                                        background: 'rgba(10, 12, 20, 0.3)',
                                        backdropFilter: 'blur(12px)',
                                        border: '1px solid rgba(255, 215, 0, 0.08)',
                                    }}
                                >
                                    <div
                                        className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-gold"
                                        style={{ background: 'rgba(255, 215, 0, 0.08)', border: '1px solid rgba(255, 215, 0, 0.12)' }}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-display text-base font-semibold text-stardust mb-1">{item.label}</h4>
                                        <p className="text-muted-foreground text-sm font-body leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <ScrollToTop />
        </SmoothScroll>
    );
};

export default About;
