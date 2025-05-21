import { useState } from 'react';

import { FiDownload, FiEdit2, FiMoreHorizontal, FiTrash2 } from 'react-icons/fi'
import { SlLink } from "react-icons/sl";

import type { IDoc } from '../../models/Document';
import { Link } from 'react-router-dom';

interface IDocumentsTableItemsProps {
    doc: IDoc,
    handleSelect: (id: number) => void,
    isSelected: boolean
}

const DocumentsTableItems: React.FC<IDocumentsTableItemsProps> = ({ doc, isSelected, handleSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <tr className="border-t border-gray-300 hover:bg-gray-50 transition">
            <td className="p-3">
                <input type="checkbox" checked={isSelected} onChange={() => handleSelect(doc.id)} />
            </td>
            <td className="p-3">
                <span className="text-orange-500">
                    <SlLink />
                </span>
            </td>
            <td className="p-3 font-medium text-gray-900">
                <Link to={`document/${doc.id}`}>
                    <div className="flex items-center gap-2">
                        <div>
                            <p>{doc.name}</p>
                            <div className={`inline-block text-xs text-white px-2 py-0.5 rounded  ${doc.tagColor}`}>
                                {doc.tag}
                            </div>
                        </div>
                    </div>
                </Link>
            </td>
            <td className="p-3">{doc.recipient}</td>
            <td className="p-3">{doc.created}</td>
            <td className="p-3">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${doc.statusColor}`}></span>
                {doc.status}
            </td>
            <td className="p-3">{doc.modified}</td>
            <td className="p-3 text-right space-x-2">
                <div className='w-[80%] flex justify-between relative'>
                    <button><FiDownload width={50} /></button>
                    <button><FiEdit2 /></button>
                    <button onClick={() => setIsOpen(!isOpen)}><FiMoreHorizontal /></button>
                    <div className={`absolute top-5 right-[-15px] border-[0.5px] border-gray-200 w-[100px] bg-white rounded-md z-10 ${isOpen ? 'block' : 'hidden'}`}>
                        <button className='flex items-center gap-2 p-2'>
                            <FiTrash2 />
                            <span>Delete</span>
                        </button>
                        <button className='flex items-center gap-2 px-2 py-1'>
                            <FiTrash2 />
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default DocumentsTableItems