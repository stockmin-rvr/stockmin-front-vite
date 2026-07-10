import { ButtonActions, ButtonDashboard } from "../../../../components/Buttons";
import { DataTable } from "../../../../components/DataTable";
import { PlusIconSM } from "../../../../components/Icons";
import { useModal } from "../../../../hooks/useModal";
import { useAppSelector } from "../../../../store/hooks";
import CreateProduct from "./forms/CreateProduct";
import DeleteProduct from "./forms/DeleteProduct";
import DetailsProduct from "./forms/DetailsProduct";
import UpdateProduct from "./forms/UpdateProduct";
import imgDefault from "../../../../assets/logos/logo.png";

export default function ListProductPage() {
  const { openModal } = useModal();
  const { loading, products } = useAppSelector(s => s.products);

  return (
    <div className="w-full h-0 flex-1 flex flex-col gap-4">
      <div className="w-full flex justify-between items-center shrink-0">
        <div className="text-neutral-200">
          <h1 className="text-xl font-semibold">Productos</h1>
          <p>Administra todos los productos de tu sucursal</p>
        </div>
        <ButtonDashboard
          icon={<PlusIconSM />}
          onClick={() => {
            openModal({
              title: 'Nuevo producto',
              size: 'lg',
              closeOnEscape: true,
              closeOnOutside: true,
              render: () => <CreateProduct />
            })
          }}
        >
          Crear producto
        </ButtonDashboard>
      </div>

      <DataTable
        loading={loading}
        alignment="center"
        className='w-full h-0 flex-1'
        header={['Imagen', 'Nombre', 'Código', 'Estado', 'Acciones']}
        data={products.map((product, index) => [
          <div className="w-20 h-20 flex justify-center items-center">
            <img className="h-full" src={product.img?.url || imgDefault} alt={product.code} loading="lazy" />
          </div>,
          product.name,
          product.code,
          product.active ?
            <span className="w-20 text-center bg-success-100/30 text-success-300 text-xs px-2 rounded-full">ACTIVO</span>
            :
            <span className=" w-20 text-center bg-danger-100/30 text-danger-300 text-xs px-2 rounded-full">INACTIVO</span>,
          <ButtonActions
            actions={[
              {
                color: 'primary', type: 'edit', onClick: () => {
                  openModal({
                    title: 'Actualizar producto',
                    size: 'lg',
                    closeOnEscape: true,
                    closeOnOutside: true,
                    render: () => <UpdateProduct index={index} product={product} />
                  })
                }
              },
              {
                color: 'danger', type: 'delete', onClick: () => {
                  openModal({
                    title: 'Eliminar producto',
                    size: 'md',
                    closeOnEscape: true,
                    closeOnOutside: true,
                    render: () => <DeleteProduct index={index} product={product} />
                  })
                }
              },
              {
                color: 'neutral', type: 'more', onClick: () => {
                  openModal({
                    title: 'Detalles de producto',
                    size: 'md',
                    closeOnEscape: true,
                    closeOnOutside: true,
                    render: () => <DetailsProduct product={product} />
                  })
                }
              }
            ]}
          />
        ])}
      />
    </div>
  );
}