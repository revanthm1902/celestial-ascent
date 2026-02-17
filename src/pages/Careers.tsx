import { useState, useRef, useEffect, Suspense } from 'react';
import { motion, AnimatePresence, useInView, LayoutGroup } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ParticleField from '@/components/ParticleField';
import SmoothScroll, { useLenis } from '@/components/SmoothScroll';
import ScrollToTop from '@/components/ScrollToTop';
import ApplicationForm from '@/components/ApplicationForm';

// ──────────────────────────────────────────
// Job Data
// ──────────────────────────────────────────
interface JobRole {
    id: string;
    title: string;
    category: string;
    icon: JSX.Element;
    overview: string;
    responsibilities: string[];
    skills: string[];
    tools?: string[];
}

const jobCategories = [
    { id: 'all', label: 'All Roles' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'creative', label: 'Creative' },
    { id: 'management', label: 'Management' },
];

const jobs: JobRole[] = [
    {
        id: 'web-frontend',
        title: 'Web Frontend Developer',
        category: 'engineering',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
            </svg>
        ),
        overview: 'The Web Frontend Developer will be responsible for designing, enhancing, and maintaining the visual and interactive elements of the ARYVERSE website. This role demands a strong understanding of modern UI/UX principles, responsive design standards, and scalable frontend architecture.',
        responsibilities: [
            'Redesign and enhance the existing ARYVERSE website interface',
            'Develop responsive, mobile-first, and cross-browser compatible designs',
            'Architect scalable frontend systems to support future feature expansions',
            'Collaborate with backend developers to integrate APIs and services',
            'Optimize website performance, speed, and accessibility',
            'Maintain code quality through structured, reusable, and modular development',
            'Implement modern animations and interactive components to enhance user engagement',
        ],
        skills: [
            'Strong proficiency in HTML, CSS, JavaScript',
            'Experience with modern frontend frameworks (React, Vue, or similar)',
            'Understanding of UI/UX design principles',
            'Knowledge of performance optimization techniques',
        ],
    },
    {
        id: 'web-backend',
        title: 'Web Backend Developer',
        category: 'engineering',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
            </svg>
        ),
        overview: 'The Web Backend Developer will oversee server-side architecture, database management, and application logic for the ARYVERSE web platform. The role focuses on scalability, performance, and data security.',
        responsibilities: [
            'Improve and maintain the current backend infrastructure',
            'Develop secure and scalable APIs',
            'Design and optimize database architecture',
            'Ensure data protection and compliance with security best practices',
            'Build systems that support future platform expansions',
            'Debug, test, and optimize server performance',
            'Collaborate closely with frontend and AI teams',
        ],
        skills: [
            'Proficiency in backend technologies (Node.js, Python, PHP, or similar)',
            'Database management experience (SQL/NoSQL)',
            'Understanding of RESTful API architecture',
            'Knowledge of cloud deployment and security practices',
        ],
    },
    {
        id: 'image-ai',
        title: 'Image AI Engineer – Motion Generation',
        category: 'ai',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
            </svg>
        ),
        overview: 'The Image AI Engineer will work on AI-driven motion generation systems focused on extracting skeletal structures and calculating bone angles from video input. This is a core technical role within ARYVERSE’s AI development division.',
        responsibilities: [
            'Develop computer vision models to detect human skeletal structures',
            'Extract and calculate bone angles from real-time or recorded video',
            'Improve model accuracy, efficiency, and robustness',
            'Optimize motion extraction pipelines for production use',
            'Collaborate with 3D and game development teams for implementation',
            'Conduct research and testing to enhance motion realism',
        ],
        skills: [
            'Strong knowledge of computer vision and deep learning',
            'Experience with frameworks such as TensorFlow or PyTorch',
            'Understanding of pose estimation models',
            'Strong mathematical and analytical skills',
        ],
    },
    {
        id: 'prompt-ai',
        title: 'Prompt AI Engineer – Motion Intelligence',
        category: 'ai',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
        overview: 'The Prompt AI Engineer will design advanced prompt frameworks to generate motion data and skeletal movements using AI models. This role combines AI reasoning, experimentation, and structured output engineering.',
        responsibilities: [
            'Design optimized prompts for AI-based motion generation',
            'Develop structured output systems for bone angle definition',
            'Experiment and refine prompt strategies to improve precision',
            'Work closely with AI and animation teams',
            'Evaluate and enhance prompt-based workflows for production',
        ],
        skills: [
            'Strong understanding of AI model behavior',
            'Experience in prompt engineering and AI output structuring',
            'Analytical thinking and experimentation mindset',
            'Familiarity with generative AI systems',
        ],
    },
    {
        id: 'android-dev',
        title: 'Android Developer',
        category: 'engineering',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
        ),
        overview: 'The Android Developer will be responsible for enhancing the ARYVERSE mobile application and implementing new features that improve usability, scalability, and performance.',
        responsibilities: [
            'Improve application performance and user interface',
            'Develop new features aligned with product strategy',
            'Integrate APIs and backend services',
            'Optimize application stability and security',
            'Perform testing, debugging, and maintenance',
            'Maintain structured documentation and version control',
        ],
        skills: [
            'Strong proficiency in Kotlin or Java',
            'Experience with Android SDK and modern architecture patterns',
            'Knowledge of performance optimization',
            'Experience integrating REST APIs',
        ],
    },
    {
        id: 'game-dev',
        title: 'Game Developer (Android)',
        category: 'engineering',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="6" y1="12" x2="10" y2="12" /><line x1="8" y1="10" x2="8" y2="14" /><line x1="15" y1="13" x2="15.01" y2="13" /><line x1="18" y1="11" x2="18.01" y2="11" />
                <rect x="2" y="6" width="20" height="12" rx="2" />
            </svg>
        ),
        overview: 'The Game Developer will design and develop Android-based games built around ARYVERSE concepts, ensuring engaging gameplay mechanics and optimized mobile performance.',
        responsibilities: [
            'Develop game logic and mechanics',
            'Integrate 3D models, animations, and sound systems',
            'Optimize gameplay for Android devices',
            'Collaborate with artists and AI teams',
            'Test and debug game systems',
            'Maintain performance standards across devices',
        ],
        skills: [
            'Experience with Unity, Unreal Engine, or similar platforms',
            'Strong understanding of game physics and mechanics',
            'Knowledge of mobile optimization techniques',
        ],
    },
    {
        id: 'management',
        title: 'Management Executive',
        category: 'management',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        overview: 'The Management Executive will work directly under the Director, overseeing operational, financial, and administrative processes within the company.',
        responsibilities: [
            'Manage company financial accounts and records',
            'Maintain official documentation and compliance records',
            'Coordinate cross-departmental activities',
            'Support strategic planning and operational management',
            'Ensure professional documentation standards',
        ],
        skills: [
            'Strong organizational and administrative skills',
            'Knowledge of accounting fundamentals',
            'Excellent communication abilities',
            'Professional documentation and record management skills',
        ],
    },
    {
        id: '3d-artist',
        title: '3D Artist',
        category: 'creative',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
            </svg>
        ),
        overview: 'The 3D Artist will design and develop high-quality 3D assets for animation and gaming projects, ensuring both artistic excellence and technical optimization.',
        responsibilities: [
            'Model characters, environments, and props',
            'Perform character rigging and animation',
            'Optimize assets for real-time rendering',
            'Collaborate with AI and game development teams',
            'Maintain quality standards in asset production',
        ],
        skills: [],
        tools: ['Blender', 'Fusion 360', 'Maya', 'or equivalent software'],
    },
    {
        id: 'texture-artist',
        title: 'Texture Artist',
        category: 'creative',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" />
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
            </svg>
        ),
        overview: 'The Texture Artist will create visually compelling textures and materials that enhance the realism and visual identity of ARYVERSE projects.',
        responsibilities: [
            'Develop high-quality textures for 3D assets',
            'Create stylized or realistic material designs',
            'Ensure consistency across assets',
            'Optimize texture resolution and performance',
        ],
        skills: [],
    },
    {
        id: 'video-sound',
        title: 'Video & Sound Editor',
        category: 'creative',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
        ),
        overview: 'The Video & Sound Editor will enhance the audiovisual quality of animations and games through professional editing and sound integration.',
        responsibilities: [
            'Edit animation videos',
            'Add background music and sound effects',
            'Synchronize audio with animation timing',
            'Enhance overall production quality',
        ],
        skills: [],
    },
    {
        id: 'concept-artist',
        title: 'Image Generator / Concept Artist',
        category: 'creative',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" />
            </svg>
        ),
        overview: 'The Image Generator will create original visuals, concept art, and design elements for animation scenes, games, website content, and mobile applications.',
        responsibilities: [
            'Develop character concepts and environment designs',
            'Generate illustrations for web and app content',
            'Support 3D teams with concept references',
            'Maintain brand consistency across visual assets',
        ],
        skills: [],
    },
];

// ──────────────────────────────────────────
// Job Card Component
// ──────────────────────────────────────────
const JobCard = ({ job, onClick, index }: { job: JobRole; onClick: () => void; index: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            layout
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
            onClick={onClick}
            className="group relative cursor-pointer hoverable z-20"
        >
            <div
                className="relative overflow-hidden rounded-2xl p-6 transition-all duration-500 ease-out"
                style={{
                    background: 'rgba(10, 12, 20, 0.4)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 215, 0, 0.08)',
                }}
            >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: 'inset 0 0 40px rgba(255, 215, 0, 0.05), 0 0 30px rgba(255, 215, 0, 0.08)' }}
                />

                <div className="relative z-10 flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-gold/70 group-hover:text-gold transition-colors duration-300"
                        style={{ background: 'rgba(255, 215, 0, 0.08)', border: '1px solid rgba(255, 215, 0, 0.1)' }}
                    >
                        {job.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="font-display text-lg font-semibold text-stardust group-hover:text-gold transition-colors duration-300">
                            {job.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1 line-clamp-2 font-body">
                            {job.overview}
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                            <span className="text-xs px-2.5 py-1 rounded-full font-body"
                                style={{ background: 'rgba(255, 215, 0, 0.1)', color: 'hsl(45, 100%, 50%)', border: '1px solid rgba(255, 215, 0, 0.15)' }}
                            >
                                {jobCategories.find(c => c.id === job.category)?.label}
                            </span>
                            <span className="text-gold/50 text-xs font-body group-hover:text-gold/80 transition-colors duration-300 flex items-center gap-1">
                                View Details
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform group-hover:translate-x-1 transition-transform duration-300">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom border glow on hover */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent transition-all duration-500" />
            </div>
        </motion.div>
    );
};

// ──────────────────────────────────────────
// Job Detail Modal
// ──────────────────────────────────────────
const JobDetail = ({ job, onClose, onApply }: { job: JobRole; onClose: () => void; onApply: () => void }) => {
    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.overflowX = 'hidden'; // Restore default
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-5xl h-[90vh] md:h-[85vh] overflow-hidden rounded-3xl z-10 flex flex-col md:flex-row shadow-2xl"
                style={{
                    background: 'rgba(12, 14, 24, 0.95)',
                    backdropFilter: 'blur(40px)',
                    border: '1px solid rgba(255, 215, 0, 0.1)',
                    boxShadow: '0 0 100px rgba(0,0,0,0.8), 0 0 30px rgba(255, 215, 0, 0.05)',
                }}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 transition-all hoverable"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {/* Left Column (Sticky Sidebar) */}
                <div className="w-full md:w-1/3 bg-white/[0.02] border-b md:border-b-0 md:border-r border-white/5 p-8 flex flex-col relative overflow-y-auto">
                    <div className="flex-1">
                        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-gold"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))',
                                border: '1px solid rgba(255, 215, 0, 0.2)',
                                boxShadow: '0 0 30px rgba(255, 215, 0, 0.1)'
                            }}
                        >
                            {/* Scale up SVG specifically in this view */}
                            <div className="scale-150 transform">
                                {job.icon}
                            </div>
                        </div>

                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
                            style={{ background: 'rgba(255, 215, 0, 0.1)', color: 'hsl(45, 100%, 50%)' }}
                        >
                            {jobCategories.find(c => c.id === job.category)?.label}
                        </span>

                        <h2 className="font-display text-3xl md:text-4xl font-bold text-stardust leading-tight mb-6">
                            {job.title}
                        </h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                                </svg>
                                Remote / Hybrid
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                                </svg>
                                Full-time Position
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 md:mt-0 pt-6 md:pt-0">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onApply}
                            className="w-full py-4 rounded-xl font-display font-bold text-sm uppercase tracking-widest transition-all duration-300 hoverable relative overflow-hidden group"
                            style={{
                                background: 'linear-gradient(135deg, hsl(45, 100%, 50%), hsl(35, 100%, 55%))',
                                color: 'hsl(222, 47%, 5%)',
                                boxShadow: '0 4px 20px rgba(255, 215, 0, 0.2)',
                            }}
                        >
                            <span className="relative z-10">Apply Now</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        </motion.button>
                    </div>
                </div>

                {/* Right Column (Scrollable Content) */}
                <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar" data-lenis-prevent>
                    {/* Overview */}
                    <div className="mb-10">
                        <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-8 h-px bg-gold/50 inline-block"></span>
                            Role Overview
                        </h3>
                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body">
                            {job.overview}
                        </p>
                    </div>

                    {/* Responsibilities */}
                    <div className="mb-10">
                        <h3 className="font-display text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-8 h-px bg-gold/50 inline-block"></span>
                            Key Responsibilities
                        </h3>
                        <ul className="grid gap-4">
                            {job.responsibilities.map((r, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.05 }}
                                    className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-gold/20 transition-colors"
                                >
                                    <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                    <span className="text-stardust/90 text-sm md:text-base font-body leading-relaxed">{r}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Skills */}
                    {job.skills.length > 0 && (
                        <div className="mb-10">
                            <h3 className="font-display text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-8 h-px bg-gold/50 inline-block"></span>
                                Required Skills
                            </h3>
                            <div className="grid md:grid-cols-2 gap-3">
                                {job.skills.map((s, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 + i * 0.05 }}
                                        className="list-none flex items-center gap-3 px-4 py-3 rounded-lg bg-white/[0.02] border border-white/5 text-sm text-stardust/80 font-body"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold/70 shadow-[0_0_8px_rgba(255,215,0,0.5)]"></div>
                                        {s}
                                    </motion.li>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tools */}
                    {job.tools && job.tools.length > 0 && (
                        <div className="mb-8">
                            <h3 className="font-display text-base font-bold text-muted-foreground uppercase tracking-widest mb-4">
                                Tech Stack & Tools
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {job.tools.map((t, i) => (
                                    <span key={i} className="text-xs md:text-sm px-4 py-2 rounded-lg font-body font-medium transition-all duration-300 hover:scale-105"
                                        style={{
                                            background: 'rgba(255, 215, 0, 0.05)',
                                            border: '1px solid rgba(255, 215, 0, 0.15)',
                                            color: 'hsl(45, 100%, 70%)'
                                        }}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

// ──────────────────────────────────────────
// Careers Page Component
// ──────────────────────────────────────────
const Careers = () => {
    const [selectedJob, setSelectedJob] = useState<JobRole | null>(null);
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [applyingForJob, setApplyingForJob] = useState<string>('');
    const [activeCategory, setActiveCategory] = useState('all');
    const heroRef = useRef<HTMLDivElement>(null);
    const heroInView = useInView(heroRef, { once: true });
    const lenis = useLenis();

    const filteredJobs = activeCategory === 'all'
        ? jobs
        : jobs.filter(j => j.category === activeCategory);

    // Lock body scroll & pause Lenis when any modal is open
    useEffect(() => {
        const isModalOpen = !!selectedJob || showApplicationForm;
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
            lenis?.stop();
        } else {
            document.body.style.overflow = '';
            lenis?.start();
        }
        return () => {
            document.body.style.overflow = '';
            lenis?.start();
        };
    }, [selectedJob, showApplicationForm, lenis]);

    const handleApply = (jobTitle: string) => {
        setApplyingForJob(jobTitle);
        setSelectedJob(null);
        setShowApplicationForm(true);
    };

    return (
        <SmoothScroll>
            <Navbar />
            <CustomCursor />
            <Suspense fallback={null}>
                <ParticleField />
            </Suspense>

            <main className="relative min-h-screen">
                {/* Hero Section */}
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
                            Join Our Team
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-stardust text-glow mb-8"
                        >
                            Careers at{' '}
                            <span className="text-gold">ARYVERSE</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto mb-6 font-body leading-relaxed"
                        >
                            At ARYVERSE, we are building next-generation digital experiences at the intersection of
                            Artificial Intelligence, 3D Animation, Gaming, and Interactive Technology. Our mission is
                            to create intelligent, immersive, and scalable creative ecosystems that redefine how users
                            engage with digital worlds.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-muted-foreground text-sm md:text-base max-w-3xl mx-auto font-body leading-relaxed"
                        >
                            We are seeking highly motivated, innovative, and execution-focused students who are
                            passionate about technology and creativity. If you are driven to build meaningful products
                            that combine engineering excellence with artistic precision, ARYVERSE offers an environment
                            where your ideas can transform into impactful solutions.
                        </motion.p>
                    </motion.div>
                </section>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

                {/* Job Openings Section */}
                <section className="relative py-20 md:py-32">
                    <div className="max-w-6xl mx-auto px-6 md:px-12">
                        {/* Section Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-stardust mb-4">
                                Open Positions
                            </h2>
                            <p className="text-muted-foreground font-body max-w-lg mx-auto">
                                Explore our current openings and find a role that matches your skills and ambitions.
                            </p>
                        </motion.div>

                        {/* Category Filter */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-wrap justify-center gap-2 mb-12"
                        >
                            {jobCategories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`
                                        px-4 py-2 rounded-xl text-sm font-body font-medium tracking-wide
                                        transition-all duration-300 hoverable
                                        ${activeCategory === cat.id
                                            ? 'text-void-deep bg-gold shadow-[0_0_20px_rgba(255,215,0,0.3)]'
                                            : 'text-muted-foreground hover:text-gold'
                                        }
                                    `}
                                    style={activeCategory !== cat.id ? {
                                        background: 'rgba(255, 215, 0, 0.05)',
                                        border: '1px solid rgba(255, 215, 0, 0.1)',
                                    } : {}}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </motion.div>

                        {/* Job Grid */}
                        <motion.div
                            className="grid md:grid-cols-2 gap-4"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { opacity: 0 },
                                show: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                        >
                            {filteredJobs.map((job, index) => (
                                <motion.div
                                    key={job.id}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
                                    }}
                                >
                                    <JobCard
                                        job={job}
                                        index={index}
                                        onClick={() => setSelectedJob(job)}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>

                        {filteredJobs.length === 0 && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center text-muted-foreground py-12 font-body"
                            >
                                No positions in this category at the moment.
                            </motion.p>
                        )}
                    </div>
                </section>

                {/* Why Join Section */}
                <section className="relative py-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-void via-secondary/10 to-void" />
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

                    <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-display text-3xl md:text-4xl font-bold text-stardust text-center mb-12"
                        >
                            Why Join <span className="text-gold text-glow">ARYVERSE</span>?
                        </motion.h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { title: 'AI-Driven Motion Tech', desc: 'Opportunity to work on advanced AI-driven motion technologies' },
                                { title: '3D & Gaming Ecosystem', desc: 'Exposure to 3D animation and game development ecosystems' },
                                { title: 'Innovation-Focused', desc: 'High-growth, innovation-focused environment' },
                                { title: 'Leadership Access', desc: 'Direct collaboration with leadership and core product teams' },
                                { title: 'Scalable Products', desc: 'Platform to build impactful, scalable digital products' },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-4 p-5 rounded-xl"
                                    style={{
                                        background: 'rgba(10, 12, 20, 0.4)',
                                        backdropFilter: 'blur(12px)',
                                        border: '1px solid rgba(255, 215, 0, 0.08)',
                                    }}
                                >
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                                        style={{ background: 'rgba(255, 215, 0, 0.1)' }}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(45, 100%, 50%)" strokeWidth="2">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-display text-sm font-semibold text-stardust mb-1">{item.title}</h4>
                                        <p className="text-muted-foreground text-xs font-body">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="text-center text-muted-foreground text-sm font-body mt-12 max-w-2xl mx-auto leading-relaxed"
                        >
                            If you are ready to shape the future of AI-powered animation and gaming,
                            we invite you to apply and become part of ARYVERSE's journey toward
                            technological excellence.
                        </motion.p>
                    </div>
                </section>
            </main>

            <Footer />
            <ScrollToTop />

            {/* Job Detail Modal */}
            <AnimatePresence>
                {selectedJob && (
                    <JobDetail
                        job={selectedJob}
                        onClose={() => setSelectedJob(null)}
                        onApply={() => handleApply(selectedJob.title)}
                    />
                )}
            </AnimatePresence>

            {/* Application Form Modal */}
            <AnimatePresence>
                {showApplicationForm && (
                    <ApplicationForm
                        jobTitle={applyingForJob}
                        onClose={() => setShowApplicationForm(false)}
                    />
                )}
            </AnimatePresence>
        </SmoothScroll>
    );
};

export default Careers;
