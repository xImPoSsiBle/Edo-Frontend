import { useState, useEffect } from "react";
import mammoth from "mammoth";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import type { IDoc } from "../../models/Document";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface IDocDetails {
    docDetails: IDoc | null
}

const DocumentEditor: React.FC<IDocDetails> = ({ docDetails }) => {
    const { token, user } = useAppSelector(state => state.user);

    const [htmlContent, setHtmlContent] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchAndConvert = async () => {
            if (!docDetails?.id) return;
            setIsLoading(true);
            try {
                const response = await fetch(
                    `http://localhost:8080/api/docs/${docDetails.id}/download`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const blob = await response.blob();
                const arrayBuffer = await blob.arrayBuffer();

                const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
                setHtmlContent(html);
            } catch (err) {
                console.error("Ошибка при загрузке документа:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAndConvert();
    }, [docDetails]);

    const handleSaveApprove = async () => {
        if (!docDetails?.id) return;
        try {
            const response = await axios.put(
                `http://localhost:8080/api/docs/${docDetails.id}/approve`,
                null,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            if (response.status === 200) {
                alert("Документ утверждён!");
                navigate('/')
            }

        } catch (err) {
            console.error("Ошибка при утверждении документа:", err);
            alert("Не удалось утвердить документ");
        }
    };

    const handleSaveReject = async () => {
        if (!docDetails?.id) return;
        try {
            const response = await axios.put(
                `http://localhost:8080/api/docs/${docDetails.id}/reject`,
                null,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            if (response.status === 200) {
                alert("Документ отклонён!");
                navigate('/')
            }

        } catch (err) {
            console.error("Ошибка при отклонении документа:", err);
            alert("Не удалось отклонить документ");
        }
    };

    if (!docDetails) {
        return <div>Загрузка метаданных документа...</div>;
    }

    if (isLoading) {
        return <div>Конвертация документа в HTML...</div>;
    }

    return (
        <div className="flex flex-col gap-4 mb-10">
            <div
                contentEditable
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                onInput={e => setHtmlContent(e.currentTarget.innerHTML)}
                className="border p-4 min-h-[300px] h-[600px] bg-white overflow-y-scroll"
            />
            {docDetails.recipient.email == user?.email &&
                <div className="flex gap-4">
                    <button
                        onClick={handleSaveApprove}
                        disabled={!htmlContent}
                        className="bg-[#FFB27D] hover:bg-orange-500 transition text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Утвердить
                    </button>
                    <button
                        onClick={handleSaveReject}
                        disabled={!htmlContent}
                        className="bg-[#FFB27D] hover:bg-orange-500 transition text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Отклонить
                    </button>
                </div>
            }
        </div>
    );
};

export default DocumentEditor;
