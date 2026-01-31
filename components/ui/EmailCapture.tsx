import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Loader2, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { supabase } from '../../lib/supabase';

interface EmailCaptureProps {
    placeholder?: string;
    buttonText?: string;
    className?: string;
    source?: string;
    variant?: 'minimal' | 'boxed';
    onCapture?: (email: string) => void;
}

export const EmailCapture: React.FC<EmailCaptureProps> = ({
    placeholder = "Email address",
    buttonText = "Begin",
    className = "",
    source = "footer",
    variant = "minimal",
    onCapture
}) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setStatus('error');
            setErrorMessage('Please enter a valid email address');
            return;
        }

        // If onCapture is provided, delegate to parent and skip internal submission
        if (onCapture) {
            onCapture(email);
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        try {
            // Insert lead into Supabase
            const { error } = await supabase
                .from('leads')
                .insert({
                    email: email.toLowerCase().trim(),
                    source,
                    intent: 'contact',
                    page_path: window.location.pathname,
                });

            if (error) {
                // Handle duplicate email gracefully (unique constraint violation)
                if (error.code === '23505') {
                    // Treat duplicate as success (idempotent)
                    setStatus('success');
                    setEmail('');
                    setTimeout(() => setStatus('idle'), 4000);
                    return;
                }

                // Other errors
                console.error('Lead capture failed:', error);
                throw new Error(error.message);
            }

            setStatus('success');
            setEmail('');

            // Reset success state after a delay
            setTimeout(() => {
                setStatus('idle');
            }, 4000);

        } catch (error) {
            console.error('Submission failed', error);
            setStatus('error');
            setErrorMessage('Something went wrong. Please try again.');
        }
    };


    return (
        <div className={`w-full max-w-sm ${className}`}>
            <form onSubmit={handleSubmit} className="relative">
                <div className={`relative flex items-center ${variant === 'boxed'
                    ? 'bg-white/5 border border-white/10 rounded-lg p-1 focus-within:border-gold/50 transition-colors'
                    : 'border-b border-white/20 focus-within:border-gold transition-colors pb-2'
                    }`}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (status === 'error') setStatus('idle');
                        }}
                        placeholder={placeholder}
                        disabled={status === 'loading' || status === 'success'}
                        className={`w-full bg-transparent border-none outline-none text-ivory placeholder:text-ivory/20 font-body ${variant === 'boxed' ? 'px-4 py-3' : 'px-0 py-2'
                            }`}
                    />

                    <AnimatePresence mode="wait">
                        {status === 'loading' ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className={variant === 'boxed' ? 'mr-3' : ''}
                            >
                                <Loader2 className="w-5 h-5 text-gold/50 animate-spin" />
                            </motion.div>
                        ) : status === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className={variant === 'boxed' ? 'mr-3' : ''}
                            >
                                <Check className="w-5 h-5 text-green-500" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="button"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {variant === 'boxed' ? (
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="!py-2 !px-4 !text-xs"
                                        disabled={!email}
                                    >
                                        {buttonText}
                                    </Button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="group"
                                        disabled={!email}
                                        aria-label="Submit"
                                    >
                                        <ArrowRight className={`w-5 h-5 text-gold transition-transform group-hover:translate-x-1 ${!email ? 'opacity-30' : 'opacity-100'}`} />
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </form>

            <AnimatePresence>
                {status === 'error' && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="flex items-center gap-2 text-red-400 font-syne text-[10px] tracking-widest uppercase">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errorMessage}</span>
                        </div>
                    </motion.div>
                )}

                {status === 'success' && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="flex items-center gap-2 text-gold font-syne text-[10px] tracking-widest uppercase">
                            <span>Added to list. We'll be in touch.</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
