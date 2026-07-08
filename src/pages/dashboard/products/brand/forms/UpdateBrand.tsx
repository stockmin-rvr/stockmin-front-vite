import type { Brand } from "../../../../../types/models";
import { useForm } from "react-hook-form";
import { UpdateBrandSchema, type UpdateBrandType } from "./schemas/update-brand-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputRadioDashboard, InputTextDashboard } from "../../../../../components/Inputs";
import { ButtonDashboard } from "../../../../../components/Buttons";
import { ResponseMessage } from "../../../../../components/Messages";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { updateBrandApi } from "../../../../../store/thunks/productsThunk";
import { useEffect } from "react";
import { resetResponseProducts } from "../../../../../store/slices/productsSlice";

export default function UpdateBrand({ index, brand }: { index: number, brand: Brand }) {
  const {loadingAction, responseMessage } = useAppSelector(s => s.products);
  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(UpdateBrandSchema),
    defaultValues: { name: brand.name, origin: brand.origin || "", active: brand.active }
  });

  const onSubmit = (data: UpdateBrandType) => {
    dispatch(updateBrandApi({ brandId: brand._id, data, index }))
  }

  useEffect(() => {
    dispatch(resetResponseProducts());
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="mb-5">Modifica el nombre, origen o estado de tu marca. Ten en cuenta que el nombre no debe ser igual a otra marca ya registrada.</p>

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
          <ButtonDashboard type="submit" loading={loadingAction}>Actualizar</ButtonDashboard>
        </div>

        <ResponseMessage {...responseMessage} />
      </div>
    </form>
  );
}