import React from 'react';
import { motion, Variants } from "framer-motion";
import { Circle, Play, FileText } from "lucide-react";
import { cn } from "../lib/utils";

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-blue-400/[0.08]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-blue-400/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(96,165,250,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(96,165,250,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

export function HeroGeometric({
    badge = "Autonomous AI for Understanding Your Data",
    title1 = "Exploratory Data Analysis Agent",
    title2 = "Autonomous AI for Understanding Your Data",
    onChatClick,
}: {
    badge?: string;
    title1?: string;
    title2?: string;
    onChatClick?: () => void;
}) {
    const fadeUpVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
            },
        }),
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a1628]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.08] via-transparent to-blue-800/[0.08] blur-3xl" />

            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-blue-400/[0.15]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />
                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-blue-500/[0.15]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />
                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-blue-300/[0.15]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />
                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-blue-600/[0.15]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />
                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-blue-400/[0.15]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/[0.08] border border-blue-400/[0.2] mb-6 md:mb-10"
                    >
                        <Circle className="h-2 w-2 fill-blue-400/80" />
                        <span className="text-xs font-semibold text-blue-200/80 tracking-[0.1em] uppercase">
                            {badge}
                        </span>
                    </motion.div>

                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 md:mb-8 tracking-tight leading-[1.1]">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-100/80">
                                {title1}
                            </span>
                            <br />
                            <span
                                className={cn(
                                    "bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white/90 to-blue-300"
                                )}
                            >
                                {title2}
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className="text-sm sm:text-base md:text-lg text-blue-100/60 mb-10 leading-relaxed font-normal tracking-tight max-w-2xl mx-auto px-4">
                            Upload your dataset. Ask a question. Get instant insights, visuals, and explanations — without manual EDA.
                            <br />
                            <span className="text-blue-200/70 font-medium">From raw data to clarity in minutes.</span>
                        </p>
                    </motion.div>

                    <motion.div
                        custom={3}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
                    >
                        <button 
                            onClick={onChatClick}
                            className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#0a1628] font-bold rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group text-sm shadow-xl shadow-blue-500/20"
                        >
                            Get Started
                            <Play className="w-4 h-4 fill-[#0a1628] group-hover:translate-x-0.5 transition-transform" />
                        </button>
                        <button 
                            className="w-full sm:w-auto px-8 py-3.5 bg-blue-500/10 text-white font-bold rounded-xl hover:bg-blue-500/20 border border-blue-400/20 transition-all flex items-center justify-center gap-2 group text-sm"
                        >
                            View Docs
                            <FileText className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-[#0a1628]/80 pointer-events-none" />
        </div>
    );
}