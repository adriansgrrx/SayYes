import React, { useState, Children, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = '',
  stepContainerClassName = '',
  contentClassName = '',
  footerClassName = '',
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = 'Back',
  nextButtonText = 'Continue',
  disableStepIndicators = false,
  renderStepIndicator,
  ...rest
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);

  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = newStep => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) onFinalStepCompleted();
    else onStepChange(newStep);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    setDirection(1);
    updateStep(totalSteps + 1);
  };

  return (
    <div
      className="relative flex min-h-full flex-1 flex-col items-center justify-center p-4"
      {...rest}
    >

      {/* Main Card */}
      <div
        className={`
          mx-auto w-full max-w-md rounded-4xl shadow-2xl backdrop-blur-md
          bg-gradient-to-br from-rose-50 via-pink-50 to-red-50
          border border-rose-200
          ${stepCircleContainerClassName}
        `}
      >
        {/* Step Indicators */}
        <div className={`${stepContainerClassName} flex w-full items-center p-8`}>
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;

            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: clicked => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    currentStep={currentStep}
                    disableStepIndicators={disableStepIndicators}
                    onClickStep={clicked => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }}
                  />
                )}

                {isNotLastStep && (
                  <StepConnector isComplete={currentStep > stepNumber} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Content */}
        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={`space-y-2 px-8 ${contentClassName}`}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {/* Footer */}
        {!isCompleted && (
          <div className={`px-8 pb-8 ${footerClassName}`}>
            <div className={`mt-10 flex ${currentStep !== 1 ? 'justify-between' : 'justify-end'}`}>
              
              {currentStep !== 1 && (
                <button
                  onClick={handleBack}
                  className="rounded-full px-4 py-2 text-rose-400 hover:text-rose-600 transition"
                  {...backButtonProps}
                >
                  {backButtonText}
                </button>
              )}

              <button
                onClick={isLastStep ? handleComplete : handleNext}
                className="
                  flex items-center justify-center rounded-full
                  bg-gradient-to-r from-rose-500 to-pink-500
                  py-2 px-5 font-semibold text-white
                  shadow-lg shadow-rose-300
                  hover:scale-105 hover:shadow-xl
                  active:scale-95
                  transition-all duration-300
                "
                {...nextButtonProps}
              >
                {isLastStep ? 'Lezzgoooo' : nextButtonText}
              </button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= CONTENT WRAPPER ================= */

function StepContentWrapper({ isCompleted, currentStep, direction, children, className }) {
  const [parentHeight, setParentHeight] = useState(0);

  return (
    <motion.div
      style={{ position: 'relative', overflow: 'hidden' }}
      animate={{ height: parentHeight }}
      transition={{ type: 'spring', duration: 0.4 }}
      className={className}
    >
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        {!isCompleted ? (
          <SlideTransition
            key={currentStep}
            direction={direction}
            onHeightReady={h => setParentHeight(h)}
          >
            {children}
          </SlideTransition>
        ) : (
          <CompletionScreen />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ================= SLIDE TRANSITION ================= */

function SlideTransition({ children, direction, onHeightReady }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (ref.current) onHeightReady(ref.current.offsetHeight);
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={ref}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 25
      }}
      style={{ position: 'absolute', left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants = {
  enter: dir => ({
    x: dir >= 0 ? 120 : -120,
    opacity: 0,
    scale: 0.96
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: dir => ({
    x: dir >= 0 ? -120 : 120,
    opacity: 0,
    scale: 0.96
  })
};

/* ================= STEP ================= */

export function Step({ children }) {
  return <div className="px-8">{children}</div>;
}

/* ================= STEP INDICATOR ================= */

function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators }) {
  const status =
    currentStep === step ? 'active'
    : currentStep < step ? 'inactive'
    : 'complete';

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) onClickStep(step);
  };

  return (
    <motion.div className="cursor-pointer">
      <motion.div
        animate={status}
        variants={{
          inactive: {
            scale: 1,
            backgroundColor: '#ffe4e6',
            color: '#be123c'
          },
          active: {
            scale: 1.08, // slight emphasis, no pulse
            backgroundColor: '#f43f5e',
            color: '#fff',
            boxShadow: '0 0 18px rgba(244,63,94,0.6)'
          },
          complete: {
            scale: 1,
            backgroundColor: '#ec4899',
            color: '#fff'
          }
        }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 18
        }}
        className="flex h-9 w-9 items-center justify-center rounded-full font-bold"
      >
        {status === 'complete' ? (
          <CheckIcon />
        ) : status === 'active' ? (
          <div className="h-3 w-3 rounded-full bg-white" />
        ) : (
          step
        )}
      </motion.div>
    </motion.div>
  );
}


/* ================= CONNECTOR ================= */

function StepConnector({ isComplete }) {
  return (
    <div className="relative mx-2 h-1 flex-1 rounded-full bg-rose-100 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          width: isComplete ? '100%' : 0,
          background: isComplete
            ? 'linear-gradient(90deg,#f43f5e,#ec4899)'
            : 'linear-gradient(90deg,#fda4af,#fb7185)'
        }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}

/* ================= COMPLETION ================= */

function CompletionScreen() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center py-10"
    >
      <div className="text-4xl mb-3">💖</div>
      <h2 className="text-2xl font-bold text-rose-500">
        She said YES!
      </h2>
    </motion.div>
  );
}

/* ================= CHECK ICON ================= */

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" stroke="white" fill="none" strokeWidth="3">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4 }}
        d="M5 13l4 4L19 7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
