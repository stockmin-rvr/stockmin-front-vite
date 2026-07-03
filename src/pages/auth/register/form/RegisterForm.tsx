import { useForm } from "react-hook-form";
import { RegisterSchema, type RegisterType } from "./schema/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailIconSM, LockIconSM, UserIconSM } from "../../../../components/Icons";
import { InputPasswordAuth, InputTextAuth } from "../../../../components/Inputs";
import { ButtonAuth } from "../../../../components/Buttons";


export default function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(RegisterSchema) });

    const onSubmit = (data: RegisterType) => {
        console.log(data)
        
    }

    return (
        <form className="w-full flex flex-col items-center gap-4 my-4" onSubmit={handleSubmit(onSubmit)}>
            <InputTextAuth placeholder="Nombres" icon={<UserIconSM />} error={errors.name?.message} {...register("name")} />
            <InputTextAuth placeholder="Apellidos" icon={<UserIconSM />} error={errors.lastname?.message} {...register("lastname")} />
            <InputTextAuth placeholder="Correo" icon={<EmailIconSM />} error={errors.email?.message} {...register("email")} />

            <InputPasswordAuth placeholder="Contraseña" icon={<LockIconSM />} error={errors.password?.message} {...register("password")} />
            <InputPasswordAuth placeholder="Repite la contraseña" icon={<LockIconSM />} error={errors.rePassword?.message} {...register("rePassword")} />

            <ButtonAuth color="primary" type="submit" >Siguiente</ButtonAuth>
        </form>
    );
}