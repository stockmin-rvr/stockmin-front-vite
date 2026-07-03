import { Link } from "react-router";
import { ContentAuth } from "../../../components/AuthContent";
import RegisterForm from "./form/RegisterForm";

export default function RegisterPage() {
    return (
        <ContentAuth type="register">
            <div className="flex flex-col text-center">
                <h1 className="text-primary-300 text-4xl">Regístrate</h1>
                <h2 className="text-secondary-300 text-xl">Ingresa tus datos</h2>
            </div>

            <RegisterForm />

            <div className="text-center">
                <p>¿Ya estas registrado? <Link className="text-primary-300 cursor-pointer" to="/auth/login">Inicia sesion</Link></p>
            </div>
        </ContentAuth>
    );
}