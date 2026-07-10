import { MdDeleteForever } from "react-icons/md";
import type { Brand } from "../../../../../types/models";
import { ButtonDashboard } from "../../../../../components/Buttons";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { ResponseMessage } from "../../../../../components/Messages";
import { deleteBrandApi } from "../../../../../store/thunks/productsThunk";
import { useEffect } from "react";
import { resetResponseProducts } from "../../../../../store/slices/productsSlice";

export default function DeleteBrand({index, brand}:{index: number, brand:Brand}) {
  const {loadingAction, responseMessage } = useAppSelector(s => s.products);
  const dispatch = useAppDispatch();

  const deleteBrand = () => {
    dispatch(deleteBrandApi({index, brandId:brand._id}))
  }

  useEffect(() => {
    dispatch(resetResponseProducts());
  }, []);
  return (
    <div className="flex flex-col justify-center items-center" >
      <MdDeleteForever className="text-danger-300 text-9xl" />
      <p className="text-center">Estas a punto de eliminar la siguiente marca:</p>
      <span className="font-semibold bg-neutral-100/50 p-2 rounded-xl my-2">{brand.name}</span>
      <p className="text-center mb-5">Ten en cuenta que esta acción no se pude deshacer y los productos que estén usando esta marca quedaran “sin marca”.</p>
      {responseMessage.type !== 'success'&&
        <ButtonDashboard color="danger" onClick={deleteBrand} loading={loadingAction}>Si, eliminar</ButtonDashboard>
      }

      <ResponseMessage {...responseMessage} />
    </div>
  );
}