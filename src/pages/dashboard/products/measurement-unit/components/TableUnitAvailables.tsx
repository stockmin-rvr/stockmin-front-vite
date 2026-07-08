import { MdOutlineMoreVert } from "react-icons/md";
import DetailsUnitModal from "./DetailsUnit";
import type { MeasurementUnit } from "../../../../../types/models";
import { useModal } from "../../../../../hooks/useModal";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { DataTable } from "../../../../../components/DataTable";
import { createMeasurementUnitApi, deleteMeasurementUnitApi } from "../../../../../store/thunks/productsThunk";

type TableUnitAvailablesProp = {
  data: MeasurementUnit[],
  loading: boolean
}

export default function TableUnitAvailables({ data, loading }: TableUnitAvailablesProp) {

  const { loadingAction } = useAppSelector(s => s.products);
  const { openModal } = useModal();
  const dispatch = useAppDispatch();

  const createMeasurementUnit = async (index: number, code: string) => {
    dispatch(createMeasurementUnitApi({index, code}));
  }

  const deleteMeasurementUnit = async (index: number, unitId: string) => {
    dispatch(deleteMeasurementUnitApi({index, unitId}));
  }

  return (
    <DataTable
      loading={loading}
      className="w-full h-0 flex-1"
      header={['Nombre', 'Abreviatura', 'Descripción', 'Acciones']}
      data={data.map((mu, index) => [
        <div className="w-full max-w-35 truncate text-sm font-semibold">{mu.name.toUpperCase()}</div>,
        <div className="w-full max-w-20 flex justify-center items-center text-sm border-primary-100 bg-primary-100/10 text-primary-100 border-2 rounded-lg">{mu.abbreviation}</div>,
        <div className="w-full max-w-38 sm:max-w-65 md:max-w-[40vw] truncate">{mu.description}</div>,
        <div className="w-full flex gap-4 items-center">
          <button
            className={`h-6 w-20 border ${mu._id ? 'border-danger-300 text-danger-300' : 'border-success-300 text-success-300'} px-2 flex justify-center items-center rounded-full text-xs  cursor-pointer disabled:text-neutral-200 disabled:border-neutral-200 disabled:cursor-not-allowed`}
            onClick={() => { if (mu._id) deleteMeasurementUnit(index, mu._id); else createMeasurementUnit(index, mu.code) }}
            disabled={loadingAction}
          >
            {mu._id ? 'QUITAR' : 'AGREGAR'}
          </button>

          <button
            className="w-6 h-6 hover:bg-primary-100/20 flex justify-center items-center  rounded-full text-sm text-neutral-200 cursor-pointer"
            onClick={() => {
              openModal({
                title: "Unidad de medida",
                size: 'md',
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