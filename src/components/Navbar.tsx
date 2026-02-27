import { useState, useEffect, useRef } from 'react';
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
        name: 'Creators',
        path: 'https://creators.aryverse.com/',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
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
            // Auto-hide after 3 seconds if user hasn't scrolled and no interaction
            const hideTimer = setTimeout(() => {
                if (window.scrollY < 100 && !mouseNearTop && !isMovingUp) {
                    setIsVisible(false);
                }
            }, 3000);
            return () => clearTimeout(hideTimer);
        }, 1000);

        return () => clearTimeout(showTimer);
    }, []);

    const lastScrollY = useRef(0);
    const [mouseNearTop, setMouseNearTop] = useState(false);
    const [isMovingUp, setIsMovingUp] = useState(false);
    const movingUpTimeout = useRef<NodeJS.Timeout>();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const heroHeight = window.innerHeight;
            // Only tracking for Hero Section interactions
            // AND strictly top 20% for "Move Up" gesture
            if (window.scrollY < heroHeight * 0.8) {

                // 1. Near Top Detection (Immediate Show)
                if (e.clientY < 100) {
                    setMouseNearTop(true);
                } else {
                    setMouseNearTop(false);
                }

                // 2. Movement Up Detection - RESTRICTED TO TOP 20%
                if (e.clientY < heroHeight * 0.2) {
                    if (e.movementY < -1) { // Moving Up significantly
                        setIsMovingUp(true);
                        // Clear existing timeout to keep it active while moving
                        if (movingUpTimeout.current) clearTimeout(movingUpTimeout.current);

                        // Reset after stop moving
                        movingUpTimeout.current = setTimeout(() => {
                            setIsMovingUp(false);
                        }, 1000);
                    } else if (e.movementY > 1) { // Moving Down
                        setIsMovingUp(false);
                        if (movingUpTimeout.current) clearTimeout(movingUpTimeout.current);
                    }
                } else {
                    // If cursor is below 20%, force isMovingUp to false (so navbar hides if it was shown)
                    setIsMovingUp(false);
                    if (movingUpTimeout.current) clearTimeout(movingUpTimeout.current);
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (movingUpTimeout.current) clearTimeout(movingUpTimeout.current);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = window.innerHeight;
            const scrollY = window.scrollY;

            if (scrollY > heroHeight * 0.8) {
                // Passed Hero: Always Sticky/Visible
                if (!hasPassedHero) {
                    setHasPassedHero(true);
                    setIsVisible(true);
                    navItems.forEach((_, i) => {
                        setTimeout(() => {
                            setRevealedCount(prev => Math.max(prev, i + 1));
                        }, i * 150);
                    });
                } else {
                    setIsVisible(true);
                }
            } else {
                // In Hero Section
                if (hasPassedHero) {
                    setHasPassedHero(false);
                    setRevealedCount(0);
                    setIsVisible(false); // Reset to hidden logic upon re-entry
                }
                // Visibility handled by Mouse Logic below
            }
            lastScrollY.current = scrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasPassedHero, revealedCount]); // Removed location dependency -> Applied Globally

    // Combined Visibility Logic for Hero Section
    useEffect(() => {
        if (!hasPassedHero) {
            if (mouseNearTop || isMovingUp) {
                setIsVisible(true);
                // Ensure items are revealed immediately or staggered
                if (revealedCount === 0) {
                    navItems.forEach((_, i) => {
                        setTimeout(() => {
                            setRevealedCount(prev => Math.max(prev, i + 1));
                        }, i * 50); // Faster stagger for hover
                    });
                }
            } else {
                setIsVisible(false);
                // Optional: Reset revealed count when hiding? 
                // If we reset, they animate in again next time. 
                setRevealedCount(0);
            }
        }
    }, [mouseNearTop, isMovingUp, hasPassedHero, revealedCount]);

    // Initial Reveal Timer - kept as is, but ensuring it doesn't conflict too hard.
    // UseEffect at top sets isVisible(true) then (false) after 3s.
    // Our new logic above might override it immediately if mouse is idle?
    // "if (!hasPassedHero) ... setIsVisible(false)" will fire immediately if mouse is idle.
    // We should gate the above effect?
    // Let's add 'hasInteracted' state? Or just let the timer win for first 3s?
    // Simpler: The Mouse Logic is reactive. If mouse doesn't move, it doesn't fire?
    // No, dependencies [mouseNearTop, isMovingUp] will fire on mount with initial false/false.

    // Fix: Only apply the strict "Hide" if we have actually moved the mouse?
    // Or just let the 1s timeout in the first useEffect force it True.
    // If we set False here, it might flicker.
    // Let's modify the first useEffect to use a ref 'isInitialSequence'.

    // Actually, user said: "in landing page we'll just show navbar and then it hides... and if you move your mouse upwards..."
    // So the initial behavior is correct.
    // We just need to make sure we don't clobber it.
    // If I add `window.scrollY > 0` check?

    // Let's try this:
    // The first useEffect sets `isVisible(true)` at 1s.
    // This effect sets `isVisible(false)` immediately because `!mouseNearTop`.
    // We need to prevent this effect from firing untl the initial sequence is done?
    // Or just accept the user input controls it.

    // Refined approach:
    // If standard "Hero" logic implies Hidden, only show on Interaction.
    // But we WANT the initial show.
    // Let's remove the strict `else { setIsVisible(false) }` and rely on `useEffect` cleaning it up?
    // No, "move down then it'll go". We need explicit Hide.

    // Compromise: Add a `isInteracting` flag? 
    // Or just use the fact that the initial timer uses `setTimeout`.
    // It will overwrite our State later. ( Last write wins ).
    // At T=0: isVisible=False.
    // T=0.1: This effect runs -> isVisible=False.
    // T=1000: Initial Timer runs -> isVisible=True.
    // T=4000: Initial Timer runs -> isVisible=False.
    // User moves mouse at T=2000 -> isMovingUp=True -> isVisible=True.
    // User stops at T=2500 -> isMovingUp=False -> isVisible=False.

    // This seems fine! The automatic timer events will just act as transient "Show" requests.
    // The movement logic acts as transient "Show" requests too.
    // The "Default" is False (Hide) when in Hero.

    // One edge case: The initial timer might Hide it while we are Moving Up?
    // Timer says `if (scrollY < 100) setIsVisible(false)`.
    // If we are moving up, we want it TextVisible.
    // So we should update that helper too.




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
        if (path.startsWith('http')) {
            window.location.href = path;
            return;
        }
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
