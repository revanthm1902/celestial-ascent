import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ApplicationFormProps {
    jobTitle: string;
    onClose: () => void;
}

const ALL_ROLES = [
    'Web Frontend Developer',
    'Web Backend Developer',
    'Image AI Engineer – Motion Generation',
    'Prompt AI Engineer – Motion Intelligence',
    'Android Developer',
    'Game Developer (Android)',
    'Management Executive',
    '3D Artist',
    'Texture Artist',
    'Video & Sound Editor',
    'Image Generator / Concept Artist',
];

const YEAR_OPTIONS = ['2027', '2028', '2029'];

const ApplicationForm = ({ jobTitle, onClose }: ApplicationFormProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        portfolio: '', // LinkedIn / Portfolio
        organization: '',
        yearOfPassout: '',
        noticePeriod: '',
        whyJoin: '',
        resumeLink: '', // Changed from file upload
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        // Also handle touch move to prevent scroll propagation on mobile
        const handleTouchMove = (e: TouchEvent) => {
            if (e.target instanceof Element && !e.target.closest('[data-lenis-prevent]')) {
                e.preventDefault();
            }
        };
        document.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.overflowX = 'hidden'; // Restore default
            document.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe3wy92GHzWwBvIggaGx0N2MZxyl0HTm9F5UHugM7k1Tcl3WQ/formResponse";

        const formBody = new FormData();
        formBody.append("entry.2092238618", formData.name);
        formBody.append("entry.1556369182", formData.email);
        formBody.append("entry.1441794091", formData.phone);
        formBody.append("entry.479301265", formData.organization);
        formBody.append("entry.588393791", formData.yearOfPassout);
        formBody.append("entry.801473566", formData.noticePeriod);
        formBody.append("entry.129931568", jobTitle); // Applying For
        formBody.append("entry.1901407935", formData.resumeLink);
        formBody.append("entry.1524051029", formData.portfolio); // Portfolio
        formBody.append("entry.1603146264", formData.whyJoin);   // Why AryVerse?

        try {
            await fetch(GOOGLE_FORM_ACTION_URL, {
                method: "POST",
                mode: "no-cors", // Required for Google Forms
                body: formBody
            });

            // Assume success with no-cors
            setIsSubmitting(false);
            setIsSubmitted(true);
        } catch (error) {
            console.error("Form submission error:", error);
            alert("There was an error submitting your application. Please try again.");
            setIsSubmitting(false);
        }
    };

    const inputClasses = `
        w-full px-4 py-3 rounded-xl text-sm font-body text-stardust
        bg-white/[0.03] border border-white/10
        placeholder:text-muted-foreground/40
        focus:outline-none focus:bg-white/[0.05] focus:border-gold/30 focus:ring-1 focus:ring-gold/20
        transition-all duration-300
    `;

    const labelClasses = "text-xs font-bold font-display text-gold/80 uppercase tracking-widest mb-2 block";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-6"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

            {/* Modal Container */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-5xl h-[90vh] md:h-[85vh] rounded-3xl z-10 flex flex-col md:flex-row shadow-2xl overflow-hidden"
                style={{
                    background: 'rgba(12, 14, 24, 0.95)',
                    border: '1px solid rgba(255, 215, 0, 0.1)',
                    boxShadow: '0 0 80px rgba(0,0,0,0.8), 0 0 30px rgba(255, 215, 0, 0.05)',
                }}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 z-30 w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-gold bg-black/20 hover:bg-gold/10 transition-all hoverable backdrop-blur-sm border border-white/5"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {!isSubmitted ? (
                    <div className="flex flex-col md:flex-row w-full h-full">
                        {/* Sidebar (Left Panel) */}
                        <div className="w-full md:w-1/3 bg-gold/5 border-b md:border-b-0 md:border-r border-gold/10 p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03]" />
                            <div className="absolute -top-20 -left-20 w-60 h-60 bg-gold/10 rounded-full blur-[80px]" />

                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center mb-6 text-gold shadow-[0_0_30px_rgba(255,215,0,0.15)]">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                    </svg>
                                </div>

                                <h2 className="font-display text-3xl font-bold text-stardust leading-tight mb-4">
                                    Join the <span className="text-gold text-glow">Crew</span>
                                </h2>

                                <p className="text-muted-foreground text-sm leading-relaxed font-body">
                                    Become a part of ARYVERSE and help us shape the future of AI, Gaming, and Animation.
                                    We are looking for visionaries ready to push boundaries.
                                </p>
                            </div>

                            <div className="relative z-10 mt-8 md:mt-0">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-xs md:text-sm text-stardust/60 font-body">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gold">1</div>
                                        <span>Personal Details</span>
                                    </div>
                                    <div className="w-0.5 h-4 bg-white/10 ml-4" />
                                    <div className="flex items-center gap-3 text-xs md:text-sm text-stardust/60 font-body">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gold">2</div>
                                        <span>Professional Info</span>
                                    </div>
                                    <div className="w-0.5 h-4 bg-white/10 ml-4" />
                                    <div className="flex items-center gap-3 text-xs md:text-sm text-stardust/60 font-body">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gold">3</div>
                                        <span>Resume Link</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Area (Right Panel) */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar bg-void/50" data-lenis-prevent>
                            <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
                                <div>
                                    <h3 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-3">
                                        Personal Information
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div className="md:col-span-2">
                                            <label className={labelClasses}>Full Name *</label>
                                            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. John Doe" className={inputClasses} />
                                        </div>
                                        <div>
                                            <label className={labelClasses}>Email Address *</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className={inputClasses} />
                                        </div>
                                        <div>
                                            <label className={labelClasses}>Phone Number *</label>
                                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+1 (555) 000-0000" className={inputClasses} />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full h-px bg-white/5" />

                                <div>
                                    <h3 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-3">
                                        Professional Details
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <label className={labelClasses}>Current Organization *</label>
                                            <input type="text" name="organization" value={formData.organization} onChange={handleChange} required placeholder="College or Company Name" className={inputClasses} />
                                        </div>
                                        <div>
                                            <label className={labelClasses}>Passout Year *</label>
                                            <select name="yearOfPassout" value={formData.yearOfPassout} onChange={handleChange} required className={inputClasses}>
                                                <option value="" disabled className="text-black">Select Year</option>
                                                {YEAR_OPTIONS.map(y => <option key={y} value={y} className="text-black">{y}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className={labelClasses}>Notice Period (Days)</label>
                                            <input type="number" name="noticePeriod" value={formData.noticePeriod} onChange={handleChange} placeholder="e.g. 30" className={inputClasses} />
                                        </div>
                                        <div>
                                            <label className={labelClasses}>Portfolio / LinkedIn</label>
                                            <input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange} placeholder="https://..." className={inputClasses} />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className={labelClasses}>Applying For</label>
                                            <input
                                                type="text"
                                                value={jobTitle}
                                                readOnly
                                                className={`${inputClasses} opacity-60 cursor-not-allowed`}
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className={labelClasses}>Why ARYVERSE? <span className='text-muted-foreground capitalize font-normal'>(Optional)</span></label>
                                            <textarea name="whyJoin" value={formData.whyJoin} onChange={handleChange} rows={3} placeholder="Tell us what drives you..." className={inputClasses} />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full h-px bg-white/5" />

                                <div>
                                    <h3 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-3">
                                        Resume / CV Link *
                                    </h3>
                                    <div className="p-6 rounded-xl border border-dashed border-gold/20 bg-gold/5">
                                        <label className={labelClasses}>Google Drive / Public Link</label>
                                        <input
                                            type="url"
                                            name="resumeLink"
                                            value={formData.resumeLink}
                                            onChange={handleChange}
                                            required
                                            placeholder="https://forms.gle/nbWvJpT8UNwJHt3t8"
                                            className={inputClasses}
                                        />
                                        <p className="text-xs text-muted-foreground mt-3 flex items-center gap-2">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                                            Ensure the link is accessible to anyone with the link.
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`
                                            w-full py-4 rounded-xl font-display font-bold text-sm uppercase tracking-widest
                                            transition-all duration-300 relative overflow-hidden group hoverable
                                            ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_0_40px_rgba(255,215,0,0.3)]'}
                                        `}
                                        style={{
                                            background: 'linear-gradient(135deg, hsl(45, 100%, 50%), hsl(35, 100%, 55%))',
                                            color: 'hsl(222, 47%, 5%)',
                                        }}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                    </motion.button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    /* Success State */
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-[url('/grid.svg')] bg-cover"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                            className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center mb-8 text-green-500 shadow-[0_0_50px_rgba(34,197,94,0.3)]"
                        >
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </motion.div>

                        <h2 className="font-display text-3xl font-bold text-white mb-4">Application Received!</h2>
                        <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8 font-body leading-relaxed">
                            Thank you for your interest in <span className="text-gold font-semibold">ARYVERSE</span>.
                            We have received your details and will get back to you soon.
                        </p>

                        <button
                            onClick={onClose}
                            className="px-8 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-all hoverable"
                        >
                            Return to Careers
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default ApplicationForm;
