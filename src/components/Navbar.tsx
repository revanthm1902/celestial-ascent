import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();
    const backgroundOpacity = useTransform(scrollY, [0, 50], [0, 1]);

    // Update scrolled state for other style changes if needed
    useEffect(() => {
        const updateScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', updateScroll);
        return () => window.removeEventListener('scroll', updateScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navLinks = [
        { name: 'Kingdom of Learning', id: 'kingdom-learning' },
        { name: 'Kingdom of Ranking', id: 'kingdom-ranking' },
        { name: 'Kingdom of Gaming', id: 'kingdom-gaming' },
    ];

    return (
        <motion.nav
            style={{
                backgroundColor: useTransform(
                    scrollY,
                    [0, 50],
                    ['rgba(2, 4, 8, 0)', 'rgba(2, 4, 8, 0.8)']
                ),
                backdropFilter: useTransform(
                    scrollY,
                    [0, 50],
                    ['blur(0px)', 'blur(12px)']
                ),
                borderBottom: useTransform(
                    scrollY,
                    [0, 50],
                    ['1px solid transparent', '1px solid rgba(255, 215, 0, 0.1)']
                )
            }}
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 flex items-center"
        >
            <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-24 flex justify-between items-center">
                {/* Logo / Home */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-xl font-display font-bold text-stardust tracking-widest hover:text-gold transition-colors"
                >
                    ARYVERSE
                </button>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => scrollToSection(link.id)}
                            className="text-sm font-medium tracking-wider text-muted-foreground hover:text-gold transition-colors uppercase font-body"
                        >
                            {link.name}
                        </button>
                    ))}
                </div>

                {/* Mobile Menu Placeholder (Not needed for strict mobile restriction, but good for Tablet/Small Laptops) */}
            </div>
        </motion.nav>
    );
};

export default Navbar;
