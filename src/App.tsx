import { useEffect } from 'react';
import DocumentDetails from './components/DocumentDetail/DocumentDetails';
import DocumentTable from './components/DocumentsTable/DocumentsTable';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Sidebar from './components/Sidebar/Sidebar';
import { useAppSelector } from './hooks/redux';
import './index.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

export default function App() {
  const { pathname } = useLocation()
  const authPaths = ['/login', '/register']
  const isAuthRoute = authPaths.includes(pathname)

  const {isAuth} = useAppSelector(state => state.user)
  const navigate = useNavigate()


  useEffect(() => {
    if(!isAuth && !isAuthRoute) {
      navigate('/login')
      return;
    }
    navigate('/inbox')
  }, [isAuth])

  return (
    <div>
      {!isAuthRoute && <Header />}
      {!isAuthRoute && <Sidebar />}
      <Routes>
        <Route path="/inbox" element={<DocumentTable title='Входящие'/>} />
        <Route path="/sent" element={<DocumentTable title='Отправлено'/>} />
        <Route path="/approved" element={<DocumentTable title='Утвержденные'/>} />
        <Route path="/document/:id" element={<DocumentDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}
