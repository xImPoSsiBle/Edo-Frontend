import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { logout } from "../../store/reducer/UserSlice";
import { FaUser } from "react-icons/fa";

export default function Header() {
    const { isAuth, user } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();

    return (
        <header className="fixed top-0 right-0 w-[82%] h-16 flex items-center justify-end px-4 z-[5] rounded-l-xl mt-5 bg-[#FCFCFC] shadow-[0_0_10px_1px_rgba(218,218,218,1)] ">
            {isAuth
                ? <div className="flex gap-4 items-center justify-center mr-5" onClick={() => dispatch(logout())}>
                    <span className="text-justify">{user?.username}</span>
                    <FaUser className="w-7 h-7 rounded-full" />
                </div>
                : <div className="flex gap-4 mr-5">
                    <Link to="/login">
                        <div className="cursor-pointer">Login</div>
                    </Link>
                    <Link to="/register">
                        <div className="cursor-pointer">Sign In</div>
                    </Link>
                </div>
            }
        </header>
    )
}
