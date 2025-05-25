import React, { useState } from "react";
import axios from "axios";


interface UploadFileModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadFileModal: React.FC<UploadFileModalProps> = ({ setIsOpen }) => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [tag, setTag] = useState("Запросы");
  const [recipient, setRecipient] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("tag", tag);
    formData.append("recipient", recipient);

    try {
      const token = localStorage.getItem("token");
      console.log(file, name, tag, recipient, token)
      const response = await axios.post("http://localhost:8080/api/docs/upload", formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setIsOpen(false);
      alert("Документ успешно отправлен");
    } catch (err) {
      console.error("Ошибка отправки документа", err);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[1000]" onClick={() => setIsOpen(false)}>
      <div className="flex flex-col w-[40%] h-[80%] bg-white rounded-xl shadow-[0_0_10px_1px_rgba(218,218,218,1)] z-[1000]" onClick={(e) => e.stopPropagation()}>
        <h1 className="text-3xl text-center mt-10">Загрузить документ</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center mt-20">
          <input
            type="file"
            accept=".doc,.docx"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-[50%]"
          />
          <input
            type="text"
            placeholder="Название"
            value={name} onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-[50%]"
          />
          <select value={tag} onChange={(e) => setTag(e.target.value)} className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-[50%]">
            <option value="Запросы">Запросы</option>
            <option value="Работа">Работа</option>
            <option value="Квитанции">Квитанции</option>
          </select>
          <input
            type="email"
            placeholder="Email получателя"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-[50%]"
          />
          <button type="submit" className="bg-[#FFB27D] hover:bg-orange-500 transition px-5 py-2 rounded-xl text-white w-[50%]">Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default UploadFileModal;
