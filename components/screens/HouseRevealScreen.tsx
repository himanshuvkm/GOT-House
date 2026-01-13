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
  const [downloadStatus, setDownloadStatus] = useState<
    "idle" | "generating" | "done"
  >("idle");

const handleShare = async () => {
  const file = await generateImage();
  if (!file) return;

  const text = `I belong to ${house.name}. "${house.quote}" 🐉 #HouseTrial`;

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({
      files: [file],
      text,
      title: "My House of Westeros"
    });
  } else {
    // fallback: download + tweet
    const url = "https://your-deployment-url.com";
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  }
};


const generateImage = async (): Promise<File | null> => {
  if (!cardRef.current) return null;

  const canvas = await html2canvas(cardRef.current, {
    scale: 2,
    backgroundColor: "#000",
    useCORS: true
  });

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/png")
  );

  if (!blob) return null;

  return new File([blob], `house-${houseId}.png`, { type: "image/png" });
};
const handleDownload = async () => {
  setDownloadStatus("generating");

  try {
    const file = await generateImage();
    if (!file) return;

    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadStatus("done");
    setTimeout(() => setDownloadStatus("idle"), 2000);
  } catch (e) {
    console.error(e);
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
         className="text-got-crimson font-heading tracking-[0.2em] text-md md:text-lg mb-6 uppercase"
            >
        You belong to
      </motion.p>

      {/* Main Reveal Card (This is what gets captured) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl w-full mb-16"
      >
        {/* LEFT — CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
          className="flex justify-center"
        >
          <div
            ref={cardRef}
            className="relative w-[420px] h-[620px] flex items-center justify-center overflow-hidden rounded-xl bg-black"
          >
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-[85%] max-w-[340px] h-full aspect-square mb-8 drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                <img
                  src={house.sigil}
                  alt={house.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT — TEXT + ACTION */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="flex flex-col justify-center"
        >

          <h1 className="font-heading text-6xl text-[#D4AF37] mb-6">
            {house.name}
          </h1>

          <p className="text-2xl italic text-stone-300 mb-6 max-w-lg">
            "{house.quote}"
          </p>

          <p className="text-stone-400 max-w-lg leading-relaxed mb-10">
            {house.description}
          </p>

          <div className="flex gap-4">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-8 py-4 border border-[#1DA1F2] text-[#1DA1F2] hover:bg-[#1DA1F2]/20 uppercase tracking-widest"
            >
              <Share2 size={18} />
              Share
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-8 py-4 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/20 uppercase tracking-widest"
            >
              <Download size={18} />
              Save Card
            </button>
           
          </div>
        </motion.div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="flex gap-4"
      ></motion.div>
    </div>
  );
}
