import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import profileshot from '../../assets/profileshot.webp';
import { Button } from '../ui/Button';

export const SystemThinking: React.FC = () => {
    const imageRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: imageRef,
        offset: ["start 0.75", "start 0.35"]
    });

    const grayscale = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

    return (
        <section
            data-section="decompression-purpose"
            className="
        relative 
        w-full 
        min-h-[100vh] 
        lg:min-h-[120vh] 
        bg-studio-bg 
        flex 
        items-center 
        py-24
      "
        >
            <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-16 px-6 w-full">
                {/* Left: Visual or Portrait placeholder */}
                <div className="hidden md:block border-l border-white/5 pl-8 self-stretch">
                    <div ref={imageRef} className="h-full w-full relative border border-white/5 bg-white/[0.02] overflow-hidden">
                        <motion.img
                            src={profileshot}
                            alt="Joshua Cleland"
                            style={{ filter: useTransform(grayscale, (v) => `grayscale(${v})`) }}
                            className="w-full h-full object-cover opacity-80"
                        />
                    </div>
                </div>

                {/* Right: Editorial Message */}
                <div className="flex flex-col justify-center text-left">
                    {/* Eyebrow */}
                    <span className="font-syne text-xs font-bold text-gold uppercase tracking-widest mb-8 block">
                        [01] — SYSTEM THINKING
                    </span>

                    {/* Primary Statement */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal font-domaine-narrow leading-[1.05] tracking-[-0.64px] mb-8">
                        Most websites fail for one reason: <span className="font-domaine-narrow italic font-normal block mt-2">the message isn’t engineered.</span>
                    </h2>

                    {/* Body */}
                    <div className="space-y-6 font-body text-lg text-ivory/70 leading-relaxed mb-12 max-w-lg">
                        <p>
                            The offer gets buried. The journey becomes unclear. Decisions compound into friction.
                        </p>
                        <p>
                            At Cleland Studio, we treat your website like a system — design, structure, and automation working together.
                        </p>
                        <p className="text-ivory">
                            Quiet. Precise. Built to convert.
                        </p>
                    </div>

                    {/* Signature */}
                    <div className="mb-12 border-l-2 border-brand-gold pl-4 py-1">
                        <p className="font-cormorant text-xl text-ivory">Joshua Cleland</p>
                        <p className="font-syne text-xs text-ivory/50 uppercase tracking-widest mt-1">Founder / Creative Director</p>
                    </div>

                    {/* CTA Strategy */}
                    <div className="flex flex-col items-start gap-6">
                        <Link to="/blueprint">
                            <Button>
                                Configure Blueprint
                            </Button>
                        </Link>

                        <span className="font-syne text-xs text-ivory/40">
                            Or explore how the system works ↓
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};
