import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoPaperPlaneOutline } from "react-icons/io5";

import { Link } from "react-router-dom";


const DocumentDetails = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {isOpen
                && <div className="fixed top-0 left-0 w-full h-full bg-grey-100 flex items-center justify-center" onClick={() => setIsOpen(false)}>
                    <div className="w-[40%] h-[80%] bg-white rounded-xl shadow-[0_0_10px_1px_rgba(218,218,218,1)] z-[999]" onClick={(e) => e.stopPropagation()}>
                        <h1 className="text-3xl text-start mt-10 ml-10">
                            Title
                        </h1>
                        <div className="flex justify-center flex-col mt-5 max-w-[90%] m-auto">
                            <label htmlFor="email" className="ml-3">
                                To
                            </label>
                            <input type="text" id='email' placeholder="Search by name or email" className="w-full h-10 mt-3 border border-gray-300 pl-3 py-1 focus:outline-none focus:border-[#FFB27D] rounded-xl" />
                        </div>
                        <div className="flex justify-center flex-col mt-5 max-w-[90%] m-auto">
                            <label htmlFor="subject" className="ml-3">
                                Subject
                            </label>
                            <input type="text" id='subject' className="w-full h-10 mt-3 border border-gray-300 pl-3 py-1 focus:outline-none focus:border-[#FFB27D] rounded-xl" />
                        </div>
                        <div className="flex justify-center flex-col mt-5 max-w-[90%] m-auto">
                            <label htmlFor="subject" className="ml-3">
                                Message
                            </label>
                            <textarea id='subject' className="w-full h-40 mt-3 border border-gray-300 pl-3 py-1 focus:outline-none focus:border-[#FFB27D] rounded-xl" />
                        </div>
                        <div>
                            <button className="bg-[#FFB27D] hover:bg-orange-500 transition px-4 py-2 rounded-3xl text-white flex items-center cursor-pointer" onClick={() => setIsOpen(true)}>
                                <IoPaperPlaneOutline className="w-5 h-5 mr-2" />
                                <span className="text-base ">
                                    Send
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            }
            <div className="w-full h-[85px] flex items-center bg-[#D9D9D9] mt-25">
                <div className="flex w-[82%] ml-70 justify-between  ">
                    <div className="flex items-center">
                        <Link to={'/'}>
                            <FaArrowLeftLong className="w-8 h-8" />
                        </Link>
                        <span className="text-3xl text-start ml-10">
                            Working contract
                        </span>
                    </div>
                    <div className="flex items-center gap-10 mr-10">
                        <button className="bg-[#FFB27D] hover:bg-orange-500 transition px-4 py-2 rounded-3xl text-white flex items-center cursor-pointer" onClick={() => setIsOpen(true)}>
                            <IoPaperPlaneOutline className="w-5 h-5 mr-2" />
                            <span className="text-base ">
                                Send
                            </span>
                        </button>
                        <span className="text-base">
                            Save in Draft
                        </span>
                        <span className="text-base">
                            Download
                        </span>
                    </div>
                </div>
            </div>
            <div className='mt-25 mb-0 w-[80%] ml-69'>
                {/* <iframe
                    src={`https://docs.google.com/document/d/1GsOVBph6ev6YJX1-3cZLfX6-K3xEHBYy?tab=t.0&embedded=true`}
                    className="w-full h-[90vh]"
                /> */}

            </div>
        </>
    )
}

export default DocumentDetails