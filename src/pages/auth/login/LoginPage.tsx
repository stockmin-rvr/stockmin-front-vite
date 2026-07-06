import { ContentAuth } from "../components/AuthContent";
import logoVertical from "../../../assets/logos/logo-vertical.png";
import LoginForm from "./form/LoginForm";
import { Link } from "react-router";
import { useModal } from "../../../hooks/useModal";
import ResetPasswordForm from "./form/ResetPasswordForm";

export default function LoginPage() {
    const { openModal } = useModal();

    return (
        <ContentAuth type="login">
            <div className="text-center">
                <h1 className="text-primary-300 text-4xl">Bienvenido</h1>
                <h2 className="text-secondary-300 text-xl">Inicia sesión con tu cuenta</h2>
            </div>

            <div className="relative w-full h-30 sm:h-40 md:h-50 my-4">
                <img src={logoVertical} alt="logo-vertical-stockmin" className="w-full h-full object-contain" loading="eager" />
            </div>

            <LoginForm />

            <div className="text-center mt-4">

                <p>¿Olvidaste tu contraseña? <span className="text-primary-300 cursor-pointer" onClick={() => {
                    openModal({
                        title: 'titulo',
                        size: 'sm',
                        closeOnEscape: true,
                        closeOnOutside: true,
                        render: () => (<ResetPasswordForm/>),
                    })
                }}>Recupérala</span></p>
                <p>¿No tienes cuenta? <Link className="text-primary-300 cursor-pointer" to='/auth/register'>Regístrate</Link></p>
            </div>
        </ContentAuth>
    );
}