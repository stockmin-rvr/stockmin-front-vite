import { formatDate } from "../../../../../helpers/text-format";
import type { Product } from "../../../../../types/models";
import logo from "../../../../../assets/logos/logo.png";
import { TextViewer } from "../../../../../components/TextEditor";

export default function DetailsProduct({ product }: { product: Product }) {

  return (
    <div className="flex flex-col gap-4 justify-center" >
      <div className="flex justify-center items-center">
        <div className="w-50 h-50 flex justify-center items-center text-5xl bg-primary-100/20 font-semibold text-primary-200 rounded-lg">
          <img className="h-full" src={product.img?.url || logo} alt={product.code} />
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-3xl">{product.name}</h2>
        <p className="text-neutral-100 uppercase flex gap-2">
          {product.code}
          <span
            className={`${product.active ? "bg-success-100/30 text-success-300" : "bg-danger-100/30 text-danger-300"} px-3 rounded-full text-sm flex justify-center items-center`}>
            {product.active ? "ACTIVO" : "INACTIVO"}
          </span>
        </p>

        <div className="my-3">
          <p><span className="font-semibold">MARCA:</span> {product.brand? product.brand.name : 'Sin marca'}</p>
          <p><span className="font-semibold">CATEGORÍA:</span> {product.category? product.category.name:'Sin categoría'}</p>
          <p><span className="font-semibold">UNIDAD DE MEDIDA:</span> {product.measurementUnit? product.measurementUnit.name.toUpperCase():'Sin medida'}</p>
        </div>

        <p className="font-semibold">DESCRIPCION:</p>
        <TextViewer content={product.description}/>

        <div className="bg-neutral-100/10 border-2 border-neutral-100/50 rounded-xl p-4 flex mt-4">
          <div className="text-neutral-200 text-sm">
            <p>Fecha de creación</p>
            <p>{formatDate({ date: product.createdAt, showTime: true })}</p>
          </div>

          <div className="bg-neutral-100/50 h-10 w-0.5 mx-3 rounded-full" />

          <div className="text-neutral-200 text-sm">
            <p>Ultima actualización</p>
            <p>{formatDate({ date: product.updatedAt, showTime: true })}</p>
          </div>
        </div>
      </div>
    </div>
  );
}