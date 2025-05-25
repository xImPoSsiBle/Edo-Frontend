import { useState } from "react";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { RxMagnifyingGlass } from "react-icons/rx";
import UploadFileModal from "../UploadFileModal/UploadFile";

interface DocumentsToolbarProps {
  search: string,
  setSearch: React.Dispatch<React.SetStateAction<string>>,
  title: string
}

const DocumentsToolbar: React.FC<DocumentsToolbarProps> = ({ search, setSearch, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <UploadFileModal setIsOpen={setIsOpen} />}

      <div className='mt-25 mb-0 w-[82%] ml-69'>
        <h1 className='text-3xl text-start '>{title}</h1>
        <div className='flex justify-between'>
          <div className='flex justify-between w-[30%] mt-3'>
            <div className='flex items-center justify-center'>
              <input type='checkbox' id='select-all' className='cursor-pointer' />
              <label className='ml-2 text-base cursor-pointer' htmlFor='select-all'>
                Select all
              </label>
            </div>
            <div>
              <button className='bg-[#FFB27D] hover:bg-orange-500 transition px-5 py-2 rounded-2xl text-white flex items-center cursor-pointer'>
                <HiOutlineDocumentPlus />
                <span className='ml-2' onClick={() => setIsOpen(true)}>
                  Добавить документ
                </span>
              </button>
            </div>
          </div>
          <div className='relative'>
            <RxMagnifyingGlass className='absolute top-5 left-2 w-5 h-5' />
            <input type='search' placeholder='Search' className='mt-3 mr-10 w-[280px] border-b border-gray-300 pl-8 py-1 focus:outline-none focus:border-[#FFB27D]' value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
      </div>
    </>
  )
}

export default DocumentsToolbar