import React, { useEffect, useState } from 'react'
import DocumentsTableItems from '../DocumentsTableItems/DocumentsTableItems'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import DocumentsToolbar from '../DocumentsToolbar/DocumentsToolbar'
import { getDocs } from '../../store/reducer/ActionCreators'
import { useLocation } from 'react-router-dom'

interface DocumentsTableProps {
    title: string
}

const DocumentTable: React.FC<DocumentsTableProps> = ({title}) => {
    const [selected, setSelected] = useState<number[]>([])
    const [search, setSearch] = useState('')

    const { docs } = useAppSelector(state => state.document)
    const dispatch = useAppDispatch()

    const {pathname} = useLocation()

    const handleSelect = (id: number) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(item => item !== id))
        } else {
            setSelected([...selected, id])
        }
    }

    useEffect(() => {
        dispatch(getDocs(pathname))
    }, [pathname])

    console.log(docs)

    const filteredDocs = docs.filter(doc => doc.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <>
            <DocumentsToolbar search={search} setSearch={setSearch} title={title}/>
            <div className='fixed right-0 ml-65 mt-10 h-[calc(100vh-250px)] w-[82%] overflow-y-auto p-6 rounded-l-xl max-h-[calc(100vh-250px)] shadow-[0_0_10px_1px_rgba(218,218,218,1)]'>
                <div className="overflow-x-auto h-full">
                    <table className="min-w-full text-sm">
                        <thead className="text-left">
                            <tr className="text-gray-500">
                                <th className="p-3"></th>
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
                                <DocumentsTableItems key={doc.id} doc={doc} handleSelect={handleSelect} isSelected={selected.includes(doc.id)} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default DocumentTable;