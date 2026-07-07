import { FaTimesCircle } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { ContentAuth } from "../components/AuthContent";
import { Link, useSearchParams } from "react-router";
import ResetPasswordForm from "./form/ResetPasswordForm";
import { useEffect, useState } from "react";
import { verifyResetPasswordOwner } from "../../../store/thunks/ownerThunk";

export default function ResetPasswordPage() {
  const dispatch = useAppDispatch();
  const { loading, responseMessage } = useAppSelector(s => s.owner);
  const [ownerId, setOwnerId] = useState('');
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email") || '';
  const code = searchParams.get("code") || '';

  useEffect(() => {
    if (email && code) {
      dispatch(verifyResetPasswordOwner({ email, code }, setOwnerId));
    } else {
      console.log('No se encontraron las querys');
    }
  }, [])

  return (
    <ContentAuth type="register">
      {ownerId === '' ?
        <>
          {loading && (
            <div className="flex flex-col items-center gap-4">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full border-4 border-primary-100" />
                <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-primary-300 animate-spin" />
              </div>

              <h2 className="text-xl font-semibold mb-2">Verificando tu solicitud...</h2>

              <p className="text-sm text-foreground/60">
                Esto solo tomará unos segundos
              </p>
            </div>
          )}

          {responseMessage.type === 'error' && (
            <div className="flex flex-col items-center gap-4">
              <FaTimesCircle className="text-danger-300 text-7xl mb-4" />

              <h2 className="text-xl font-semibold">Error en la verificación</h2>
              <p className="text-sm text-foreground/60 mb-6 text-center">No encontramos una solicitud de cambio de contraseña para tu cuenta.</p>

              <Link
                to="/auth/login"
                className="bg-primary-300 text-white px-6 py-2 rounded-full hover:opacity-90 transition-all"
              >
                Volver al login
              </Link>
            </div>
          )}
        </>
        :
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col gap-4 text-center">
            <h1 className="text-primary-300 text-4xl">Crear nueva contraseña</h1>
            <h2 className="text-secondary-300 text-xl">Ingresa tu nueva contraseña</h2>
          </div>

          <ResetPasswordForm ownerId={ownerId} />
        </div>
      }
    </ContentAuth>
  );
}