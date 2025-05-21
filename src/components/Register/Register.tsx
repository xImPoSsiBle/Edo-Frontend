import { useState } from "react"
import { FaLock, FaUser } from "react-icons/fa6"
import { MdOutlineEmail } from "react-icons/md"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { registerUser } from "../../store/reducer/ActionCreators"


const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useAppDispatch()

    const { isLoading, error } = useAppSelector(state => state.user)

    const handleRegister = () => {
        if(!username || !email || !password) return alert('Заполните все поля')
        dispatch(registerUser({ username, email, password }))
    }

    return (
        <div className="w-full h-screen flex">
            {error && <p className="text-red-500">{error}</p>}
            {isLoading && <p>Loading...</p>}
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
                    <p className="text-xl">Зарегистрируйтесь чтобы начать</p>
                </div>
                <div className="flex flex-col gap-4 mt-[40px]">
                    <div className="relative">
                        <FaUser className="absolute top-5 left-5 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="ФИО"
                            className="border border-[#EEEEEE] w-[300px] h-[60px] pl-12 pr-4 rounded-full"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
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
                        onClick={handleRegister}
                    >
                        Регистрация
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Register