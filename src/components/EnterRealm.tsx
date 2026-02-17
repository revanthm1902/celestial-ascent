
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';

interface EnterRealmProps {
    onEnter: () => void;
}

const EnterRealm = ({ onEnter }: EnterRealmProps) => {
    const [isExiting, setIsExiting] = useState(false);
    const [warpActive, setWarpActive] = useState(false);

    // Mouse interaction
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);


    // Velocity tracking for spin
    const mouseXVelocity = useVelocity(mouseX);
    const mouseYVelocity = useVelocity(mouseY);
    const cursorRotation = useMotionValue(0);

    // Direction tracking for spin
    const spinDirection = useRef(1); // 1 for clockwise, -1 for counter-clockwise

    // Time-based animation frame for continuous spin + velocity boost
    useAnimationFrame((time, delta) => {
        const baseSpeed = 1; // Base rotation speed
        const velocityFactor = 0.05; // How much mouse speed affects rotation

        const xVel = mouseXVelocity.get();
        const yVel = mouseYVelocity.get();

        // Update direction based on x velocity
        if (xVel > 0.5) spinDirection.current = 1;
        if (xVel < -0.5) spinDirection.current = -1;

        // Calculate speed from velocity vectors
        const speed = Math.sqrt(Math.pow(xVel, 2) + Math.pow(yVel, 2));

        // Add to rotation
        const newRotation = cursorRotation.get() + (baseSpeed + speed * velocityFactor) * spinDirection.current * (delta / 16);
        cursorRotation.set(newRotation);
    });

    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        // Inject global style to force hide cursor
        const style = document.createElement('style');
        style.innerHTML = '* { cursor: none !important; }';
        document.head.appendChild(style);

        const handleMouseMove = (e: MouseEvent) => {
            // Direct 1:1 tracking
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
        };
    }, [mouseX, mouseY]);

    const handleEnter = async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            }
        } catch (err) {
            console.error("Error fullscreen:", err);
        }
        setWarpActive(true);
        setTimeout(() => {
            setIsExiting(true);
            setTimeout(onEnter, 800);
        }, 2000);
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden cursor-none"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >

            {/* Dynamic Cursor - Electric Amber Reticle */}
            {/* Dynamic Cursor - Electric Amber Reticle - Rendered via Portal to ensure top z-index */}
            {createPortal(
                <motion.div
                    className="fixed top-0 left-0 pointer-events-none z-[9999]"
                    style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
                >
                    <div className="relative w-12 h-12 flex items-center justify-center">
                        {/* Center Dot */}
                        <div className="w-1.5 h-1.5 bg-[#FFD700] rounded-full shadow-[0_0_10px_#FFD700]" />
                        {/* Rotating Bracket */}
                        <motion.div
                            className="absolute border border-[#FFD700]/80 rounded-full w-full h-full"
                            style={{ rotate: cursorRotation, borderTopColor: 'transparent', borderBottomColor: 'transparent', borderWidth: '2px' }}
                        />
                        {/* Inner Ring */}
                        <div className="absolute w-6 h-6 border border-white/40 rounded-full" />
                    </div>
                </motion.div>,
                document.body
            )}

            {/* HUD Elements */}
            <div className="absolute inset-0 pointer-events-none z-20 p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="text-[#FFD700]/60 font-mono text-xs tracking-widest">
                        SYS.READY<br />INIT.SEQUENCE
                    </div>
                    <div className="text-[#FFD700]/60 font-mono text-xs tracking-widest text-right">
                        COORDS: [null, null]<br />TARGET: VOID
                    </div>
                </div>
                <div className="flex justify-between items-end">
                    <div className="w-32 h-[1px] bg-[#FFD700]/30 relative">
                        <div className="absolute right-0 bottom-0 w-2 h-2 bg-[#FFD700]/60" />
                    </div>
                    <div className="flex gap-2 text-[#FFD700]/60 font-mono text-xs">
                        <span>CPU: NORMAL</span>
                        <span>MEM: STABLE</span>
                    </div>
                </div>
            </div>

            {/* Warp Tunnel & Vignette Background */}
            <motion.div
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/30 via-black/80 to-black"
                animate={{
                    scale: warpActive ? [1, 2, 30] : [1, 1.1, 1],
                    opacity: warpActive ? [1, 0.5, 0] : 1
                }}
                transition={{
                    scale: { duration: warpActive ? 2 : 10, repeat: warpActive ? 0 : Infinity, ease: warpActive ? "circIn" : "easeInOut" },
                    opacity: { duration: 2 }
                }}
            />

            {/* Rotating Runes */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                {[600, 900, 1200].map((size, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full border border-[#FFD700]/20 mask-image:radial-gradient(transparent, black)"
                        style={{ width: size, height: size, maskImage: 'radial-gradient(transparent 40%, black 100%)' }}
                        animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                        transition={{ duration: 60 + i * 20, repeat: Infinity, ease: "linear" }}
                    >
                        {[0, 90, 180, 270].map((deg) => (
                            <div
                                key={deg}
                                className="absolute w-1.5 h-1.5 bg-[#FFD700]/50 rounded-full"
                                style={{
                                    top: '50%', left: '50%',
                                    transform: `rotate(${deg}deg) translate(${size / 2}px) translate(-50 %, -50 %)`
                                }}
                            />
                        ))}
                    </motion.div>
                ))}
            </div>

            {/* Floating Particles - Varied Opacity for Depth */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(150)].map((_, i) => {
                    const depth = Math.random(); // 0 to 1
                    return (
                        <motion.div
                            key={i}
                            className="absolute bg-[#FFD700] rounded-full"
                            initial={{
                                x: Math.random() * window.innerWidth,
                                y: Math.random() * window.innerHeight,
                                scale: Math.random() * 0.5 + 0.5
                            }}
                            animate={warpActive ? {
                                scale: [1, 0],
                                opacity: 0,
                                x: window.innerWidth / 2,
                                y: window.innerHeight / 2
                            } : {
                                y: [0, -50 * Math.random(), 0],
                                opacity: [depth * 0.2, depth * 0.8, depth * 0.2], // Twinkle based on depth
                            }}
                            transition={{
                                duration: 3 + Math.random() * 7,
                                repeat: warpActive ? 0 : Infinity,
                                ease: "easeInOut",
                                delay: Math.random() * 5
                            }}
                            style={{
                                width: depth > 0.8 ? 3 : 1.5,
                                height: depth > 0.8 ? 3 : 1.5,
                                zIndex: depth > 0.8 ? 20 : 1
                            }}
                        />
                    );
                })}
            </div>

            {/* Main Content */}
            <motion.div
                className="relative z-10 text-center space-y-12 p-12"
                animate={warpActive ? { scale: 5, opacity: 0, filter: "blur(20px)" } : { scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            >
                <div className="relative group cursor-default">
                    <motion.h1
                        className="text-6xl md:text-9xl font-body font-black text-white tracking-[0.2em] relative z-10 uppercase"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        style={{ textShadow: '0 0 50px rgba(255,255,255,0.2)' }}
                    >
                        ARYVERSE
                    </motion.h1>

                    {/* Tagline - Wide Tracking, White 70% */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="w-full flex justify-between px-2 mt-6"
                    >
                        
                    </motion.div>

                    {/* Glow Behind Title */}
                    <motion.div
                        className="absolute -inset-20 bg-white/5 blur-[100px] rounded-full -z-10"
                        animate={{ opacity: [0.1, 0.3, 0.1], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="relative inline-block mt-12"
                >
                    {/* Solid Fill High-Contrast Button */}
                    <button
                        ref={buttonRef}
                        onClick={handleEnter}
                        className="relative group cursor-none overflow-hidden rounded-sm transition-transform duration-300 hover:scale-105"
                    >
                        {/* Box Shadow Glow */}
                        <div className="absolute inset-0 rounded-sm transition-opacity duration-300 opacity-60 group-hover:opacity-100"
                            style={{ boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)' }}
                        />

                        <div className="relative px-24 py-6 bg-[#FFD700] border-2 border-[#FFD700] group-hover:bg-white group-hover:border-white transition-colors duration-300">

                            <span className="relative z-10 font-body font-black text-xl text-black tracking-[0.2em] uppercase transition-colors duration-300">
                                Enter The Realm
                            </span>

                            {/* Shine Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shine" />
                        </div>
                    </button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default EnterRealm;
