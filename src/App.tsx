import DocumentDetails from './components/DocumentDetail/DocumentDetails';
import DocumentTable from './components/DocumentsTable/DocumentsTable';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Sidebar from './components/Sidebar/Sidebar';
import './index.css'
import { Route, Routes, useLocation } from 'react-router-dom';

export default function App() {
  const { pathname } = useLocation()
  const authPaths = ['/login', '/register']
  const isAuthRoute = authPaths.includes(pathname)

  return (
    <div>
      {!isAuthRoute && <Header />}
      {!isAuthRoute && <Sidebar />}
      <Routes>
        <Route path="/" element={<DocumentTable />} />
        <Route path="/document/:id" element={<DocumentDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}
