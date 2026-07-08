import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateCategorySchema, type CreateCategoryType } from "./schemas/create-category-schema";
import { InputRadioDashboard, InputTextDashboard } from "../../../../../components/Inputs";
import { ButtonDashboard } from "../../../../../components/Buttons";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { ResponseMessage } from "../../../../../components/Messages";
import { createCategoryApi } from "../../../../../store/thunks/productsThunk";
import { useEffect } from "react";
import { resetResponseProducts } from "../../../../../store/slices/productsSlice";


export default function CreateCategory() {
  const dispatch = useAppDispatch();
  const { loadingAction, responseMessage } = useAppSelector(s => s.products);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(CreateCategorySchema), defaultValues: { active: true } });

  const onSubmit = (data: CreateCategoryType) => {
    dispatch(createCategoryApi(data));
  }

  useEffect(() => {
    dispatch(resetResponseProducts());
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="mb-5">Registra un nombre único de la nueva categoría y la descripcion de la misma si es que lo prefieres. Esta categoría será usada para registrar nuevos productos, siempre y cuando este activa.</p>

      <div className="flex flex-col gap-4" >
        <InputTextDashboard
          {...register("name")}
          placeholder="Nombre de la categoría"
          error={errors.name?.message}
        />

        <InputTextDashboard
          {...register("description")}
          placeholder="Descripción (opcional)"
          error={errors.description?.message}
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