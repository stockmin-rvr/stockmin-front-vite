import { ButtonActions, ButtonDashboard } from "../../../../components/Buttons";
import { DataTable } from "../../../../components/DataTable";
import { PlusIconSM } from "../../../../components/Icons";
import type { Brand } from "../../../../types/models";


const data:Brand[] = []; 

export default function BrandProductPage() {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="w-full flex justify-between items-center shrink-0">
        <div className="text-neutral-200">
          <h1 className="text-xl font-semibold">Marcas</h1>
          <p>Administra las marcas de tus productos</p>
        </div>
        <ButtonDashboard 
          icon={<PlusIconSM/>}
          // onClick={() => {openModal({title:"Crear marca", content:<CreateBrandModal/>})}}
        >
          Crear marca
        </ButtonDashboard>
      </div>

      <DataTable
          loading={true}
          className='w-full h-0 flex-1'
          header={['Nombre', 'Origen', 'Productos', 'Estado', 'Acciones']}
          data={data?.map(brand => [
            brand.name, 
            brand.origin, 
            "0", 
            brand.active?
              <span className="w-20 text-center bg-success-100/30 text-success-300 text-xs px-2 rounded-full">ACTIVO</span>
              :
              <span className=" w-20 text-center bg-danger-100/30 text-danger-300 text-xs px-2 rounded-full">INACTIVO</span>, 

            <ButtonActions
              actions={[

              ]}
            />
          ])}
        />
    </div>
  );
}