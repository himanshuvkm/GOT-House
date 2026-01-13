"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LandingScreen from "./screens/LandingScreen";
import QuizScreen from "./screens/QuizScreen";
import AnalysisScreen from "./screens/AnalysisScreen";
import HouseRevealScreen from "./screens/HouseRevealScreen";
import ParticleBackground from "./ui/ParticleBackground";
import { HouseId } from "@/lib/houses";
import { Option } from "@/lib/quiz-data";

import BackgroundMusic from "./ui/BackgroundMusic";

export type ScreenState = "LANDING" | "QUIZ" | "ANALYSIS" | "REVEAL";

export default function QuizContainer() {
    const [currentScreen, setCurrentScreen] = useState<ScreenState>("LANDING");
    const [answers, setAnswers] = useState<Option[]>([]);
    const [house, setHouse] = useState<HouseId | null>(null);

    const handleStart = () => {
        setCurrentScreen("QUIZ");
    };

    const handleQuizComplete = (userAnswers: Option[]) => {
        setAnswers(userAnswers);
        setCurrentScreen("ANALYSIS");
    };

    const handleAnalysisComplete = (assignedHouse: HouseId) => {
        setHouse(assignedHouse);
        setCurrentScreen("REVEAL");
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-got-black text-got-text flex flex-col items-center justify-center">
            <BackgroundMusic />
            <ParticleBackground variant={currentScreen === "REVEAL" && house === 'stark' ? "snow" : currentScreen === "REVEAL" && house === 'targaryen' ? "fire" : "embers"} />

            <AnimatePresence mode="wait">
                {currentScreen === "LANDING" && (
                    <LandingScreen key="landing" onStart={handleStart} />
                )}

                {currentScreen === "QUIZ" && (
                    <QuizScreen key="quiz" onComplete={handleQuizComplete} />
                )}

                {currentScreen === "ANALYSIS" && (
                    <AnalysisScreen key="analysis" answers={answers} onComplete={handleAnalysisComplete} />
                )}

                {currentScreen === "REVEAL" && house && (
                    <HouseRevealScreen key="reveal" houseId={house} />
                )}
            </AnimatePresence>
        </div>
    );
}
