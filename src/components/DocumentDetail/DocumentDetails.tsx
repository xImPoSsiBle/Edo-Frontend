import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoPaperPlaneOutline } from "react-icons/io5";

import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getDocsById } from "../../store/reducer/ActionCreators";
import axios from "axios";
import DocumentEditor from "../DocumentEditor.tsx/DocumentEditor";


const DocumentDetails = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { id } = useParams();

    const dispatch = useAppDispatch();
    const { token } = useAppSelector(state => state.user);
    const { docDetails } = useAppSelector(state => state.document);

    const downloadDocument = async (id?: number) => {
        if (!id) return

        const resp = await axios.get(`http://localhost:8080/api/docs/${id}/download`, {
            headers: { Authorization: `Bearer ${token}` },
            responseType: "blob", // <-- важно!
        });

        const blob = resp.data;
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = docDetails?.name || "document.docx";
        link.click();

    }


    useEffect(() => {
        if (id) {
            dispatch(getDocsById(id));
        }
    }, [id]);

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
                        <Link to={'/inbox'}>
                            <FaArrowLeftLong className="w-8 h-8" />
                        </Link>
                        <span className="text-3xl text-start ml-10">
                            {docDetails?.name}
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
                        <span className="text-base" onClick={() => downloadDocument(docDetails?.id)}>
                            Download
                        </span>
                    </div>
                </div>
            </div>
            <div className='mt-5 mb-0 w-[80%] ml-69'>
                <DocumentEditor docDetails={docDetails} />
            </div>
        </>
    )
}

export default DocumentDetails