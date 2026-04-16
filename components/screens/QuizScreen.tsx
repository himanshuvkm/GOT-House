"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions, Option } from "@/lib/quiz-data";
import { CopySlash } from "lucide-react"; // Using this as a placeholder for a sword/slash icon if needed

interface QuizScreenProps {
    onComplete: (answers: Option[]) => void;
}

export default function QuizScreen({ onComplete }: QuizScreenProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Option[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const currentQuestion = questions[currentIndex];

    const handleOptionSelect = (option: Option) => {
        if (selectedId) return; // Prevent double clicks
        setSelectedId(option.id);

        // Play sound effect here if implemented

        // Delay for animation
        setTimeout(() => {
            const newAnswers = [...answers, option];
            setAnswers(newAnswers);
            setSelectedId(null);

            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                onComplete(newAnswers);
            }
        }, 1200);
    };

    return (
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center min-h-[80vh]">
            {/* Progress Indicator */}
            <div className="absolute top-0 left-0 w-full flex justify-center gap-2 mb-12">
                {questions.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-1 w-12 rounded-full transition-all duration-500 ${idx <= currentIndex ? "bg-got-gold" : "bg-got-grey"
                            }`}
                    />
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="w-full flex flex-col items-center"
                >
                    <h2 className="font-heading text-3xl md:text-5xl text-center text-got-text mb-16 leading-tight drop-shadow-md">
                        {currentQuestion.question}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                        {currentQuestion.options.map((option) => (
                            <motion.button
                                key={option.id}
                                onClick={() => handleOptionSelect(option)}
                                whileHover={{ scale: 1.02, borderColor: "#D4AF37" }}
                                whileTap={{ scale: 0.98 }}
                                className={`relative group h-full min-h-[160px] p-8 border-2 flex items-center justify-center text-center transition-all duration-300 z-10 overflow-hidden
                  ${selectedId === option.id
                                        ? "border-got-gold bg-got-gold/10 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                                        : "border-got-grey bg-got-black/50 hover:bg-got-grey/30 hover:border-got-gold/50"
                                    }
                `}
                            >
                                {/* Decoration Lines */}
                                <span className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-current opacity-30 group-hover:opacity-100 transition-opacity" />
                                <span className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-current opacity-30 group-hover:opacity-100 transition-opacity" />

                                <span className={`font-body text-xl md:text-2xl transition-all duration-300 relative z-20 ${selectedId === option.id ? "text-got-gold font-bold scale-105 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" : "text-stone-300 group-hover:text-got-gold"}`}>
                                    {option.text}
                                </span>

                                {/* Elegant Gold Selection Animation */}
                                {selectedId === option.id && (
                                    <>
                                        <motion.div
                                            initial={{ scaleX: 0, opacity: 0 }}
                                            animate={{ scaleX: 1, opacity: 1 }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                            className="absolute top-0 left-0 right-0 h-1 bg-got-gold shadow-[0_0_15px_rgba(212,175,55,1)] pointer-events-none"
                                        />
                                        <motion.div
                                            initial={{ scaleX: 0, opacity: 0 }}
                                            animate={{ scaleX: 1, opacity: 1 }}
                                            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                                            className="absolute bottom-0 left-0 right-0 h-1 bg-got-gold shadow-[0_0_15px_rgba(212,175,55,1)] pointer-events-none"
                                        />
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0.6 }}
                                            animate={{ scale: 2, opacity: 0 }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                            className="absolute inset-0 bg-got-gold/30 rounded-lg pointer-events-none"
                                        />
                                    </>
                                )}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
