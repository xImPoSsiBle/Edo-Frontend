import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { LoginUser } from "../../store/reducer/ActionCreators"
import { MdOutlineEmail } from "react-icons/md"
import { FaLock } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { isLoading, error, isAuth } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const handleLogin = async () => {
        if (!email || !password) return alert('Заполните все поля')

        await dispatch(LoginUser({ email, password })).unwrap();
        navigate("/inbox", { replace: true });

    }

    useEffect(() => {
        if (isAuth) {
            navigate('/inbox')
        }
    }, [isAuth])

    return (
        <div className="w-full h-screen flex">
            {error && <p className="text-white fixed">{error}</p>}
            {isLoading && <p className="text-white fixed">Loading...</p>}
            <div className="w-[60%] flex flex-col items-center justify-center h-full bg-linear-to-b from-[#0575E6] via-[#02298A] to-[#021B79] overflow-hidden">
                <div className="text-white mr-35">
                    <p className="text-5xl">Документооборот</p>
                    <p className="text-xl">Электронный документооборот</p>
                </div>
                <div className="w-[554px] h-[554px] border border-[#0575E6] rounded-full absolute top-130 right-285"></div>
                <div className="w-[554px] h-[554px] border border-[#0575E6] rounded-full absolute top-135 right-265"></div>
            </div>
            <div className="h-full w-[40%] flex flex-col items-center justify-center text-[#333333]">
                <div>
                    <p className="text-3xl font-[700]">Здравствуйте!</p>
                    <p className="text-xl">Добро пожаловать</p>
                </div>
                <div className="flex flex-col gap-4 mt-[40px]">
                    <div className="relative">
                        <MdOutlineEmail className="absolute top-5 left-5 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Email"
                            className="border border-[#EEEEEE] w-[300px] h-[60px] pl-12 pr-4 rounded-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <FaLock className="absolute top-5 left-5 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Пароль"
                            className="border border-[#EEEEEE] w-[300px] h-[60px] pl-12 pr-4 rounded-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className="w-[300px] h-[60px] bg-[#0575E6] rounded-full text-white cursor-pointer"
                        onClick={handleLogin}
                    >
                        Войти
                    </button>
                </div>
                <div className="flex gap-2 mt-4">
                    <p>Нет аккаунта?</p>
                    <p className="text-[#0575E6] cursor-pointer" onClick={() => navigate('/register')}>Зарегистрироваться</p>
                </div>
            </div>
        </div>
    )
}

export default Login