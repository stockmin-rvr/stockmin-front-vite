import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type FieldErrors } from "react-hook-form";
import { CreateProductSchema, type CreateProductType } from "./schemas/create-product-schema";
import { InputRadioDashboard, SelectDashboard, InputTextDashboard, InputFileDashboard } from "../../../../../components/Inputs";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { ButtonDashboard } from "../../../../../components/Buttons";
import { useState } from "react";
import TextEditor from "../../../../../components/TextEditor";
import { createProductApi } from "../../../../../store/thunks/productsThunk";
import { ResponseMessage } from "../../../../../components/Messages";

export default function CreateProduct() {
    const { register, handleSubmit, control, formState: { errors } } = useForm({ resolver: zodResolver(CreateProductSchema), defaultValues: { active: true, description:"<p></p>" } });
    const { loadingAction, brands, categories, measurementUnits, responseMessage } = useAppSelector(s => s.products);
    const [file, setFile] = useState<File | null>(null);
    const dispatch = useAppDispatch();

    const onSubmit = (data: CreateProductType) => {
        dispatch(createProductApi(data, file));
    }

    const onError = (errors: FieldErrors<CreateProductType>) => {
        console.log("Errores:", errors);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <p className="mb-5 text-neutral-100 ">Registra un nuevo producto para tu sucursal con un nombre que describa de forma breve el producto y usa un código único.</p>

            <div className="flex flex-col items-center gap-4">
                <div className="flex gap-4">
                    <div className="w-60">
                        <InputFileDashboard
                            placeholder="Peso máximo de 300KB"
                            onChangeFile={(file) => { setFile(file) }}
                            maxSize={300}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-6">
                            <SelectDashboard
                                {...register('brandId')}
                                label="Marca:"
                                placeholder="Sin marca"
                                disabled={loadingAction}
                                options={brands.map(b => ({ value: b._id, option: b.name }))}
                            />

                            <SelectDashboard
                                {...register('categoryId')}
                                label="categoría"
                                placeholder="Sin categoría"
                                disabled={loadingAction}
                                options={categories.map(c => ({ value: c._id, option: c.name }))}
                            />

                            <SelectDashboard
                                {...register('measuremetUnitCode')}
                                label="unidad de medida:"
                                placeholder="Sin medida"
                                disabled={loadingAction}
                                options={measurementUnits.filter(unit => unit._id).map(unit => ({ value: unit.code, option: unit.name }))}
                            />
                        </div>

                        <div className="flex flex-col gap-6">
                            <InputTextDashboard
                                label="Nombre: *"
                                disabled={loadingAction}
                                placeholder="Nombre"
                                {...register('name')}
                                error={errors.name?.message}
                            />
                            <InputTextDashboard
                                disabled={loadingAction}
                                label="Código: *"
                                placeholder="Código"
                                {...register('code')}
                                error={errors.code?.message}
                            />
                            <InputRadioDashboard label="Activo" {...register("active")} />
                        </div>

                    </div>
                </div>

                <div className="mb-4 w-full">
                    <Controller
                        control={control}
                        name="description"
                        render={({ field }) => (
                            <TextEditor
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Descripcion"
                            />
                        )}
                    />
                </div>
            </div>
            <div className="flex gap-4 flex-col items-center justify-center">
                <ButtonDashboard type="submit" loading={loadingAction}>Crear</ButtonDashboard>
                <ResponseMessage {...responseMessage} />
            </div>
        </form>
    );
}