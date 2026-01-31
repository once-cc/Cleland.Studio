'use client'

import React from 'react';
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { ArrowUpRight } from "lucide-react";

export function Hero21st() {
    // Mobile Spline Compositional Tuning (Single Source of Truth)
    // Adjust these to fine-tune mobile float position and presence:
    const MOBILE_SPLINE_TRANSLATE_X = '45%';  // horizontal push (right) — adjust for more/less silhouette
    const MOBILE_SPLINE_TRANSLATE_Y = '12%';  // vertical float (down) — tune alignment with headline
    const MOBILE_SPLINE_SCALE = 0.8;          // size restraint — adjust presence without clipping

    // Tablet Spline Compositional Tuning (md breakpoint — natural expansion from mobile)
    // Lighter transforms: robot regains presence but stays secondary to copy
    const TABLET_SPLINE_TRANSLATE_X = '26%';  // tighter relationship with copy (hugs closer)
    const TABLET_SPLINE_TRANSLATE_Y = '5%';   // subtle float — head sits to right of headline
    const TABLET_SPLINE_SCALE = 0.9;          // larger presence — balanced, not competing


    return (
        <div className="w-full min-h-[100svh] md:min-h-[100vh] bg-black/[0.96] relative overflow-hidden isolation-isolate">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20 z-[1]"
                fill="white"
            />
            {/* 
              Layer A: Hero Copy (Elevated to z-20)
              - Z-Index: 20 (ALWAYS above Spline on mobile)
              - Editorial Rail Overlay (1280px Centered)
              - Defines the shared alignment axis for the site
              - Copy authority guaranteed — never obstructed
            */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="w-full h-full max-w-[1280px] mx-auto relative">
                    {/* 
                      Copy Authority Wrapper
                      - Anchored relative to the 1280px Rail
                      - Maintains internal gutters (left-6/12/24)
                    */}
                    <div className="absolute top-28 left-6 md:top-40 md:left-12 lg:top-48 lg:left-24 xl:top-[calc(12rem-10vh)] pointer-events-none">
                        <div className="pointer-events-auto max-w-2xl py-4 -my-4">
                            <h1 className="text-[48px] md:text-[72px] lg:text-[96px] font-normal font-domaine-narrow leading-[1.05] tracking-[-0.64px]">
                                Future Proo<span style={{ marginRight: '0.07em' }}>f</span>ing <br /> Business Owners
                            </h1>
                            <p className="text-xl md:text-2xl text-white/40 font-cormorant italic mt-2 tracking-wide">
                                When scale demands systems.
                            </p>

                            {/* Sub-copy Constraint Wrapper */}
                            <div className="mt-6 max-w-[32ch]">
                                <p className="text-neutral-300 font-raela text-lg leading-[1.55] md:leading-relaxed mix-blend-difference">
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
              Layer B: Spline Render (Right-Anchored, Mobile-First)
              - Z-Index: 10 (Under copy layer)
              - Right-edge anchored (NOT centered) — justify-end
              - Vertically centered (NOT bottom-anchored) — items-center
              - Oversized render space with off-canvas breathing room at all breakpoints
              - Mobile/sm: 175-160% (tight, intentional constraint)
              - Tablet (md): 120% (overscan for spatial freedom)
              - Desktop (lg+): 120-130% (cinematic overscan, no edge pressure)
              - Inner wrapper controls mobile/tablet float position via CSS variables
              - Desktop (lg+): Layout-based positioning (transform: none, no masks)
              - Pointer events: Disabled on mobile (smooth scroll), enabled md+
            */}
            <div
                className="
                    absolute top-0 right-0
                    w-[175%] sm:w-[160%] md:w-[120%] lg:w-[135%] xl:w-[150%]
                    h-full
                    z-10
                    flex items-center justify-end
                    pointer-events-none md:pointer-events-auto
                    overflow-visible
                    lg:ml-[8vw] xl:ml-[10vw]
                "
            >
                <div
                    className="heroSplineInner relative w-full h-full"
                    style={{
                        // Mobile: CSS variable-based transforms
                        '--sx': MOBILE_SPLINE_TRANSLATE_X,
                        '--sy': MOBILE_SPLINE_TRANSLATE_Y,
                        '--ss': MOBILE_SPLINE_SCALE,

                        // Tablet (md): Lighter transforms for natural expansion
                        '--sx-md': TABLET_SPLINE_TRANSLATE_X,
                        '--sy-md': TABLET_SPLINE_TRANSLATE_Y,
                        '--ss-md': TABLET_SPLINE_SCALE,

                        // Mobile: 4-stop feathered mask (solid 82-88%, feather 95-99%)
                        // Prevents premature shoulder/arm fade, protects copy lane
                        // Tablet (md+): Soft insurance mask via global CSS
                        // Desktop (lg+): Fully removed via global CSS
                        WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 82%, rgba(0,0,0,1) 88%, rgba(0,0,0,0.25) 95%, rgba(0,0,0,0) 99%)",
                        maskImage: "linear-gradient(to left, rgba(0,0,0,1) 82%, rgba(0,0,0,1) 88%, rgba(0,0,0,0.25) 95%, rgba(0,0,0,0) 99%)",
                    } as React.CSSProperties}
                >
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
