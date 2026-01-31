import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Check, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { createPortal } from 'react-dom';
import { MultiStepForm } from './multi-step-form';
import { supabase } from '../../lib/supabase';

interface IntakeModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialEmail: string;
}

interface IntakeFormData {
    email: string;
    firstName: string;
    mobile: string;
    brief: string;
    successDefinition: string;
}

export const IntakeModal: React.FC<IntakeModalProps> = ({ isOpen, onClose, initialEmail }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    const [formData, setFormData] = useState<IntakeFormData>({
        email: '',
        firstName: '',
        mobile: '',
        brief: '',
        successDefinition: ''
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // Pre-fill email and reset state on open
    useEffect(() => {
        if (isOpen) {
            setFormData(prev => ({ ...prev, email: initialEmail }));
            setStatus('idle');
            setErrorMessage('');
            setCurrentStep(1); // Always start at step 1 to confirm/edit email
        }
    }, [isOpen, initialEmail]);

    // Handle ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (status === 'submitting') return;
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose, status]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateStep = (step: number): boolean => {
        if (step === 1) {
            if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                setErrorMessage('Valid email is required');
                return false;
            }
            return true;
        }
        if (step === 2) {
            if (!formData.firstName.trim()) {
                setErrorMessage('First name is required');
                return false;
            }
            if (!formData.brief.trim()) {
                setErrorMessage('Project brief is required');
                return false;
            }
            if (!formData.successDefinition.trim()) {
                setErrorMessage('Success definition is required');
                return false;
            }
            return true;
        }
        return true;
    };

    const handleNext = async () => {
        setErrorMessage('');

        if (!validateStep(currentStep)) return;

        // Logic per step
        if (currentStep === 1) {
            // Step 1: Upsert lead
            setStatus('submitting');
            try {
                const { error } = await supabase
                    .from('leads')
                    .insert({
                        email: formData.email.toLowerCase().trim(),
                        source: 'intake_modal',
                        intent: 'blueprint',
                        page_path: window.location.pathname,
                    });

                if (error && error.code !== '23505') {
                    // Ignore duplicate email (unique constraint), fail on other errors
                    console.error('Lead upsert failed:', error);
                    throw new Error(error.message);
                }

                setStatus('idle');
                setCurrentStep(2);
            } catch (err) {
                console.error(err);
                setStatus('error');
                setErrorMessage('Failed to save email. Please try again.');
            }
        } else if (currentStep === 2) {
            // Step 2: Submit full intake
            setStatus('submitting');
            try {
                const { error } = await supabase
                    .from('intake_submissions')
                    .insert({
                        email: formData.email.toLowerCase().trim(),
                        first_name: formData.firstName.trim(),
                        mobile: formData.mobile?.trim() || null,
                        brief: formData.brief.trim(),
                        success_definition: formData.successDefinition.trim(),
                        source: 'intake_modal',
                    });

                if (error) {
                    console.error('Intake submission failed:', error);
                    throw new Error(error.message);
                }

                setStatus('idle');
                setCurrentStep(3);
            } catch (err) {
                console.error(err);
                setStatus('error');
                setErrorMessage('Failed to save details. Please try again.');
            }
        } else if (currentStep === 3) {
            // Step 3: Blueprint transition (future)
            onClose();
            // TODO: Route to Blueprint Configurator
            // For now, just close the modal
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setErrorMessage('');
        }
    };

    // Close on backdrop click (refined to allow close if on step 1)
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && currentStep === 1) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 isolate" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 bg-studio-bg/80 cursor-pointer"
                        onClick={handleBackdropClick}
                    />

                    {/* Centering Wrapper - Non-animated flex container */}
                    <div className="fixed inset-0 flex items-center justify-center p-4 md:p-6 z-10 pointer-events-none">

                        {/* Modal Panel - Animated by Framer Motion */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 40 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <MultiStepForm
                                currentStep={currentStep}
                                totalSteps={totalSteps}
                                title={
                                    currentStep === 1 ? "Start the Process" :
                                        currentStep === 2 ? "Project Intake" :
                                            "The Blueprint"
                                }
                                description={
                                    currentStep === 1 ? "We've saved your email — please confirm it below." :
                                        currentStep === 2 ? "Tell us a bit more about what you are building." :
                                            "Begin with structured strategy and design direction."
                                }
                                onBack={handleBack}
                                onNext={handleNext}
                                onClose={onClose}
                                backButtonText="Back"
                                nextButtonText={
                                    status === 'submitting' ? "Saving..." :
                                        currentStep === 3 ? "Begin Blueprint" : "Next Step"
                                }
                                hideNextButton={currentStep === 3}
                                hideBackButton={currentStep === 3}
                                size="default"
                            >

                                {/* ERROR MESSAGE */}
                                {errorMessage && (
                                    <div className="mb-6 flex items-center gap-2 text-red-400 font-syne text-[10px] tracking-widest uppercase bg-red-900/10 p-3 border border-red-500/20 rounded">
                                        <AlertCircle className="w-3 h-3" />
                                        <span>{errorMessage}</span>
                                    </div>
                                )}

                                {/* STEP 1: EMAIL CONFIRMATION */}
                                {currentStep === 1 && (
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="block font-syne text-[10px] uppercase tracking-widest text-ivory/40">
                                                Email Address <span className="text-gold">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-ivory font-body focus:outline-none focus:border-gold/50 transition-colors rounded-none"
                                            />
                                            <p className="text-xs text-ivory/30 font-body">This will be your primary ID for the project portal.</p>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 2: DETAILS */}
                                {currentStep === 2 && (
                                    <div className="space-y-6">
                                        {/* First Name & Mobile Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label htmlFor="firstName" className="block font-syne text-[10px] uppercase tracking-widest text-ivory/40">
                                                    First Name <span className="text-gold">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-ivory font-body focus:outline-none focus:border-gold/50 transition-colors rounded-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="mobile" className="block font-syne text-[10px] uppercase tracking-widest text-ivory/40">
                                                    Mobile
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="mobile"
                                                    name="mobile"
                                                    value={formData.mobile}
                                                    onChange={handleChange}
                                                    placeholder="Optional — best for faster communication."
                                                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-ivory font-body focus:outline-none focus:border-gold/50 transition-colors placeholder:text-ivory/20 rounded-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Project Brief */}
                                        <div className="space-y-2">
                                            <label htmlFor="brief" className="block font-syne text-[10px] uppercase tracking-widest text-ivory/40">
                                                Project Brief <span className="text-gold">*</span>
                                            </label>
                                            <textarea
                                                id="brief"
                                                name="brief"
                                                value={formData.brief}
                                                onChange={handleChange}
                                                required
                                                rows={2}
                                                placeholder="What are you building?"
                                                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-ivory font-body focus:outline-none focus:border-gold/50 transition-colors placeholder:text-ivory/20 resize-none rounded-none"
                                            />
                                        </div>

                                        {/* Success Definition */}
                                        <div className="space-y-2">
                                            <label htmlFor="successDefinition" className="block font-syne text-[10px] uppercase tracking-widest text-ivory/40">
                                                Success Definition <span className="text-gold">*</span>
                                            </label>
                                            <textarea
                                                id="successDefinition"
                                                name="successDefinition"
                                                value={formData.successDefinition}
                                                onChange={handleChange}
                                                required
                                                rows={2}
                                                placeholder="What does success look like?"
                                                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-ivory font-body focus:outline-none focus:border-gold/50 transition-colors placeholder:text-ivory/20 resize-none rounded-none"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* STEP 3: BLUEPRINT / DECISION */}
                                {currentStep === 3 && (
                                    <div className="space-y-8">
                                        <div className="p-6 border border-gold/20 bg-gold/5">
                                            <h4 className="font-cormorant text-2xl text-ivory mb-4">The Blueprint Protocol</h4>
                                            <div className="font-body text-ivory/80 mb-6 leading-relaxed space-y-4">
                                                <p>We begin with a focused strategic session before any full build.</p>
                                                <p>The Blueprint is a structured framework designed to create clarity, align systems, and establish confident direction across Discovery, Design, and Delivery — before execution begins.</p>
                                                <p>It ensures we define the right foundations, shape the right direction, and scope the right outcome for your business — not just build the wrong thing well.</p>
                                            </div>
                                            <ul className="space-y-2 mb-6">
                                                {['System Architecture Alignment', 'Strategic Direction & Scope Definition', 'Risk & Constraint Mapping'].map(item => (
                                                    <li key={item} className="flex items-center gap-2 font-syne text-xs text-gold uppercase tracking-widest">
                                                        <Check className="w-4 h-4" /> {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            <Button onClick={handleNext} className="w-full">
                                                Begin Blueprint
                                            </Button>
                                            <button
                                                onClick={onClose}
                                                className="text-ivory/40 hover:text-ivory text-xs font-syne uppercase tracking-widest text-center py-2 transition-colors"
                                            >
                                                Not yet — I’ll review this later
                                            </button>
                                        </div>
                                    </div>
                                )}

                            </MultiStepForm>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};
