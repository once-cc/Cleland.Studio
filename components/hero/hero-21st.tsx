'use client'

import React from 'react';
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { ArrowUpRight } from "lucide-react";

export function Hero21st() {
    return (
        <div className="w-full min-h-[100svh] md:min-h-[100vh] bg-black/[0.96] relative overflow-hidden isolation-isolate">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20 z-[1]"
                fill="white"
            />
            {/* 
              Background Render Layer (Right-Biased but Wide)
              - Detached from layout flow
              - Widened footprint (75-85%) to prevent arm clipping
              - Right-anchored to keep focus on left copy
              - Low z-index (behind text)
              - Pointer events auto (interactive scene)
            */}
            {/* 
              Layer A: Hero Copy (Background Visual Layer)
              - Z-Index: 0 (Behind Spline)
              - Editorial Rail Overlay (1280px Centered)
              - Defines the shared alignment axis for the site
              - Hero copy anchors relative to THIS rail
            */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="w-full h-full max-w-[1280px] mx-auto relative">
                    {/* 
                      Copy Authority Wrapper
                      - Anchored relative to the 1280px Rail
                      - Maintains internal gutters (left-6/12/24)
                    */}
                    <div className="absolute top-28 left-6 md:top-40 md:left-12 lg:top-48 lg:left-24 pointer-events-none">
                        <div className="pointer-events-auto max-w-2xl py-4 -my-4">
                            <h1 className="text-[48px] md:text-[72px] lg:text-[96px] font-normal font-domaine-narrow leading-[1.05] tracking-[-0.64px]">
                                Future Proo<span style={{ marginRight: '0.07em' }}>f</span>ing <br /> Business Owners
                            </h1>
                            <p className="text-xl md:text-2xl text-white/40 font-cormorant italic mt-2 tracking-wide">
                                When scale demands systems.
                            </p>

                            {/* Sub-copy Constraint Wrapper */}
                            <div className="mt-6 w-full max-w-[33vw] min-w-[280px]">
                                <p className="text-neutral-300 font-raela text-lg leading-relaxed mix-blend-difference">
                                    We engineer digital authority through rigorous system architecture and cinematic design.
                                </p>
                            </div>

                            <div className="mt-8 flex items-center gap-4">
                                <div className="group cursor-pointer flex items-center gap-2 text-gold font-syne text-xs uppercase tracking-widest font-bold">
                                    <span>Get Started</span>
                                    <ArrowUpRight className="w-4 h-4 transition-transform duration-500 ease-studio group-hover:-translate-y-1 group-hover:translate-x-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 
              Layer B: Spline Render (Foreground Visual Layer)
              - Z-Index: 10 (Visually overlays copy)
              - Right-Biased but Wide
              - Detached from layout flow
              - Widened footprint (75-85%) to prevent arm clipping
              - Pointer events auto (interactive scene)
            */}
            <div
                className="
                    absolute top-0 right-0 bottom-0 z-10 pointer-events-none
                    flex items-center justify-end
                    w-[var(--spline-w)]
                    translate-x-[var(--spline-x)]
                    md:w-[90%] md:translate-x-[30%]
                    lg:w-[85%] lg:translate-x-[15%]
                "
                style={
                    {
                        /* Mobile-only framing knobs */
                        "--spline-w": "160%",
                        "--spline-x": "88%",
                    } as React.CSSProperties
                }
            >
                <div className="w-full h-full relative pointer-events-auto">
                    <SplineScene
                        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                        className="w-full h-full"
                    />
                </div>
            </div>

            {/* Section Transition Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-studio-bg to-transparent z-20 pointer-events-none" />
        </div>
    )
}
