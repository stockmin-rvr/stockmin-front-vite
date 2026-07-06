import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema, type LoginType } from "./schemas/login-schema";
import { EmailIconSM, LockIconSM } from "../../../../components/Icons";
import { InputPasswordAuth, InputTextAuth } from "../../../../components/Inputs";
import { ButtonAuth } from "../../../../components/Buttons";
import { loginOwner } from "../../../../store/thunks/ownerThunk";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { useEffect } from "react";
import { resetOwnerResponse } from "../../../../store/slices/ownerSlice";

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(LoginSchema) });
  const dispatch = useAppDispatch();
  const {loading, responseMessage} = useAppSelector(s => s.owner);

  const onSubmit = (data: LoginType) => {
    dispatch(loginOwner(data));
  }
  
  useEffect(() => {
    dispatch(resetOwnerResponse());
  }, []);

  return (
    <form className="w-full flex flex-col items-center gap-4" onSubmit={handleSubmit(onSubmit)}>
      <InputTextAuth placeholder="Correo" icon={<EmailIconSM />} {...register("email")} error={errors.email?.message}/>
      <InputPasswordAuth placeholder="Contraseña" icon={<LockIconSM />} {...register("password")}/>

      <div>
        <ButtonAuth color="primary" type="submit" loading={loading}>Iniciar sesión</ButtonAuth>
      </div>
      {responseMessage.type === 'error'&&
        <span className="text-danger-300">{responseMessage.message}</span>
      }
    </form>
  );
}