import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RequestResetPasswordSchema, type RequestResetPasswordType } from "./schemas/request-reset-password";
import { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { InputTextAuth } from "../../../../components/Inputs";
import { EmailIconSM } from "../../../../components/Icons";
import { ButtonAuth } from "../../../../components/Buttons";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { requestResetPasswordOwnerApi } from "../../../../store/thunks/ownerThunk";
import { resetResponseOwner } from "../../../../store/slices/ownerSlice";

export default function ResetPasswordForm() {
    const dispatch = useAppDispatch();
    const {loading, responseMessage} = useAppSelector(s => s.owner);
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(RequestResetPasswordSchema) });

    const onSubmit = (data: RequestResetPasswordType) => {
        dispatch(requestResetPasswordOwnerApi(data));
    }

    useEffect(() => {
        dispatch(resetResponseOwner());
    }, [])

    return (
        <div>
            {loading && (
                <div className="flex-col justify-center items-center gap-4">
                    <div className="flex justify-center items-center mb-6">
                        <div className="flex relative">
                            <div className="w-20 h-20 rounded-full border-4 border-primary-100" />
                            <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-primary-300 animate-spin" />
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold mb-2 text-center">
                        Enviando solicitud de recuperación de contraseña...
                    </h2>

                    <p className="text-sm text-foreground/60 text-center">Esto solo tomará unos segundos</p>
                </div>
            )}

            {(responseMessage.type === null) && !loading && (
                <form className="flex gap-4 flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
                    <p className="text-center">Ingresa el correo de tu cuenta. Enviaremos un link de recuperación a tu bandeja de entrada.</p>
                    <div>
                        <InputTextAuth icon={<EmailIconSM />} placeholder="Correo" {...register('email')} error={errors.email?.message} />
                    </div>

                    <ButtonAuth type="submit">Aceptar</ButtonAuth>
                </form>
            )}

            {responseMessage.type === 'success' && (
                <div className="flex flex-col items-center gap-4">
                    <FaCheckCircle className="text-success-300 text-7xl mb-4" />

                    <h2 className="text-xl font-semibold mb-2">Solicitud enviada</h2>

                    <p className="text-sm text-foreground/60 mb-6 text-center">{responseMessage.message}</p>
                </div>
            )}

            {responseMessage.type === 'error' && (
                <div className="flex flex-col items-center gap-4">
                    <FaTimesCircle className="text-danger-300 text-7xl mb-4" />

                    <h2 className="text-xl font-semibold mb-2">Error al enviar la solicitud</h2>

                    <p className="text-sm text-foreground/60 mb-6">{responseMessage.message}</p>
                    <ButtonAuth onClick={() => { dispatch(resetResponseOwner()) }}>Volver a intentar</ButtonAuth>
                </div>
            )}
        </div>
    );
}