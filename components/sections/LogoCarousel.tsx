import React from 'react';
import { InfiniteSlider } from '../ui/infinite-slider';

// Import logos directly from assets
import framerMotionLogo from '../../assets/brandlogos/framermotion-white.svg';
import githubLogo from '../../assets/brandlogos/github-white.svg';
import openaiLogo from '../../assets/brandlogos/openai-white.svg';
import resendLogo from '../../assets/brandlogos/resend-white.svg';
import supabaseLogo from '../../assets/brandlogos/supabase.svg';
import vercelLogo from '../../assets/brandlogos/vercel-white.svg';
import viteLogo from '../../assets/brandlogos/vite.svg';

interface BrandLogo {
    name: string;
    src: string;
}

export const LogoCarousel: React.FC = () => {
    const logos: BrandLogo[] = [
        { name: 'Framer Motion', src: framerMotionLogo },
        { name: 'GitHub', src: githubLogo },
        { name: 'OpenAI', src: openaiLogo },
        { name: 'Resend', src: resendLogo },
        { name: 'Supabase', src: supabaseLogo },
        { name: 'Vercel', src: vercelLogo },
        { name: 'Vite', src: viteLogo },
    ];

    return (
        <section
            className="w-full bg-white/[0.018] border-y border-white/5 py-12 lg:py-16"
            aria-label="Technology Stack"
        >
            {/* Centering Wrapper - defines horizontal origin */}
            <div className="w-full flex justify-center">
                {/* GPU Rendering Canvas - defines the compositing boundary */}
                <div className="w-full xl:w-[1280px]">
                    <InfiniteSlider
                        gap={128}
                        duration={25}
                        direction="horizontal"
                        reverse={false}
                        className="px-8"
                    >
                        {logos.map((logo) => (
                            <div
                                key={logo.name}
                                className="flex items-center justify-center opacity-20 grayscale select-none"
                            >
                                <img
                                    src={logo.src}
                                    alt={logo.name}
                                    className="h-6 md:h-8 w-auto object-contain brightness-0 invert"
                                    style={{ maxWidth: '140px' }}
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </InfiniteSlider>
                </div>
            </div>
        </section>
    );
};
