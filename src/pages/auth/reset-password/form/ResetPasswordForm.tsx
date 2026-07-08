import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UpdatePasswordSchema, type UpdatePasswordType } from "./schema/reset-password-schema";
import { FaCheckCircle } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { InputPasswordAuth } from "../../../../components/Inputs";
import { ButtonAuth } from "../../../../components/Buttons";
import { useNavigate } from "react-router";
import { LockIconSM } from "../../../../components/Icons";
import { updatePasswordOwnerApi } from "../../../../store/thunks/ownerThunk";

type ResetPasswordFormProp = {
    ownerId: string;
}

export default function ResetPasswordForm({ ownerId }: ResetPasswordFormProp) {
    const navigation = useNavigate();
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(UpdatePasswordSchema) });
    const { loading, responseMessage } = useAppSelector(s => s.owner);

    const onSubmit = (data: UpdatePasswordType) => {
        console.log(data);
        dispatch(updatePasswordOwnerApi({ownerId, ...data}));
    }

    return (
        <form className="w-full flex flex-col items-center gap-6" onSubmit={handleSubmit(onSubmit)}>
            <InputPasswordAuth
                placeholder="Nueva contraseña"
                disabled={responseMessage.type === "success"}
                icon={<LockIconSM />}
                error={errors.password?.message}
                {...register("password")}
            />
            <InputPasswordAuth
                placeholder="Repite la contraseña"
                disabled={responseMessage.type === "success"}
                icon={<LockIconSM />}
                error={errors.rePassword?.message}
                {...register("rePassword")}
            />

            {!responseMessage.type && (
                <ButtonAuth color="primary" type="submit" loading={loading}>Cambiar contraseña</ButtonAuth>
            )}
            {responseMessage.type === "success" && (
                <>
                    <p className="text-success-300 flex items-center gap-2 text-center"><FaCheckCircle />{responseMessage.message}</p>
                    <ButtonAuth color="primary" onClick={() => navigation('/auth/login')}>Ir al login</ButtonAuth>
                </>
            )}
            {responseMessage.type === "error" && (
                <>
                    <p className="text-danger-300 flex items-center gap-2 text-center">{responseMessage.message}</p>
                    <ButtonAuth color="primary" type="submit" loading={loading}>Intentar nuevamente</ButtonAuth>
                </>
            )}
        </form>
    );
}