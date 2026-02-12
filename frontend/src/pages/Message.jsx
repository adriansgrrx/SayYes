import { useState, useEffect } from 'react'
import Letter from '../components/Letter';

const Message = () => {
    const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);

    const openCard = () => {
        setIsEnvelopeOpen(true);
        setTimeout(() => {
            setIsModalActive(true);
            document.body.style.overflow = 'hidden';
        }, 300);
    };

    const closeCard = () => {
        setIsModalActive(false);
        document.body.style.overflow = '';
        setTimeout(() => {
            setIsEnvelopeOpen(false);
        }, 300);
    };

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                closeCard();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div 
            className="min-h-screen flex flex-col from-stone-50 via-neutral-50 to-stone-100 bg-amber-50"
        
            style={{
                minHeight: "100dvh",                     // FIX iOS Safari viewport
                paddingTop: "env(safe-area-inset-top)",  // notch safe
                paddingBottom: "env(safe-area-inset-bottom)"
            }}
        >

        {/* Header */}
            <div id="hbd-text" className="pt-8 sm:pt-12 mt-40">
                <div className='grid'>
                    <h1 className="text-2xl font-bold text-center">
                        Happy Valentine's <br />Day, Lang! 💌
                    </h1>

                    {/* Subheading */}
                    <div className="grid gap-4 max-w-xs md:max-w-md lg:max-w-xl xl:max-w-xl mx-auto text-xs text-center opacity-90 mt-8">
                        <p>
                            At dahil nag-"yes" ka, itong message ko sa'yo 😉:
                        </p>
                    </div>
                </div>
            </div>

        {/* Envelope — CENTERED */}
        <div className="flex-1 flex items-center justify-center px-6 mb-20">
            <div
            className="envelope-clickable w-full max-w-md mx-auto animate-fadeIn cursor-pointer"
            style={{ animationDelay: '0.2s' }}
            onClick={openCard}
            >
            <div className={`relative envelope ${isEnvelopeOpen ? 'envelope-open' : ''}`}>
                
                {/* Envelope body */}
                <div className="bg-neutral-100 rounded-lg shadow-xl p-8 sm:p-10 lg:p-12 border border-neutral-200">
                <div className="aspect-[4/3] bg-white rounded" />
                </div>

                {/* Envelope flap */}
                <div
                className="envelope-flap absolute top-0 left-0 right-0 h-24 sm:h-28 bg-neutral-200 rounded-t-lg shadow-md border border-neutral-300"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                />
            </div>

            <p id="hbd-text" className="text-xs text-center text-neutral-400 mt-4 tracking-wide">
                Click to open envelope
            </p>
            </div>
        </div>

        {/* Modal */}
        <Letter isActive={isModalActive} onClose={closeCard} />
        </div>
    )
}

export default Message