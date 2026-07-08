import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UpdateCategorySchema, type UpdateCategoryType } from "./schemas/update-category-schema";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { ResponseMessage } from "../../../../../components/Messages";
import { ButtonDashboard } from "../../../../../components/Buttons";
import { InputRadioDashboard, InputTextDashboard } from "../../../../../components/Inputs";
import type { Category } from "../../../../../types/models";
import { updateCategoryApi } from "../../../../../store/thunks/productsThunk";
import { useEffect } from "react";
import { resetResponseProducts } from "../../../../../store/slices/productsSlice";

export default function UpdateCategory({ index, category }: { index: number, category: Category }) {
  const { loadingAction, responseMessage } = useAppSelector(s => s.products);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(UpdateCategorySchema),
    defaultValues: { name: category.name, description: category.description, active: category.active }
  });
  const dispatch = useAppDispatch();

  const onSubmit = (data: UpdateCategoryType) => {
    dispatch(updateCategoryApi({ index, categoryId: category._id, data }));
  }

  useEffect(() => {
    dispatch(resetResponseProducts());
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="mb-5">Modifica el nombre, descripcion o estado de tu categoría. Ten en cuenta que el nombre no debe ser igual a otra categoría ya registrada.</p>

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
          <ButtonDashboard type="submit" loading={loadingAction}>Actualizar</ButtonDashboard>
        </div>

        <ResponseMessage {...responseMessage} />
      </div>
    </form>
  );
}