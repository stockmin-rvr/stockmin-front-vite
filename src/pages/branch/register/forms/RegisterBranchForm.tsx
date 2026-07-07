import { useForm } from "react-hook-form";
import { CreateBranchSchema, type CreateBranchType } from "./schema/register-branch-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { InputFile, InputTextAuth } from "../../../../components/Inputs";
import { CompanyIconSM, DocumentIconSM, LocationIconSM, MessageIconSM } from "../../../../components/Icons";
import { ButtonAuth } from "../../../../components/Buttons";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { createBranch } from "../../../../store/thunks/branchThunk";

export default function RegisterBranchForm() {
    const { loading, responseMessage } = useAppSelector(s => s.branch);
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(CreateBranchSchema) });
    const [file, setFile] = useState<File | null>(null);
    const dispatch = useAppDispatch();

    const onSubmit = (data: CreateBranchType) => {
        dispatch(createBranch(data, file))
    }

    return (
        <form className="w-full flex flex-col items-center gap-4 " onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full flex flex-col gap-8">
                <InputTextAuth
                    placeholder="Nombre"
                    icon={<CompanyIconSM />}
                    error={errors.name?.message}
                    {...register('name')}
                />
                <InputTextAuth
                    placeholder="Nit"
                    icon={<DocumentIconSM />}
                    error={errors.nit?.message}
                    {...register('nit')}
                />
                <InputTextAuth
                    placeholder="Ubicación"
                    icon={<LocationIconSM />}
                    error={errors.location?.message}
                    {...register('location')}
                />
                <InputTextAuth
                    placeholder="Números de contacto"
                    icon={<MessageIconSM />}
                    error={errors.contacts?.message}
                    {...register('contacts')}
                />

                <InputFile
                    placeholder="El logo debe tener un tamaño de 1200x800 con un peso máximo de 500KB"
                    onChangeFile={(file) => { setFile(file) }}
                    maxSize={500}
                />
            </div>

            <div className="flex flex-col gap-2 items-center">
                <div className={`text-center border-2 border-dashed rounded-lg p-2
                    ${responseMessage.type === 'error' ? 'border-danger-300 text-danger-300' : ''}
                    ${responseMessage.type === 'success' ? 'border-success-300 text-success-300' : ''}
                    ${responseMessage.message === '' ? 'hidden' : ''}
                    `}
                >
                    {responseMessage.message}
                </div>
                <ButtonAuth color="primary" type="submit" loading={loading}>Registrar</ButtonAuth>
            </div>
        </form>
    );
}