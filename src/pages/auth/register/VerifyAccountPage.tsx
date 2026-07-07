import { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link, useSearchParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { verifyAccountOwner } from "../../../store/thunks/ownerThunk";
import { resetResponseOwner } from "../../../store/slices/ownerSlice";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { ButtonAuth } from "../../../components/Buttons";

export default function VerifyAccountPage() {
    const { loading, responseMessage } = useAppSelector(s => s.owner);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const email = searchParams.get("email") || '';
    const code = searchParams.get("code") || '';

    const verifyAccount = () => {
        dispatch(verifyAccountOwner({ email, code }))
    }

    useEffect(() => {
        dispatch(resetResponseOwner());
    }, [])

    return (
        <main className="w-screen h-screen flex items-center justify-center bg-background">
            <div className="bg-content rounded-3xl shadow-xl p-8 flex flex-col items-center text-center">
                {loading && (
                    <>
                        <div className="relative mb-6">
                            <div className="w-20 h-20 rounded-full border-4 border-primary-100" />
                            <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-primary-300 animate-spin" />
                        </div>

                        <h2 className="text-xl font-semibold mb-2">Verificando tu cuenta...</h2>
                        <p className="text-sm text-foreground/60">Esto solo tomará unos segundos</p>
                    </>
                )}

                {(!responseMessage.type && !loading) && (
                    <div className="max-w-100 flex flex-col justify-center items-center" >
                        <RiAccountPinCircleLine className="text-primary-300 text-7xl mb-4"/>
                        <p>La cuenta asociada al correo <span className="font-semibold">{email}</span> será verificada como cuenta valida en <span className="font-semibold">StockMin</span>.</p>
                        <p className="mb-4">Si el correo corresponde a tu cuenta presiona “Verificar ahora”.</p>
                        <ButtonAuth onClick={verifyAccount}>Verificar ahora</ButtonAuth>
                    </div>
                )
                }

                {(responseMessage.type === "success") && (
                    <>
                        <FaCheckCircle className="text-success-300 text-7xl mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Cuenta verificada</h2>
                        <p className="text-sm text-foreground/60 mb-6">Tu cuenta fue activada correctamente. Ya puedes iniciar sesión.</p>
                        <Link
                            to="/auth/login"
                            className="bg-primary-300 text-white px-6 py-2 rounded-full hover:opacity-90 transition-all cursor-pointer"
                        >
                            Ir al login
                        </Link>
                    </>
                )}

                {(responseMessage.type === "error") && (
                    <>
                        <FaTimesCircle className="text-danger-300 text-7xl mb-4" />

                        <h2 className="text-xl font-semibold mb-2">Error en la verificación</h2>
                        <p className="text-sm text-foreground/60 mb-6">{responseMessage.message}</p>

                        <Link to="/auth/login" className="bg-primary-300 text-white px-6 py-2 rounded-full hover:opacity-90 transition-all">
                            Volver al login
                        </Link>
                    </>
                )}
            </div>
        </main>
    );

}