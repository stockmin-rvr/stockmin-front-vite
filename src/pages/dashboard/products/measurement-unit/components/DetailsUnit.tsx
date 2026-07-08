import { formatDate } from "../../../../../helpers/text-format";
import type { MeasurementUnit } from "../../../../../types/models";

export default function DetailsUnitModal({data}:{data:MeasurementUnit}) {

  return (
    <div className="min-w-60 max-w-92 flex flex-col gap-4 justify-center" >
      <div className="flex justify-center items-center">
        <span className="min-w-25 h-25 flex justify-center items-center text-5xl bg-primary-100/20 font-semibold text-primary-200 px-2 rounded-lg" >{data.abbreviation}</span>
      </div>
      <div>
        <h2 className="font-semibold text-3xl">{data.name.toUpperCase()}</h2>
        <p className="text-neutral-100 uppercase flex gap-2">
          <span 
            className={`${data._id?"bg-success-100/30 text-success-300":"bg-danger-100/30 text-danger-300"} px-3 rounded-full text-sm flex justify-center items-center`}>
            {data._id?"ACTIVO":"INACTIVO"}
          </span>
        </p>

        <p className="mt-4">{ data.description }</p>
        <p>La unidad de medida esta siendo usada en <span className="font-semibold">0</span> productos</p>

        <div className="flex justify-center items-center mt-4">
          <div className="bg-neutral-100/10 border-2 border-neutral-100/50 rounded-xl p-4 text-neutral-200 text-sm text-center">
            <p className="font-semibold">Fecha de agregación:</p>
            <p>{data.createdAt? formatDate({date: data.createdAt, showTime:true}):"Unidad de medida no agregada"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}