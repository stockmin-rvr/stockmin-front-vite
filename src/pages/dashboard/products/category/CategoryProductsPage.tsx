import { ButtonActions, ButtonDashboard } from "../../../../components/Buttons";
import { DataTable } from "../../../../components/DataTable";
import { PlusIconSM } from "../../../../components/Icons";
import { useModal } from "../../../../hooks/useModal";
import { useAppSelector } from "../../../../store/hooks";
import CreateCategory from "./forms/CreateCategory";
import DeleteCategory from "./forms/DeleteCategory";
import DetailsCategory from "./forms/DetailsCategory";
import UpdateCategory from "./forms/UpdateCategory";


export default function CategoryProductsPage() {
  const { loading, categories } = useAppSelector(s => s.products);
  const { openModal } = useModal();

  return (
    <div className="w-full h-0 flex-1 flex flex-col gap-4">
      <div className="w-full flex justify-between items-center shrink-0">
        <div className="text-neutral-200">
          <h1 className="text-xl font-semibold">Categorías</h1>
          <p>Organiza tus productos por categorías</p>
        </div>
        <ButtonDashboard
          icon={<PlusIconSM />}
          onClick={() => {
            openModal({
              title: "Crear categoría",
              closeOnEscape: true,
              closeOnOutside: true,
              size: 'sm',
              render: () => (<CreateCategory />)
            })
          }}
        >
          Crear categoría
        </ButtonDashboard>
      </div>

      <DataTable
        loading={loading}
        className='w-full h-0 flex-1'
        alignment="center"
        header={['Nombre', 'Origen', 'Productos', 'Estado', 'Acciones']}
        data={categories.map((category, index) => [
          category.name,
          category.description,
          "0",
          category.active ?
            <span className="w-20 text-center bg-success-100/30 text-success-300 text-xs px-2 rounded-full">ACTIVO</span>
            :
            <span className="w-20 text-center bg-danger-100/30 text-danger-300 text-xs px-2 rounded-full">INACTIVO</span>,
          <ButtonActions
            actions={[
              {
                color: 'primary', type: 'edit', onClick: () => {
                  openModal({
                    title: 'Nueva marca',
                    size: 'md',
                    closeOnEscape: true,
                    closeOnOutside: true,
                    render: () => <UpdateCategory index={index} category={category} />
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
                    render: () => <DeleteCategory index={index} category={category} />
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
                    render: () => <DetailsCategory category={category} />
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