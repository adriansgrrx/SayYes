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
                            <h2 className="font-serif text-2xl lg:text-4xl xl:text-4xl text-center text-neutral-800 p-4 mb-2">🌻</h2>
                        </div>
                        
                        {/* Card Body */}
                        <div className="p-6 sm:p-8 lg:p-10 space-y-6 max-h-[70vh] overflow-y-auto">
                            <div id="hbd-text" className="text-xs md:text-sm lg:text-sm xl:text-sm prose prose-neutral max-w-none">
                                <p className=" text-neutral-600 leading-relaxed mb-4">
                                    Dear Lang/Lang-Lang/Clyde/Clyde Vlitz,
                                </p>
                                <i className=" text-neutral-600 leading-relaxed mt-4">
                                    Bago ang lahat, yis, ni-reuse ko itong letter haha cuz why not?   
                                </i>
                                <p className=" text-neutral-600 leading-relaxed mt-4">
                                    Kidding aside, this Heart's Day, I want us to go as planned. While writing this I don't really know if kakayanin ba ng bulsa but let's go haha.
                                </p>
                                <p className=" text-neutral-600 leading-relaxed mt-4">
                                    Well, hindi naman kailangan ng Valentine's Day, mahal naman kita araw-araw. But, I just want to take this opportunity to show you that I love you so muchhhh.
                                </p>
                                <p className=" text-neutral-600 leading-relaxed mt-4">
                                    Thank you for giving me a chance to share countless of fun moments with you. And laging mong tatandaan na nandito lang ako palagi. I love you , Lang!
                                </p>
                            </div>

                            
                            {/* Closing */}
                            <div id="hbd-text" className='text-end mt-10'>
                                <p className="text-sm text-neutral-700 italic">
                                    Nagmamahal,
                                </p>
                                <p className="text-md text-neutral-700 italic">
                                    Adrian
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