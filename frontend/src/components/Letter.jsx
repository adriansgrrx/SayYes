const Letter = ({ isActive, onClose }) => {
    if (!isActive) return null;

    return (
        <div className="modal-active fixed inset-0 flex items-center justify-center z-60 p-3">
            {/* Backdrop */}
            <div className="modal-backdrop fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>
            
            {/* Modal Content */}
            <div className="modal-content relative z-60 m-auto w-full max-w-2xl">
                {/* Birthday Card */}
                <div className="card-hover w-full max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-100">
                        <div className="bg-gradient-to-r from-neutral-50 to-stone-50 sm:p-8 lg:p-10 border-b border-neutral-100">
                            <h2 className="font-serif text-2xl lg:text-4xl xl:text-4xl text-center text-neutral-800 p-4 mb-2">Happy Birthday,<br />Lang Lang!🌻</h2>
                        </div>
                        
                        {/* Card Body */}
                        <div className="p-6 sm:p-8 lg:p-10 space-y-6 max-h-[70vh] overflow-y-auto">
                            <div id="hbd-text" className="text-xs md:text-sm lg:text-sm xl:text-sm prose prose-neutral max-w-none">
                                <p className=" text-neutral-600 leading-relaxed">
                                    Dear Lang/Lang-Lang/Clyde/Clyde Vlitz,
                                </p>
                                <p className=" text-neutral-600 leading-relaxed mt-4">
                                    On this special day, I want you to be happy and thankful—cuz, why not? It's another year, and you are 23 years old now. Despite all the challenges you faced last year, I wish this year make you stronger, happier, and full of beautiful moments.    
                                </p>
                                <p className=" text-neutral-600 leading-relaxed mt-4">
                                    I wish that all your struggles pay off—board exam reviews, personal problems, social life, and everything else you’ve worked hard for. This year, I hope you achieve what you’ve wished for in the past years: to become an Electronics Engineer. I also wish for us to become fitter this year, to take better care of our health and be more active. May you also have abundance in finances and in all the things that bring you happiness.
                                </p>
                                <p className=" text-neutral-600 leading-relaxed mt-4">
                                    Lang, I just want to thank you for being the best person in my life. Salamat sa pag-intindi at pagsalo palagi sa akin. Again, may your day be filled with moments as beautiful as you are, and may the year ahead bring you endless reasons to smile. Nandito lang ako palagi.
                                </p>
                            </div>

                            
                            {/* Closing */}
                            <div id="hbd-text" className='text-end mt-10'>
                                <p className="text-sm text-neutral-700 italic">
                                    With warmest wishes,
                                </p>
                                <p className="text-md text-neutral-700 italic">
                                    Toti/Adrian
                                </p>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Letter