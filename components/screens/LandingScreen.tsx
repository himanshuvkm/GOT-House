"use client";

import { motion } from "framer-motion";

interface LandingScreenProps {
    onStart: () => void;
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5 }}
            className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto"
        >
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-got-crimson font-heading tracking-[0.2em] text-sm md:text-lg mb-6 uppercase"
            >
                Valar Dohaeris
            </motion.p>

            <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
                className="font-heading text-4xl md:text-7xl lg:text-8xl text-got-gold mb-8 drop-shadow-[0_4px_10px_rgba(212,175,55,0.3)]"
            >
                The House Trial
            </motion.h1>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="space-y-4 mb-12"
            >
                <p className="font-body text-xl md:text-2xl text-stone-400 italic">
                    "In Westeros, blood decides nothing."
                </p>
                <p className="font-body text-xl md:text-2xl text-stone-300">
                    Your choices decide everything.
                </p>
            </motion.div>

            <motion.button
                onClick={onStart}
                whileHover={{ scale: 1.05, textShadow: "0 0 8px rgb(212,175,55)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-transparent border border-got-gold text-got-gold font-heading text-xl uppercase tracking-widest overflow-hidden transition-all duration-300 hover:bg-got-gold/10"
            >
                <span className="relative z-10">Begin the Trial</span>
                <div className="absolute inset-0 bg-got-gold/5 blur-md -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
        </motion.div>
    );
}
