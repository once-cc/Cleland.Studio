import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { EmailCapture } from '../ui/EmailCapture';
import { IntakeModal } from '../ui/IntakeModal';

export const BeginSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [capturedEmail, setCapturedEmail] = useState('');

    const handleEmailCapture = (email: string) => {
        setCapturedEmail(email);
        setIsModalOpen(true);
    };

    return (
        <section id="contact" ref={containerRef} className="py-32 px-6 bg-studio-bg relative border-t border-white/5">
            <div className="max-w-4xl mx-auto text-center">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="font-syne text-xs font-bold text-gold uppercase tracking-widest mb-6 block">
                        Start the Process
                    </span>

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-normal font-domaine-narrow leading-[1.05] tracking-[-0.64px] mb-12">
                        Start with clarity.
                    </h2>

                    <p className="font-body text-xl text-ivory/60 max-w-2xl mx-auto mb-16 leading-relaxed">
                        We only take on a select number of projects per quarter to ensure you have our full focus. Secure your place in the queue.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center"
                >
                    <EmailCapture
                        variant="boxed"
                        placeholder="Enter your email address"
                        buttonText="Begin Request"
                        className="max-w-md w-full"
                        source="begin_section"
                        onCapture={handleEmailCapture}
                    />

                    <p className="mt-6 font-syne text-[10px] tracking-widest text-ivory/20 uppercase">
                        No spam. Direct line to the studio.
                    </p>
                </motion.div>
            </div>

            <IntakeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialEmail={capturedEmail}
            />
        </section>
    );
};
