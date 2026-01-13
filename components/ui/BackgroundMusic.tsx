"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        // Attempt autoplay on mount
        const playAudio = async () => {
            if (audioRef.current) {
                try {
                    audioRef.current.volume = 0.3; // Lower volume for background
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (err) {
                    console.log("Autoplay prevented. User interaction required.");
                }
            }
        };

        playAudio();

        // Fallback: Play on first interaction if autoplay blocked
        const handleInteraction = () => {
            if (audioRef.current && audioRef.current.paused) {
                audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
            }
            window.removeEventListener('click', handleInteraction);
        };

        window.addEventListener('click', handleInteraction);
        return () => window.removeEventListener('click', handleInteraction);
    }, []);

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <audio ref={audioRef} loop src="/theme.mp3" />
            <button
                onClick={toggleMute}
                className="p-3 bg-got-black/50 border border-got-gold rounded-full text-got-gold hover:bg-got-gold hover:text-black transition-colors backdrop-blur-sm"
            >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
        </div>
    );
}
