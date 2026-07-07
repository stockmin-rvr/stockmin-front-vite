import { IoMoonSharp } from "react-icons/io5";
import login from "../../../assets/svg/login.svg";
import register from "../../../assets/svg/register.svg";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { toggleTheme } from "../../../store/slices/themeSlice";
import { FaSun } from "react-icons/fa";
import type { Owner } from "../../../types/models";
import { useEffect, useState } from "react";
import { logoutOwner, resentVerificationOwner } from "../../../store/thunks/ownerThunk";
import { ButtonAuth } from "../../../components/Buttons";
import { HiOutlineMailOpen } from "react-icons/hi";
import { TiWarningOutline } from "react-icons/ti";
import { useModal } from "../../../hooks/useModal";
import { resetResponseOwner } from "../../../store/slices/ownerSlice";


type ContentProp = {
  children: React.ReactNode;
  type: 'login' | 'register';
}

export function ContentAuth({ children, type }: ContentProp) {
  const { owner, verification } = useAppSelector(s => s.owner);

  return (
    <main className={`w-screen h-screen relative flex ${type === 'login' ? 'flex-row' : 'flex-row-reverse'} justify-between items-center`}>
      <header className="flex gap-2 items-center justify-end fixed top-0 left-0 right-0 p-2">
        {verification && <StateVerificationAccout owner={owner} verification={verification.state} />}
        <ToggleTheme />
        <OwnerAccount owner={owner} />
      </header>
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <div className="w-full max-w-130 flex flex-col gap-10 bg-content rounded-2xl p-4 md:p-14">
          <div className="sm:h-auto overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-1/2">
        {type === 'login' && <img src={login} alt="login-stockmin" loading="eager" />}
        {type === 'register' && <img src={register} alt="register-stockmin" loading="eager" />}
      </div>
    </main>
  );
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

function OwnerAccount({ owner }: { owner: Owner | null }) {
  const [showOwnerCard, setShowOwnerCard] = useState(false);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutOwner());
  }

  if (!owner) return null
  return (
    <>
      <button className="flex justify-center items-center w-8 h-8 rounded-full uppercase bg-primary-200 text-sm font-medium text-white cursor-pointer" onClick={() => { setShowOwnerCard(!showOwnerCard) }}>
        {owner.name.charAt(0)}{owner.lastname.charAt(0)}
      </button>

      {showOwnerCard &&
        <div className="absolute top-12 right-0 w-full max-w-xs bg-content rounded-2xl p-4 shadow-md border border-primary-100/20">

          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary-200 flex items-center justify-center text-white font-semibold">
              {owner.name.charAt(0)}
              {owner.lastname.charAt(0)}
            </div>

            <div>
              <p className="font-semibold text-sm">
                {owner.name} {owner.lastname}
              </p>
              <p className="text-xs text-foreground/60">{owner.email}</p>
            </div>
          </div>
          <div className="w-full flex">
            <button className="ms-auto bg-danger-200 opacity-80 hover:opacity-100 text-sm cursor-pointer px-2 py-1 rounded-full text-white" onClick={handleLogout}>Cerrar sesion</button>
          </div>
        </div>
      }
    </>
  )
}

function StateVerificationAccout({ owner, verification }: { owner: Owner | null, verification: boolean }) {
  const { openModal } = useModal();

  if (owner && !verification) {
    return (
      <div
        className="flex gap-2 justify-center border border-danger-300 items-center px-4 rounded-xl text-danger-300 cursor-pointer animate-led-danger"
        onClick={() => {
          openModal({
            title: 'titulo',
            size: 'md',
            closeOnEscape: true,
            closeOnOutside: true,
            render: () => (<UnverifiedAccount />),
          })
        }}
      >
        <TiWarningOutline /> Verificación necesaria
      </div>
    )
  } else {
    return null;
  }

}

function UnverifiedAccount() {
  const { owner, loading, responseMessage } = useAppSelector(s => s.owner);
  const dispatch = useAppDispatch();

  const resendVerification = async () => {
    const data = { ownerId: owner?._id || "", email: owner?.email || "" };
    dispatch(resentVerificationOwner(data));
  }

  useEffect(() => {
    dispatch(resetResponseOwner());
  }, [])

  return (
    <div className="max-w-125 flex flex-col gap-4 justify-center items-center">
      <HiOutlineMailOpen className="text-secondary-300 text-8xl" />
      <h1 className="font-semibold text-secondary-300 text-2xl">VERIFICACIÓN NECESARIA</h1>
      <p className="text-center">
        Por favor ingresa a la bandeja de entrada de tu correo{owner ? ` (${owner.email})` : ""}, busca el email que te enviamos y sigue las instrucciones para verificar tu cuenta.
      </p>

      <div className="flex gap-4 flex-col justify-center items-center">
        <ButtonAuth loading={loading} onClick={resendVerification} disabled={loading || responseMessage.message !== ''}> Volver a enviar email</ButtonAuth>

        {responseMessage.message !== '' &&
          <span
            className={`border border-dashed rounded-lg p-2
              ${responseMessage.type === 'error' ? 'text-danger-300 border-danger-300':'text-success-300 border-success-300'}
              `}
          >
            {responseMessage.message}
          </span>
        }
      </div>
    </div>
  );
}