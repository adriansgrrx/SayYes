import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "cally";
import Stepper, { Step } from '../components/Stepper';

const Main = () => {
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(1)

    /* ================= YES PIN ================= */

    const [pin, setPin] = useState(["", "", ""])
    const isYesPin = pin.join("").toLowerCase() === "yes"

    const handlePinChange = (index, value) => {
        const letter = value.replace(/[^a-zA-Z]/g, "").toUpperCase()

        const updated = [...pin]
        updated[index] = letter
        setPin(updated)

        if (letter && index < 2) {
            const next = document.getElementById(`pin-${index + 1}`)
            if (next) next.focus()
        }
    }

    /* ================= DISABLE STATE ================= */

    const disableNavigation = currentStep === 3 && !isYesPin

    /* ================= BUTTON STYLES ================= */

    const romanticPrimaryBtn = `
        bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500
        text-white font-semibold
        rounded-full px-6 py-2
        shadow-lg shadow-rose-300/50
        hover:scale-105 hover:shadow-xl
        active:scale-95
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-rose-300
    `

    const romanticSecondaryBtn = `
        text-rose-500 font-medium
        rounded-full px-5 py-2
        hover:bg-rose-50
        transition
    `

    const disabledBtn = `
        opacity-40 cursor-not-allowed
        hover:scale-100 hover:shadow-none
    `

    return (
        <div
            className="
                flex items-center justify-center
                bg-gradient-to-br from-rose-100 via-pink-100 to-red-100
                px-4 py-6
            "
            style={{
                minHeight: "100dvh",                     // FIX iOS Safari viewport
                paddingTop: "env(safe-area-inset-top)",  // notch safe
                paddingBottom: "env(safe-area-inset-bottom)"
            }}
        >

        <Stepper
            initialStep={1}
            onStepChange={(step) => setCurrentStep(step)}
            onFinalStepCompleted={() => navigate("/message")}
            backButtonText="Previous"
            nextButtonText="Next"

            /* ===== disable BOTH buttons ===== */
            nextButtonProps={{
                disabled: disableNavigation,
                className: `${romanticPrimaryBtn} ${disableNavigation ? disabledBtn : ""}`
            }}

            backButtonProps={{
                disabled: disableNavigation,
                className: `${romanticSecondaryBtn} ${disableNavigation ? disabledBtn : ""}`
            }}
        >

            {/* ================= STEP 1 ================= */}
            <Step>
                <h2 className="text-xl font-semibold text-center">
                    Well, today is...
                </h2>

                <div className="h-80 flex justify-center items-center text-black">
                    <calendar-date className="cally bg-base-100 border border-base-300 shadow-lg rounded-box">

                        <svg slot="previous" className="fill-current size-4" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>

                        <svg slot="next" className="fill-current size-4" viewBox="0 0 24 24">
                            <path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>

                        <calendar-month />
                    </calendar-date>
                </div>

                <p className="text-center">You think I forgot no?</p>
            </Step>


            {/* ================= STEP 2 ================= */}
            <Step>
                <h2 className="text-xl font-semibold text-center">
                    : Can I just... ask something crazy?
                </h2>

                <img
                    className="mt-4 rounded-xl w-full h-[120px] object-cover shadow-md"
                    src="https://langdays.z23.web.core.windows.net/assets/anna.jpg"
                    alt="cat"
                />

                <h2 className="text-xl mt-2 font-semibold text-center">
                    : I love crazy!
                </h2>
            </Step>


            {/* ================= STEP 3 ================= */}
            <Step>
                <h2 className="text-xl font-semibold text-center mb-4">
                    Will you be my Valentine?
                </h2>
                <div className="flex justify-center gap-3">
                    {pin.map((letter, index) => (
                        <input
                            key={index}
                            id={`pin-${index}`}
                            value={letter}
                            maxLength={1}
                            onChange={(e) => handlePinChange(index, e.target.value)}
                            className="
                                w-16 h-16 text-center text-2xl font-bold
                                rounded-xl border-2 border-rose-300
                                focus:border-rose-500 focus:outline-none
                                shadow-sm
                                transition
                            "
                        />
                    ))}
                </div>

                {!isYesPin && (
                    <p className="text-center text-sm text-rose-400 mt-3">
                        Hint: 😜
                    </p>
                )}
            </Step>


            {/* ================= STEP 4 ================= */}
            <Step>
                <h2 className="text-xl font-semibold text-center">
                    I knew it!
                </h2>
                <p className="text-center mt-2">yey!</p>
            </Step>

        </Stepper>

        </div>
    )
}

export default Main