"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Option } from "@/lib/quiz-data";
import { HouseId } from "@/lib/houses";
import { Loader2 } from "lucide-react";

interface AnalysisScreenProps {
    answers: Option[];
    onComplete: (house: HouseId) => void;
}

// HARDCODED KEY PROVIDED BY USER - DO NOT SHARE PUBLICLY IN REAL PROD
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export default function AnalysisScreen({ answers, onComplete }: AnalysisScreenProps) {
    const [status, setStatus] = useState("Consulting the Maesters...");

    useEffect(() => {
        analyzeResults(GEMINI_API_KEY);
    }, []);

    const analyzeResults = async (key: string) => {
        try {
            setStatus("Reading the flames...");
            const genAI = new GoogleGenerativeAI(key);
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });

            const prompt = `
        Analyze the following 5 answers from a personality test and assign them to one of these Game of Thrones Houses: 
        stark, lannister, targaryen, tyrell, baratheon, greyjoy.
        
        Answers:
        ${answers.map((a, i) => `${i + 1}. ${a.text}`).join("\n")}
        
        Consider the psychological profile:
        Stark: Honor, loyalty, moral consistency.
        Lannister: Control, ambition, pragmatism.
        Targaryen: Destiny, intensity, extremes.
        Tyrell: Diplomacy, subtle manipulation.
        Baratheon: Impulse, boldness, strength.
        Greyjoy: Independence, self-reliance.

        Return ONLY the house ID in lowercase. Nothing else.
      `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text().trim().toLowerCase();

            // Validate response
            const validHouses: HouseId[] = ['stark', 'lannister', 'targaryen', 'tyrell', 'baratheon', 'greyjoy'];
            const house = validHouses.find(h => text.includes(h)) || 'stark'; // Default to Stark if unclear

            // Artificial delay for dramatic effect
            setTimeout(() => {
                onComplete(house as HouseId);
            }, 2000);

        } catch (error) {
            console.error("Analysis failed:", error);
            setStatus("The flames are unclear...");
            // Fallback: Random for now to not block flow if API fails
            setTimeout(() => {
                const fallbackHouses: HouseId[] = ['stark', 'lannister', 'targaryen'];
                onComplete(fallbackHouses[Math.floor(Math.random() * fallbackHouses.length)]);
            }, 2000);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-md mx-auto w-full flex flex-col items-center justify-center text-center p-6"
        >
            <div className="flex flex-col items-center">
                {/* Mystic Circle Animation */}
                <div className="relative mb-12">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="w-32 h-32 border-4 border-dashed border-got-gold rounded-full opacity-30"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-32 h-32 border-2 border-dotted border-got-crimson rounded-full opacity-50 scale-75"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-got-gold animate-spin" />
                    </div>
                </div>

                <motion.p
                    key={status}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-heading text-xl text-got-gold tracking-widest uppercase"
                >
                    {status}
                </motion.p>
            </div>
        </motion.div>
    );
}
