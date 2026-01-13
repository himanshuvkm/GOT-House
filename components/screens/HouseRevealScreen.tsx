"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { houses, HouseId } from "@/lib/houses";
import { Download, Share2 } from "lucide-react";
import html2canvas from "html2canvas";

interface HouseRevealScreenProps {
    houseId: HouseId;
}

export default function HouseRevealScreen({ houseId }: HouseRevealScreenProps) {
    const house = houses[houseId];
    const cardRef = useRef<HTMLDivElement>(null);
    const [downloadStatus, setDownloadStatus] = useState<"idle" | "generating" | "done">("idle");

    const handleShare = () => {
        const text = `I belong to ${house.name}. "${house.quote}" What House would rule you? 🐉 #GameOfThrones #HouseTrial`;
        const url = "https://your-deployment-url.com"; // Replace with actual URL
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    const handleDownload = async () => {
        if (!cardRef.current) return;
        setDownloadStatus("generating");

        try {
            const canvas = await html2canvas(cardRef.current, {
                scale: 2,
                backgroundColor: "#1a1a1a", // Force dark background color
                useCORS: true // Important for external images if any
            });

            const image = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = image;
            link.download = `my-house-${houseId}.png`;
            link.click();
            setDownloadStatus("done");
            setTimeout(() => setDownloadStatus("idle"), 2000);
        } catch (err) {
            console.error("Failed to generate card", err);
            setDownloadStatus("idle");
        }
    };

    return (
        <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center p-4">

            {/* Introduction */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="font-heading text-xl text-stone-400 mb-8 uppercase tracking-widest"
            >
                You belong to
            </motion.p>

            {/* Main Reveal Card (This is what gets captured) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8, type: "spring" }}
                className="relative group mb-12"
            >
                <div
                    ref={cardRef}
                    className="w-[350px] md:w-[400px] bg-[#1a1a1a] border-2 border-[#D4AF37] p-8 flex flex-col items-center text-center shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden"
                    style={{
                        backgroundImage: `url("https://www.transparenttextures.com/patterns/black-linen.png")`, // Optional paper texture
                    }}
                >
                    {/* Decorative Corners */}
                    <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]" />
                    <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]" />
                    <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]" />
                    <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]" />

                    {/* Sigil */}
                    <div className="w-48 h-48 mb-6 relative z-10 drop-shadow-2xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={house.sigil}
                            alt={`${house.name} Sigil`}
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <h2 className="font-heading text-3xl text-[#D4AF37] mb-2 uppercase tracking-wide">
                        {house.name}
                    </h2>

                    <div className="w-16 h-1 bg-[#8B0000] mb-6" />

                    <p className="font-heading text-xl text-stone-300 italic mb-6">
                        "{house.quote}"
                    </p>

                    <p className="font-body text-stone-400 text-sm leading-relaxed">
                        {house.description}
                    </p>

                    {/* Footer for the card */}
                    <div className="mt-8 pt-4 border-t border-stone-800 w-full">
                        <p className="text-[#D4AF37] text-xs font-heading tracking-[0.2em] uppercase">
                            Game of Thrones House Trial
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="flex gap-4"
            >
                <div className="flex flex-col items-center gap-2">
                    <button
                        onClick={handleShare}
                        className="flex items-center gap-2 px-6 py-3 bg-[#1DA1F2]/20 border border-[#1DA1F2] text-[#1DA1F2] hover:bg-[#1DA1F2]/30 transition-colors uppercase font-heading text-sm tracking-wider"
                    >
                        <Share2 size={18} />
                        Share Result
                    </button>
                    <span className="text-[10px] text-stone-500 uppercase tracking-widest">(Text Only)</span>
                </div>

                <button
                    onClick={handleDownload}
                    disabled={downloadStatus === 'generating'}
                    className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/30 transition-colors uppercase font-heading text-sm tracking-wider"
                >
                    <Download size={18} />
                    {downloadStatus === 'generating' ? 'Forging...' : downloadStatus === 'done' ? 'Saved' : 'Save Card'}
                </button>
            </motion.div>

        </div>
    );
}
