import React, { useEffect, useState } from 'react'
import DocumentsTableItems from '../DocumentsTableItems/DocumentsTableItems'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import DocumentsToolbar from '../DocumentsToolbar/DocumentsToolbar'
import { getDocs } from '../../store/reducer/ActionCreators'
import { useLocation } from 'react-router-dom'
import type { IDoc } from '../../models/Document'
import axios from 'axios'

interface DocumentsTableProps {
    title: string
}

const DocumentTable: React.FC<DocumentsTableProps> = ({ title }) => {
    const [selected, setSelected] = useState<number[]>([])
    const [search, setSearch] = useState('')
    const [documents, setDocuments] = useState<IDoc[]>([])

    const { docs } = useAppSelector(state => state.document)
    const dispatch = useAppDispatch()
    const { token } = useAppSelector(state => state.user)

    const { pathname } = useLocation()

    const handleSelect = (id: number) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(item => item !== id))
        } else {
            setSelected([...selected, id])
        }
    }

    const handleDelete = async (id?: number) => {
        try {
            const resp = await axios.delete(`http://localhost:8080/api/docs/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (resp.status >= 200 && resp.status < 300) {
                alert("Документ успешно удалён!");
                setDocuments(prev => prev.filter(d => d.id !== id));
            }
        } catch (err) {
            console.error("Ошибка при удалении:", err);
            alert("Не удалось удалить документ");
        }
    };

    useEffect(() => {
        dispatch(getDocs(pathname))
    }, [pathname])

    useEffect(() => {
        setDocuments(docs)
    }, [docs])


    const filteredDocs = documents.filter(doc => doc.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <>
            <DocumentsToolbar search={search} setSearch={setSearch} title={title} />
            <div className='fixed right-0 ml-65 mt-10 h-[calc(100vh-250px)] w-[82%] overflow-y-auto p-6 rounded-l-xl max-h-[calc(100vh-250px)] shadow-[0_0_10px_1px_rgba(218,218,218,1)]'>
                <div className="overflow-x-auto h-full">
                    <table className="min-w-full text-sm">
                        <thead className="text-left">
                            <tr className="text-gray-500">
                                <th className="p-3"></th>
                                <th className="p-3">Document Name</th>
                                <th className="p-3">{pathname === '/sent' ? 'Recipient' : 'Sender'}</th>
                                <th className="p-3">Date Created</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Modified</th>
                                <th className="p-3 text-right"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDocs?.map(doc => (
                                <DocumentsTableItems key={doc.id} doc={doc} handleSelect={handleSelect} isSelected={selected.includes(doc.id)} handleDelete={handleDelete} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default DocumentTable;