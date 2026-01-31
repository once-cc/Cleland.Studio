import React from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';

interface InfiniteCarouselRowProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    speedPxPerSec: number;
    direction?: 'left' | 'right';
    className?: string;
    slowDownOnHover?: boolean;
}

export function InfiniteCarouselRow<T>({
    items,
    renderItem,
    speedPxPerSec,
    direction = 'left',
    className,
    slowDownOnHover = true,
}: InfiniteCarouselRowProps<T>) {
    const x = useMotionValue(0);
    const trackRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Duplicate items for seamless loop
    const loopItems = [...items, ...items];

    // Initialize position for right-moving rows BEFORE paint
    useLayoutEffect(() => {
        if (direction === 'right' && trackRef.current && !isInitialized) {
            const trackWidth = trackRef.current.scrollWidth / 2;
            // Start at -trackWidth so content is visible and moves right toward 0
            x.set(-trackWidth);
            setIsInitialized(true);
        } else if (direction === 'left' && !isInitialized) {
            setIsInitialized(true);
        }
    }, [direction, x, isInitialized]);

    useEffect(() => {
        // Don't start animation until initialized
        if (!isInitialized) return;

        let rafId: number;
        let lastTime = performance.now();

        function tick(now: number) {
            const delta = now - lastTime;
            lastTime = now;

            if (!isDragging && trackRef.current) {
                const trackWidth = trackRef.current.scrollWidth / 2;
                const directionFactor = direction === 'left' ? -1 : 1;

                // Apply hover slowdown (30% speed) if enabled
                const effectiveSpeed = (isHovering && slowDownOnHover) ? speedPxPerSec * 0.3 : speedPxPerSec;

                let nextX = x.get() + directionFactor * (effectiveSpeed * delta) / 1000;

                // Wrap logic (both directions use negative x range)
                // Left: moves from 0 → -trackWidth, wraps to 0
                // Right: moves from -trackWidth → 0, wraps to -trackWidth
                if (direction === 'left' && nextX <= -trackWidth) {
                    nextX += trackWidth;
                } else if (direction === 'right' && nextX >= 0) {
                    nextX -= trackWidth;
                }

                x.set(nextX);
            }

            rafId = requestAnimationFrame(tick);
        }

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, [direction, speedPxPerSec, isDragging, isHovering, x, isInitialized]);

    return (
        <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <motion.div
                ref={trackRef}
                className={`flex w-max ${className ?? ''}`}
                style={{ x }}
                drag="x"
                dragConstraints={{ left: -Infinity, right: Infinity }}
                dragElastic={0.08}
                dragMomentum={true}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => {
                    // Resume autoplay after short idle
                    setTimeout(() => setIsDragging(false), 900);
                }}
            >
                {loopItems.map((item, index) => (
                    <div key={index} className="flex-shrink-0">
                        {renderItem(item, index)}
                    </div>
                ))}
            </motion.div>

            {/* Gradient Masks */}
            <div className="absolute top-0 bottom-0 left-0 w-12 md:w-24 lg:w-32 z-10 bg-gradient-to-r from-studio-bg to-transparent pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-12 md:w-24 lg:w-32 z-10 bg-gradient-to-l from-studio-bg to-transparent pointer-events-none" />
        </div>
    );
}
