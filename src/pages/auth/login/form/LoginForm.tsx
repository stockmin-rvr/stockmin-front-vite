import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginSchema, type LoginType } from "./schemas/login-schema";
import { EmailIconSM, LockIconSM } from "../../../../components/Icons";
import { InputPasswordAuth, InputTextAuth } from "../../../../components/Inputs";
import { ButtonAuth } from "../../../../components/Buttons";

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(LoginSchema) });

//   const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = (data: LoginType) => {
    console.log(data);
  }
  return (
    <form className="w-full flex flex-col items-center gap-4" onSubmit={handleSubmit(onSubmit)}>
      <InputTextAuth placeholder="Correo" icon={<EmailIconSM />} {...register("email")} error={errors.email?.message}/>
      <InputPasswordAuth placeholder="Contraseña" icon={<LockIconSM />} {...register("password")}/>

      <div>
        <ButtonAuth color="primary" type="submit" >Iniciar sesión</ButtonAuth>
      </div>
      <span className="text-danger-300">{error}</span>
    </form>
  );
}