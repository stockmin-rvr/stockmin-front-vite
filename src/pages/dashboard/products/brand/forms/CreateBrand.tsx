import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateBrandSchema, type CreateBrandType } from "./schemas/create-brand-schema";
import { InputRadioDashboard, InputTextDashboard } from "../../../../../components/Inputs";
import { ButtonDashboard } from "../../../../../components/Buttons";
import { ResponseMessage } from "../../../../../components/Messages";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { createBrandApi } from "../../../../../store/thunks/productsThunk";
import { useEffect } from "react";
import { resetResponseProducts } from "../../../../../store/slices/productsSlice";

export default function CreateBrand() {
  const {loadingAction, responseMessage } = useAppSelector(s => s.products);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(CreateBrandSchema), defaultValues: { active: true } });

  const onSubmit = (data: CreateBrandType) => {
    dispatch(createBrandApi(data));
  }

  useEffect(() => {
    dispatch(resetResponseProducts());
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="mb-5">Registra un nombre único de la nueva marca y el origen de la misma si es q lo prefieres. Esta marca será usada para registrar nuevos productos, siempre y cuando este activa.</p>

      <div className="flex flex-col gap-4" >
        <InputTextDashboard
          {...register("name")}
          placeholder="Nombre de la marca"
          error={errors.name?.message}
        />

        <InputTextDashboard
          {...register("origin")}
          placeholder="Lugar de origen (opcional)"
          error={errors.origin?.message}
        />

        <InputRadioDashboard label="Activa" {...register("active")} />

        <div className="flex justify-center">
          <ButtonDashboard type="submit" loading={loadingAction}>Crear</ButtonDashboard>
        </div>

        <ResponseMessage {...responseMessage} />
      </div>
    </form>
  );
}