import { ButtonDashboard } from "../../../../components/Buttons";
import { PlusIconSM } from "../../../../components/Icons";
import { useModal } from "../../../../hooks/useModal";
import CreateProduct from "./forms/CreateProduct";

export default function ListProductPage() {
  const { openModal } = useModal();

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
    </div>
  );
}