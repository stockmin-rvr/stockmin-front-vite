import { useForm } from "react-hook-form";
import { RegisterBranchSchema, type RegisterBranchType } from "./schema/register-branch-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { InputFile, InputTextAuth } from "../../../../components/Inputs";
import { CompanyIconSM, DocumentIconSM, LocationIconSM, MessageIconSM } from "../../../../components/Icons";
import { ButtonAuth } from "../../../../components/Buttons";

export default function RegisterBranchForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(RegisterBranchSchema) });
    const [logo, setLogo] = useState<File | null>(null);

    const onSubmit = (data: RegisterBranchType) => {
        console.log(data);
        console.log('LOGO: ', logo);
    }

    return (
        <form className="w-full flex flex-col items-center gap-4 " onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full flex flex-col gap-8">
                <InputTextAuth placeholder="Nombre" icon={<CompanyIconSM />} error={errors.name?.message} {...register('name')} />
                <InputTextAuth placeholder="Nit" icon={<DocumentIconSM />} error={errors.nit?.message} {...register('nit')} />
                <InputTextAuth placeholder="Ubicación" icon={<LocationIconSM />} error={errors.location?.message} {...register('location')} />
                <InputTextAuth placeholder="Números de contacto" icon={<MessageIconSM />} error={errors.contacts?.message} {...register('contacts')} />

                <InputFile
                    placeholder="El logo debe tener un tamaño de 1200x800 con un peso máximo de 500KB"
                    onChangeFile={(file) => { setLogo(file) }}
                    maxSize={500}
                />
            </div>

            <div className="flex flex-col gap-2 items-center">
                <ButtonAuth color="primary" type="submit">Registrar</ButtonAuth>
                <span className="text-danger-300 text-center" >{}</span>
            </div>
        </form>
    );
}