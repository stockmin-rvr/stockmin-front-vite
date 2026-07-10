import { MdDeleteForever } from "react-icons/md";
import type { Product } from "../../../../../types/models";
import { ButtonDashboard } from "../../../../../components/Buttons";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { ResponseMessage } from "../../../../../components/Messages";
import { useEffect } from "react";
import { resetResponseProducts } from "../../../../../store/slices/productsSlice";
import { deleteProductApi } from "../../../../../store/thunks/productsThunk";

export default function DeleteProduct({ index, product }: { index: number, product: Product }) {
  const { loadingAction, responseMessage } = useAppSelector(s => s.products);
  const dispatch = useAppDispatch();

  const deleteProduct = () => {
    dispatch(deleteProductApi({ index, productId: product._id }));
  }

  useEffect(() => {
    dispatch(resetResponseProducts());
  }, []);
  return (
    <div className="flex flex-col items-center" >
      <MdDeleteForever className="text-danger-300 text-9xl" />
      <p className="text-center">Estas a punto de eliminar el siguiente producto:</p>
      <span className="font-semibold bg-neutral-100/50 p-2 rounded-xl my-2">{product.name} [{product.code}]</span>
      <p className="text-center mb-5">Ten en cuenta que esta acción no se pude deshacer. ¿Te gustaría continuar?</p>
      {responseMessage.type !== 'success' &&
        <ButtonDashboard color="danger" onClick={deleteProduct} loading={loadingAction}>Si, eliminar</ButtonDashboard>
      }
      <ResponseMessage {...responseMessage} />
    </div>
  );
}