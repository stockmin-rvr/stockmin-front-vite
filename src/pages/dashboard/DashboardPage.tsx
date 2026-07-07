import { Outlet, useNavigate } from "react-router";
import Navbar from "./components/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import logoHorizontal from '../../assets/logos/logo-horizontal.png';
import { toggleNavbar, toggleTheme } from "../../store/slices/themeSlice";
import { IoMenu, IoMoonSharp } from "react-icons/io5";
import { FaSun } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { logoutBranch } from "../../store/thunks/branchThunk";

export default function DashboardPage() {
    return (
        <main className="w-screen h-screen flex gap-4 p-4">
            <Navbar />
            <div className="flex-1 flex flex-col gap-4">
                <Header/>
                <div className="w-full h-full bg-content rounded-xl p-4">
                    <Outlet />
                </div>
            </div>
        </main>
    );
}

function Header() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const logout = () => {
        dispatch(logoutBranch());
        navigate("/branch/list");
    }

    return (
        <div className="h-12 bg-content w-full flex items-center rounded-xl px-4 shrink-0">
            <div className="h-full flex gap-4">
                <button className="text-primary-300 text-2xl cursor-pointer" onClick={() => dispatch(toggleNavbar())}><IoMenu /></button>
                <div className="relative w-30 h-full flex justify-center items-center">
                    <img
                        src={logoHorizontal}
                        alt={"nombre"}
                        className="object-contain"
                    />
                </div>
            </div>

            <div className="ms-auto flex gap-2">
                <ToggleTheme />
                <button onClick={logout} className="w-8 h-8 flex justify-center items-center rounded-full bg-danger-300 text-white hover:opacity-80 cursor-pointer"><BiLogOut/></button>
            </div>
        </div>
    )
}

function ToggleTheme() {
  const { theme } = useAppSelector(s => s.theme);
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => { dispatch(toggleTheme()) }}
      className={`w-14 px-2 py-1.5 rounded-full bg-linear-to-r ${(theme === 'dark') ? 'from-primary-100/50 to-primary-200/50' : 'from-secondary-100/50 to-secondary-200/50'} shadow-[inset_0_2px_0_0_rgba(0,0,0,0.2)] transition-all cursor-pointer`}
    >
      <span className={`w-5 h-5 bg-content text-xs flex justify-center items-center rounded-full transition-transform duration-300 ease-in-out ${(theme === 'dark') ? "translate-x-5" : "translate-x-0"}`}>
        {(theme === 'dark') ? <IoMoonSharp /> : <FaSun className="text-secondary-300" />}
      </span>
    </button>
  )
}