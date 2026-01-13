"use client";

import { useEffect, useRef } from "react";

type ParticleVariant = "embers" | "snow" | "fire" | "ash";

interface ParticleBackgroundProps {
    variant?: ParticleVariant;
    intensity?: "low" | "medium" | "high";
}

export default function ParticleBackground({
    variant = "embers",
    intensity = "medium"
}: ParticleBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;
            fadeSpeed: number;
            color: string;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.fadeSpeed = Math.random() * 0.01 + 0.002;
                this.color = "255, 69, 0"; // Default orange-red

                if (variant === "embers") {
                    this.speedY = -Math.random() * 1 - 0.2; // Float up
                    this.color = "255, 140, 0"; // Dark orange
                } else if (variant === "snow") {
                    this.speedY = Math.random() * 2 + 0.5; // Fall down
                    this.color = "255, 255, 255"; // White
                    this.size = Math.random() * 2 + 1;
                } else if (variant === "ash") {
                    this.speedY = Math.random() * 0.5 + 0.1; // Slow fall
                    this.color = "169, 169, 169"; // Grey
                } else if (variant === "fire") {
                    this.speedY = -Math.random() * 3 - 1; // Fast up
                    this.color = "255, 69, 0"; // Red-orange
                    this.size = Math.random() * 4 + 2;
                }
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.opacity -= this.fadeSpeed;

                if (this.opacity <= 0) {
                    this.reset();
                }

                // Boundary checks
                if (this.x < 0 || this.x > canvas!.width || this.y < 0 || this.y > canvas!.height) {
                    this.reset();
                }
            }

            reset() {
                if (variant === "embers" || variant === "fire") {
                    this.y = canvas!.height + 10;
                    this.x = Math.random() * canvas!.width;
                } else if (variant === "snow" || variant === "ash") {
                    this.y = -10;
                    this.x = Math.random() * canvas!.width;
                }
                this.opacity = 1;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const particleCount = intensity === "high" ? 150 : intensity === "medium" ? 80 : 40;

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [variant, intensity]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
        />
    );
}
