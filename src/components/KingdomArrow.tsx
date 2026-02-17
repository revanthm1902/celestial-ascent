import { motion } from 'framer-motion';

interface KingdomArrowProps {
    direction: 'rtl' | 'ltr';
    className?: string;
}

const KingdomArrow = ({ direction, className = '' }: KingdomArrowProps) => {
    const isRTL = direction === 'rtl';

    // Improved Arrow Design: Large, Sweeping S-Curve to connect text blocks across the screen.
    // RTL (Right-Text to Left-Text): Starts Top-Right, Sweeps Left and Down to Bottom-Left.
    // LTR (Left-Text to Right-Text): Starts Top-Left, Sweeps Right and Down to Bottom-Right.

    // Path Logic:
    // Canvas: 400x200 (Wider aspect ratio)
    // RTL: Start (350, 20) -> Control Point 1 (350, 100) -> Control Point 2 (50, 100) -> End (50, 180)
    // LTR: Start (50, 20) -> Control Point 1 (50, 100) -> Control Point 2 (350, 100) -> End (350, 180)

    const pathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 2,
                ease: "easeInOut",
                delay: 0.2
            }
        }
    };

    return (
        <div className={`relative pointer-events-none w-full h-full ${className}`}>
            <motion.svg
                viewBox="0 0 400 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }} // Repeat animation when scrolling
                preserveAspectRatio="none"
            >
                {isRTL ? (
                    // Right to Left Arrow
                    <>
                        <motion.path
                            d="M 320 20 C 320 120, 80 80, 80 180"
                            stroke="url(#arrow-gradient)"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray="20 20"
                            fill="none"
                            variants={pathVariants}
                        />
                        {/* Arrow Head */}
                        <motion.path
                            d="M 60 165 L 80 180 L 100 165"
                            stroke="url(#arrow-gradient)"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            variants={pathVariants}
                        />
                    </>
                ) : (
                    // Left to Right Arrow
                    <>
                        <motion.path
                            d="M 80 20 C 80 120, 320 80, 320 180"
                            stroke="url(#arrow-gradient)"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray="20 20"
                            fill="none"
                            variants={pathVariants}
                        />
                        {/* Arrow Head */}
                        <motion.path
                            d="M 300 165 L 320 180 L 340 165"
                            stroke="url(#arrow-gradient)"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            variants={pathVariants}
                        />
                    </>
                )}

                <defs>
                    <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFD700" stopOpacity="0.1" />
                        <stop offset="50%" stopColor="#FFD700" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#FFD700" stopOpacity="1" />
                    </linearGradient>
                </defs>
            </motion.svg>
        </div>
    );
};

export default KingdomArrow;
