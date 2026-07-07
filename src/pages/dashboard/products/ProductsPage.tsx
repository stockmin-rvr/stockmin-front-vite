import { CiBoxes, CiRuler } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineCategory } from "react-icons/md";
import { TbBrandDeliveroo } from "react-icons/tb";
import { Link, Outlet, useLocation } from "react-router";

export default function ProductsPage() {
  return (
    <div className="w-full h-full flex gap-4 flex-col">
      <HeaderProducts/>
      <Outlet/>
    </div>
  );
}

type HeaderItem = {
    title: string;
    subtitle: string;
    path: string;
    icon: React.ReactNode;
}

function HeaderProducts() {
    const { pathname } = useLocation();

    const headerItems: HeaderItem[] = [
        {
            title: "Marcas",
            subtitle: "Administra las marcas de tus productos",
            path: "/dashboard/products/brand",
            icon: <TbBrandDeliveroo />
        },
        {
            title: "Categorías",
            subtitle: "Organiza tus productos por categorías",
            path: "/dashboard/products/category",
            icon: <MdOutlineCategory />
        },
        {
            title: "Unidades de Medida",
            subtitle: "Gestiona las unidades de medida disponibles",
            path: "/dashboard/products/measurement-unit",
            icon: <CiRuler />
        },
        {
            title: "Lista",
            subtitle: "Gestiona todos los aspectos relacionados a tus productos",
            path: "/dashboard/products/list",
            icon: <CiBoxes />
        },
    ]


    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex flex-row items-center gap-4">
                <div className="flex justify-center items-center bg-secondary-300 w-10 h-10 rounded-xl text-white text-3xl">
                    <CiBoxes />
                </div>
                <div className="text-primary-300">
                    <h1 className="font-semibold text-2xl">Productos</h1>
                    <h2>Gestiona todos los aspectos relacionados a tus productos</h2>
                </div>
            </div>

            <div className="w-full grid grid-cols-4 gap-2">
                {headerItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className={`w-full flex flex-row items-center gap-4 border p-4 rounded-xl 
                            ${pathname === item.path ? 'border-secondary-300' : 'border-neutral-200'}`}
                    >
                        <div className={`${pathname === item.path ? "bg-secondary-300" : "bg-neutral-100"} flex justify-center items-center w-10 h-10 rounded-xl text-white text-3xl shrink-0`}
                        >
                            {item.icon}
                        </div>
                        <div className={`${pathname === item.path ? "text-primary-300" : "text-neutral-200"} w-[calc(100%-75px)]`}>
                            <h1 className="font-semibold truncate">{item.title}</h1>
                            <p className="text-xs truncate">{item.subtitle}</p>
                        </div>
                        <div className="flex-none w-4" >
                            <IoIosArrowForward className={pathname === item.path ? "text-secondary-300" : "text-neutral-200"} />
                        </div>
                    </Link>
                ))
                }
            </div>
        </div>
    );
}