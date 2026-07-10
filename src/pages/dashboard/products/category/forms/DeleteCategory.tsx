import { MdDeleteForever } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { ResponseMessage } from "../../../../../components/Messages";
import { ButtonDashboard } from "../../../../../components/Buttons";
import { deleteCategoryApi } from "../../../../../store/thunks/productsThunk";
import type { Category } from "../../../../../types/models";
import { resetResponseProducts } from "../../../../../store/slices/productsSlice";
import { useEffect } from "react";

export default function DeleteCategory({ index, category }: { index: number, category: Category }) {
  const dispatch = useAppDispatch();
  const { loadingAction, responseMessage } = useAppSelector(s => s.products);

  const deleteCategory = () => {
    dispatch(deleteCategoryApi({ categoryId: category._id, index }));
  }

  useEffect(() => {
    dispatch(resetResponseProducts());
  }, []);
  return (
    <div className="flex flex-col justify-center items-center" >
      <MdDeleteForever className="text-danger-300 text-9xl" />
      <p className="mb-5 text-center">Estas a punto de eliminar la siguiente categoría:</p>
      <span className="font-semibold bg-neutral-100/50 p-2 rounded-xl my-2">{category.name}</span>
      <p>Ten en cuenta que esta acción no se pude deshacer y los productos que estén usando esta categoría quedaran “sin categoría”.</p>
      {responseMessage.type !== 'success' &&
        <ButtonDashboard color="danger" onClick={deleteCategory} loading={loadingAction}>Si, eliminar</ButtonDashboard>
      }

      <ResponseMessage {...responseMessage} />
    </div>
  );
}