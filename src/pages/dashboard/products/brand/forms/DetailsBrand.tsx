import { formatDate, getAbbreviation } from "../../../../../helpers/text-format";
import type { Brand } from "../../../../../types/models";

export default function DetailsBrand({brand}:{brand:Brand}) {

  return (
    <div className="flex flex-col gap-4 justify-center" >
      <div className="flex justify-center items-center">
        <span className="w-25 h-25 flex justify-center items-center text-5xl bg-primary-100/20 font-semibold text-primary-200 rounded-lg" >{getAbbreviation(brand.name)}</span>
      </div>
      <div>
        <h2 className="font-semibold text-3xl">{brand.name}</h2>
        <p className="text-neutral-100 uppercase flex gap-2">
          {brand.origin} 
          <span 
            className={`${brand.active?"bg-success-100/30 text-success-300":"bg-danger-100/30 text-danger-300"} px-3 rounded-full text-sm flex justify-center items-center`}>
            {brand.active?"ACTIVO":"INACTIVO"}
          </span>
        </p>

        <p className="mt-4" >La marca esta siendo usada en <span className="font-semibold">0</span> productos</p>

        <div className="bg-neutral-100/10 border-2 border-neutral-100/50 rounded-xl p-4 flex mt-4">
          <div className="text-neutral-200 text-sm">
            <p>Fecha de creación</p>
            <p>{formatDate({date: brand.createdAt, showTime:true})}</p>
          </div>

          <div className="bg-neutral-100/50 h-10 w-0.5 mx-3 rounded-full"/>

          <div className="text-neutral-200 text-sm">
            <p>Ultima actualización</p>
            <p>{formatDate({date: brand.updatedAt, showTime:true})}</p>
          </div>
        </div>
      </div>
    </div>
  );
}