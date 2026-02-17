import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
    {
        name: 'Home',
        path: '/',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
    },
    {
        name: 'About',
        path: '/about',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
        ),
    },
    {
        name: 'Careers',
        path: '/careers',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
        ),
    },
    {
        name: 'Contact',
        path: '/contact',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
    },
];

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasPassedHero, setHasPassedHero] = useState(false);
    const [revealedCount, setRevealedCount] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Show navbar after a small delay when entering the realm
        const showTimer = setTimeout(() => {
            setIsVisible(true);
            // Auto-hide after 3 seconds if user hasn't scrolled
            const hideTimer = setTimeout(() => {
                if (window.scrollY < 100) {
                    setIsVisible(false);
                }
            }, 3000);
            return () => clearTimeout(hideTimer);
        }, 1000);

        return () => clearTimeout(showTimer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = window.innerHeight;
            const scrollY = window.scrollY;

            if (scrollY > heroHeight * 0.8) {
                if (!hasPassedHero) {
                    setHasPassedHero(true);
                    setIsVisible(true);
                    // Stagger reveal each nav item
                    navItems.forEach((_, i) => {
                        setTimeout(() => {
                            setRevealedCount(prev => Math.max(prev, i + 1));
                        }, i * 150);
                    });
                }
            } else if (scrollY < 100) {
                setHasPassedHero(false);
                setRevealedCount(0);
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasPassedHero]);

    // On non-home pages, always show navbar
    useEffect(() => {
        if (location.pathname !== '/') {
            setIsVisible(true);
            setHasPassedHero(true);
            navItems.forEach((_, i) => {
                setTimeout(() => {
                    setRevealedCount(prev => Math.max(prev, i + 1));
                }, i * 150);
            });
        }
    }, [location.pathname]);

    const handleNavClick = (path: string) => {
        if (path === '/') {
            if (location.pathname !== '/') {
                navigate('/');
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else {
            navigate(path);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit"
                >
                    <div
                        className="flex items-center gap-1.5 p-1.5 rounded-full"
                        style={{
                            background: 'rgba(8, 10, 18, 0.6)',
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                            border: '1px solid rgba(255, 215, 0, 0.1)',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                        }}
                    >
                        {navItems.map((item, index) => (
                            <motion.button
                                key={item.name}
                                initial={{ y: -20, opacity: 0 }}
                                animate={
                                    index < revealedCount
                                        ? { y: 0, opacity: 1 }
                                        : { y: -20, opacity: 0 }
                                }
                                transition={{
                                    duration: 0.5,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: hasPassedHero ? 0 : index * 0.05,
                                }}
                                onClick={() => handleNavClick(item.path)}
                                className={`
                                    group relative flex items-center gap-2.5 px-5 py-3 rounded-full
                                    text-sm font-medium tracking-wide font-body
                                    transition-all duration-500 ease-out
                                    hoverable
                                    ${(location.pathname === item.path) ||
                                        (item.path === '/' && location.pathname === '/' && !location.hash)
                                        ? 'text-void-deep'
                                        : 'text-stardust/80 hover:text-white'
                                    }
                                `}
                            >
                                {/* Active / Hover background */}
                                <span
                                    className={`
                                        absolute inset-0 rounded-full transition-all duration-500 ease-out
                                        ${(location.pathname === item.path) ||
                                            (item.path === '/' && location.pathname === '/' && !location.hash)
                                            ? 'bg-gold opacity-100 shadow-[0_0_20px_rgba(255,215,0,0.4)]'
                                            : 'bg-white/5 opacity-0 group-hover:opacity-100'
                                        }
                                    `}
                                />

                                {/* Icon */}
                                <span className="relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                                    {item.icon}
                                </span>

                                {/* Label */}
                                <span className="relative z-10 hidden sm:inline">
                                    {item.name}
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default Navbar;
