import { MdOutlineMoreVert } from "react-icons/md";
import DetailsUnitModal from "./DetailsUnit";
import type { MeasurementUnit } from "../../../../../types/models";
import { useModal } from "../../../../../hooks/useModal";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { DataTable } from "../../../../../components/DataTable";
import { deleteMeasurementUnitApi } from "../../../../../store/thunks/productsThunk";

type TableUnitActivesProp = {
  data: MeasurementUnit[],
  loading: boolean
}

export default function TableUnitActives({ data, loading }: TableUnitActivesProp) {
  const { loadingAction } = useAppSelector(s => s.products);
  const dispatch = useAppDispatch();
  const { openModal } = useModal();

  const deleteMeasurementUnit = async (index: number, unitId: string) => {
    dispatch(deleteMeasurementUnitApi({index, unitId}));
  }
  return (
    <DataTable
      loading={loading}
      className="w-full h-0 flex-1"
      header={['Nombre', 'Abreviatura', 'Descripción', 'Acciones']}
      data={data.filter(muf => muf._id).map((mu, index) => [
        <div className="w-full max-w-35 truncate text-sm font-semibold">{mu.name.toUpperCase()}</div>,
        <div className="w-full max-w-20 flex justify-center items-center text-sm border-primary-100 bg-primary-100/10 text-primary-100 border-2 rounded-lg">{mu.abbreviation}</div>,
        <div className="w-full max-w-38 sm:max-w-65 md:max-w-[40vw] truncate">{mu.description}</div>,
        <div className="w-full flex gap-4 items-center">
          <button
            className="h-6 w-20 border border-danger-300 px-2 flex justify-center items-center rounded-full text-xs text-danger-300 cursor-pointer disabled:text-neutral-200 disabled:border-neutral-200 disabled:cursor-not-allowed"
            onClick={() => { deleteMeasurementUnit(index, mu._id as string) }}
            disabled={loadingAction}
          >
            QUITAR
          </button>

          <button
            className="w-6 h-6 hover:bg-primary-100/20 flex justify-center items-center  rounded-full text-sm text-neutral-200 cursor-pointer"
            onClick={() => {
              openModal({
                title: "Unidad de medida",
                size: 'sm',
                closeOnEscape: true,
                closeOnOutside: true,
                render: () => <DetailsUnitModal data={mu} />
              })
            }}
          >
            <MdOutlineMoreVert />
          </button>
        </div>
      ])}
    />
  );
}