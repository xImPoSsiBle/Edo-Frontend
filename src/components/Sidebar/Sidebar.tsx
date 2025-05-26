import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  }

  return (
    <aside className="fixed top-0 left-0 w-60 h-[100vh] bg-gray-100 border-r px-4 py-6">
      <h1 className="text-2xl font-bold">EDO</h1>
      <div className="mt-4 space-y-2">
        <p className="cursor-pointer" onClick={() => handleClick('/sent')}>Отправлено</p>
        <p className="cursor-pointer" onClick={() => handleClick('/inbox')}>Входящие</p>
        <p className="cursor-pointer" onClick={() => handleClick('/approved')}>Утвержденные</p>
        <p className="cursor-pointer" onClick={() => handleClick('/rejected')}>Отклоненные</p>
      </div>
    </aside>
  )
}

export default Sidebar