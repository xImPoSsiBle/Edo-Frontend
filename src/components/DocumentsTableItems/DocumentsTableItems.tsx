import { useEffect, useState } from 'react';

import { FiDownload, FiEdit2, FiMoreHorizontal, FiTrash2 } from 'react-icons/fi'
import { SlLink } from "react-icons/sl";

import type { IDoc } from '../../models/Document';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

interface IDocumentsTableItemsProps {
    doc: IDoc,
    handleSelect: (id: number) => void,
    isSelected: boolean,
    handleDelete: (id: number) => void
}

const DocumentsTableItems: React.FC<IDocumentsTableItemsProps> = ({ doc, handleDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [createdDate, setCreatedDate] = useState('');
    const [modifiedDate, setModifiedDate] = useState('');
    const { pathname } = useLocation()

    const { user } = useAppSelector(state => state.user)

    useEffect(() => {
        const date = new Date(doc.created);
        setCreatedDate(`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`);

        const modified = new Date(doc.modified);
        setModifiedDate(`${modified.getDate()}-${modified.getMonth() + 1}-${modified.getFullYear()}`);
    }, [doc])

    return (
        <tr className="border-t border-gray-300 hover:bg-gray-50 transition">
            <td className="p-3">
                <span className="text-orange-500">
                    <SlLink />
                </span>
            </td>
            <td className="p-3 font-medium text-gray-900">
                <Link to={`/document/${doc.id}`}>
                    <div className="flex items-center gap-2">
                        <div>
                            <p>{doc.name}</p>
                            <div className={`inline-block text-xs px-2 py-0.5 rounded`}>
                                {doc.tag}
                            </div>
                        </div>
                    </div>
                </Link>
            </td>
            <td className="p-3">
                {pathname === '/sent' ? doc.recipient.email : doc.sender.email}
            </td>
            <td className="p-3">{createdDate}</td>
            <td className="p-3">
                <span className={`inline-block w-2 h-2 rounded-full mr-2`}></span>
                {doc.status}
            </td>
            <td className="p-3">{modifiedDate}</td>
            <td className="p-3 text-right space-x-2">
                <div className='w-[80%] flex justify-between relative'>
                    <button><FiDownload width={50} /></button>
                    <button><FiEdit2 /></button>
                    <button onClick={() => setIsOpen(!isOpen)}><FiMoreHorizontal /></button>
                    <div className={`absolute top-5 right-[-15px] border-[0.5px] border-gray-200 w-[100px] bg-white rounded-md z-10 ${isOpen ? 'block' : 'hidden'} hover:bg-gray-100 cursor-pointer`}>
                        {doc.sender.email === user?.email && (
                            <button onClick={() => handleDelete(doc.id)} className="flex items-center gap-2 p-2">
                                <FiTrash2 /><span>Удалить</span>
                            </button>
                        )}
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default DocumentsTableItems