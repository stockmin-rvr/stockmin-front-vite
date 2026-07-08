import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import TableUnitActives from "./components/TableUnitActives";
import TableUnitAvailables from "./components/TableUnitAvailables";
import { findAllMeasurementUnitsApi } from "../../../../store/thunks/productsThunk";

export default function MeasurementUnitProductsPage() {
  const [measurementUnits, setMeasurementUnits] = useState<'active' | 'available'>('available');
  const { measurementUnits:data, loading } = useAppSelector(s => s.products);
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(findAllMeasurementUnitsApi());
  }, [])
  return (
    <div className="w-full h-0 flex-1 flex flex-col gap-4">
      <div className="text-neutral-200">
        <h1 className="text-xl font-semibold">Unidades de Medida</h1>
        <p>Gestiona las unidades de medida disponibles</p>
      </div>
      <div className="flex gap-4">
        <span
          className={`${measurementUnits === 'active' ? 'border-b-2 border-secondary-300 text-secondary-300' : 'text-neutral-200'} cursor-pointer`}
          onClick={() => { setMeasurementUnits('active') }}
        >Unidades activas</span>
        <span
          className={`${measurementUnits === 'available' ? 'border-b-2 border-secondary-300 text-secondary-300' : 'text-neutral-200'} cursor-pointer`}
          onClick={() => { setMeasurementUnits('available') }}
        >Unidades disponibles</span>
      </div>

      {measurementUnits === 'active' ?
        <TableUnitActives data={data || []} loading={loading} />
        :
        <TableUnitAvailables data={data || []} loading={loading} />
      }
    </div>
  );
}