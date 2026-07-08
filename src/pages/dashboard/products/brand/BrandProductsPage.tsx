import { useEffect } from "react";
import { ButtonActions, ButtonDashboard } from "../../../../components/Buttons";
import { DataTable } from "../../../../components/DataTable";
import { PlusIconSM } from "../../../../components/Icons";
import { useModal } from "../../../../hooks/useModal";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import CreateBrand from "./forms/CreateBrand";
import { findAllBrandsApi } from "../../../../store/thunks/productsThunk";
import UpdateBrand from "./forms/UpdateBrand";
import DeleteBrand from "./forms/DeleteBrand";
import DetailsBrand from "./forms/DetailsBrand";

export default function BrandProductPage() {
  const { brands, loading } = useAppSelector(s => s.products);
  const { openModal } = useModal();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(findAllBrandsApi());
  }, [])
  return (
    <div className="w-full h-0 flex-1 flex flex-col gap-4">
      <div className="w-full flex justify-between items-center shrink-0">
        <div className="text-neutral-200">
          <h1 className="text-xl font-semibold">Marcas</h1>
          <p>Administra las marcas de tus productos</p>
        </div>
        <ButtonDashboard
          icon={<PlusIconSM />}
          onClick={() => {
            openModal({
              title: 'Nueva marca',
              size: 'md',
              closeOnEscape: true,
              closeOnOutside: true,
              render: () => <CreateBrand />
            })
          }}
        >
          Crear marca
        </ButtonDashboard>
      </div>

      <DataTable
        loading={loading}
        alignment="center"
        className='w-full h-0 flex-1'
        header={['Nombre', 'Origen', 'Productos', 'Estado', 'Acciones']}
        data={brands.map((brand, index) => [
          brand.name,
          brand.origin,
          "0",
          brand.active ?
            <span className="w-20 text-center bg-success-100/30 text-success-300 text-xs px-2 rounded-full">ACTIVO</span>
            :
            <span className=" w-20 text-center bg-danger-100/30 text-danger-300 text-xs px-2 rounded-full">INACTIVO</span>,
          <ButtonActions
            actions={[
              {
                color: 'primary', type: 'edit', onClick: () => {
                  openModal({
                    title: 'Nueva marca',
                    size: 'md',
                    closeOnEscape: true,
                    closeOnOutside: true,
                    render: () => <UpdateBrand index={index} brand={brand} />
                  })
                }
              },
              {
                color: 'danger', type: 'delete', onClick: () => {
                  openModal({
                    title: 'Eliminar marca',
                    size: 'md',
                    closeOnEscape: true,
                    closeOnOutside: true,
                    render: () => <DeleteBrand index={index} brand={brand} />
                  })
                }
              },
              {
                color: 'neutral', type: 'more', onClick: () => {
                  openModal({
                    title: 'Eliminar marca',
                    size: 'md',
                    closeOnEscape: true,
                    closeOnOutside: true,
                    render: () => <DetailsBrand brand={brand} />
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