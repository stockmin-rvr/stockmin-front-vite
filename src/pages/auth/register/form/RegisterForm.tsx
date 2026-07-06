import { useForm } from "react-hook-form";
import { CreateOwnerSchema, type CreateOwnerType } from "./schema/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailIconSM, LockIconSM, UserIconSM } from "../../../../components/Icons";
import { InputPasswordAuth, InputTextAuth } from "../../../../components/Inputs";
import { ButtonAuth } from "../../../../components/Buttons";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { createOwner } from "../../../../store/thunks/ownerThunk";
import { useEffect } from "react";
import { resetOwnerResponse } from "../../../../store/slices/ownerSlice";
import { Link, useNavigate } from "react-router";


export default function RegisterForm() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(CreateOwnerSchema) });
    const { loading, responseMessage } = useAppSelector(s => s.owner);

    const onSubmit = (data: CreateOwnerType) => {
        dispatch(createOwner(data));
    }

    useEffect(() => {
        dispatch(resetOwnerResponse());
    }, [])

    return (
        <form className="w-full flex flex-col items-center gap-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <InputTextAuth
                placeholder="Nombres"
                icon={<UserIconSM />}
                error={errors.name?.message}
                disabled={responseMessage.type === 'success'}
                {...register("name")}
            />
            <InputTextAuth
                placeholder="Apellidos"
                icon={<UserIconSM />}
                error={errors.lastname?.message}
                disabled={responseMessage.type === 'success'}
                {...register("lastname")}
            />
            <InputTextAuth
                placeholder="Correo"
                icon={<EmailIconSM />}
                error={errors.email?.message}
                disabled={responseMessage.type === 'success'}
                {...register("email")}
            />

            <InputPasswordAuth
                placeholder="Contraseña"
                icon={<LockIconSM />}
                error={errors.password?.message}
                disabled={responseMessage.type === 'success'}
                {...register("password")}
            />
            <InputPasswordAuth
                placeholder="Repite la contraseña"
                icon={<LockIconSM />}
                error={errors.rePassword?.message}
                disabled={responseMessage.type === 'success'}
                {...register("rePassword")}
            />

            <div className={`text-center border-2 border-dashed rounded-lg p-2
                ${responseMessage.type === 'error' ? 'border-danger-300 text-danger-300' : ''}
                ${responseMessage.type === 'success' ? 'border-success-300 text-success-300' : ''}
                ${responseMessage.message === '' ? 'hidden' : ''}
                `}
            >
                {responseMessage.message}
            </div>

            {responseMessage.type === 'success' ?
                <ButtonAuth color="primary" type="button" loading={loading} onClick={() => navigate('/auth/login')}>Inicias sesion</ButtonAuth>
                :
                <>
                    <ButtonAuth color="primary" type="submit" loading={loading} >Siguiente</ButtonAuth>
                    <div className="text-center">
                        <p>¿Ya estas registrado? <Link className="text-primary-300 cursor-pointer" to="/auth/login">Inicia sesion</Link></p>
                    </div>
                </>
            }

        </form>
    );
}