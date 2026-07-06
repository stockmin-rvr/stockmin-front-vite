import { Link } from "react-router";
import { ContentAuth } from "../../auth/components/AuthContent";
import RegisterBranchForm from "./forms/RegisterBranchForm";

export default function RegisterBranchPage() {
    return (
        <ContentAuth type="register">
            <div className="text-center mb-6">
                <h1 className="text-primary-300 text-4xl">Registra tu sucursal</h1>
                <h2 className="text-secondary-300 text-xl">Ingresa los datos de tu sucursal</h2>
            </div>
            <RegisterBranchForm />
            <div className="text-center">
                <Link className="text-primary-300 cursor-pointer" to='/branch/list'>Registrar en otro momento</Link>
            </div>
        </ContentAuth>
    );
}