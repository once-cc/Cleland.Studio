import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"; // Corrected path
import { Button } from "./Button"; // Corrected path/component name
import { Progress } from "./progress";
import { X } from "lucide-react";

const multiStepFormVariants = cva(
    "flex flex-col relative bg-transparent", // Added bg-transparent and relative
    {
        variants: {
            size: {
                default: "md:w-[700px]",
                sm: "md:w-[550px]",
                lg: "md:w-[850px]",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
);

interface MultiStepFormProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof multiStepFormVariants> {
    currentStep: number;
    totalSteps: number;
    title: string;
    description: string;
    onBack: () => void;
    onNext: () => void;
    onClose?: () => void;
    backButtonText?: string;
    nextButtonText?: string;
    footerContent?: React.ReactNode;
    hideNextButton?: boolean;
    hideBackButton?: boolean;
}

const MultiStepForm = React.forwardRef<HTMLDivElement, MultiStepFormProps>(
    ({
        className,
        size,
        currentStep,
        totalSteps,
        title,
        description,
        onBack,
        onNext,
        onClose,
        backButtonText = "Back",
        nextButtonText = "Next Step",
        footerContent,
        children,
        hideNextButton,
        hideBackButton,
        ...props
    }, ref) => {
        const progress = Math.round((currentStep / totalSteps) * 100);

        const variants = {
            hidden: { opacity: 0, x: 20 }, // Reduced distance for subtlety
            enter: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -20 },
        };

        return (
            <Card ref={ref} className={cn(multiStepFormVariants({ size }), className, "border-none shadow-none")} {...props}>
                <CardHeader className="bg-transparent px-0 pt-0">
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="font-cormorant text-3xl md:text-4xl text-ivory font-normal leading-tight">{title}</CardTitle>
                            <CardDescription className="font-body text-ivory/50 mt-2 text-base">{description}</CardDescription>
                        </div>
                        {onClose && (
                            <Button variant="ghost" icon={false} className="h-auto p-2 text-ivory/40 hover:text-ivory hover:bg-white/5" onClick={onClose} aria-label="Close">
                                <X className="h-6 w-6" />
                            </Button>
                        )}
                    </div>
                    <div className="flex items-center gap-4 pt-6">
                        <Progress value={progress} className="w-full bg-white/10" indicatorClassName="bg-gold" />
                        <p className="text-xs font-syne font-bold uppercase tracking-widest text-ivory/30 whitespace-nowrap">
                            {currentStep}/{totalSteps}
                        </p>
                    </div>
                </CardHeader>

                <CardContent className="px-0 py-6 min-h-[300px] overflow-hidden bg-transparent">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            variants={variants}
                            initial="hidden"
                            animate="enter"
                            exit="exit"
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </CardContent>

                <CardFooter className="px-0 flex justify-between items-center bg-transparent">
                    <div>{footerContent}</div>
                    <div className="flex gap-4">
                        {currentStep > 1 && !hideBackButton && (
                            <Button variant="outline" onClick={onBack} className="border-white/20 text-ivory hover:bg-white/5 hover:text-gold text-xs h-10 px-6 font-syne uppercase tracking-widest">
                                {backButtonText}
                            </Button>
                        )}
                        {!hideNextButton && (
                            <Button onClick={onNext} className="bg-ivory text-studio-bg hover:bg-gold hover:text-studio-bg text-xs h-10 px-6 font-syne uppercase tracking-widest font-bold">
                                {nextButtonText}
                            </Button>
                        )}
                    </div>
                </CardFooter>
            </Card>
        );
    }
);

MultiStepForm.displayName = "MultiStepForm";

export { MultiStepForm };
