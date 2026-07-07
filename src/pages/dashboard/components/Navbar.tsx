import React, { useState } from "react";
import { TbBrandDeliveroo } from "react-icons/tb";
import { CiBoxes, CiRuler } from "react-icons/ci";
import { FaListUl } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { useAppSelector } from "../../../store/hooks";
import { CompanyIconSM } from "../../../components/Icons";
import { Link, useLocation } from "react-router";
import logoVertical from "../../../assets/logos/logo-vertical.png";

type NavbarItemType = {
  name: string;
  path: string;
  icon: React.ReactNode;
  subItems: { name: string, path: string, access: boolean, icon: React.ReactNode }[]
}

export default function Navbar() {
  const { isOpenNavbar } = useAppSelector(s => s.theme);
  const { branch } = useAppSelector(s => s.branch);

  const navbarItems: NavbarItemType[] = [
    {
      name: "Productos",
      path: "/dashboard/products/list",
      icon: <CiBoxes />,
      subItems: [
        { name: "Lista", path: "/dashboard/products/list", access: true, icon: <FaListUl /> },
        { name: "Marcas", path: "/dashboard/products/brand", access: true, icon: <TbBrandDeliveroo /> },
        { name: "Categorías", path: "/dashboard/products/category", access: true, icon: <MdOutlineCategory /> },
        { name: "Unidades de medida", path: "/dashboard/products/measurement-unit", access: true, icon: <CiRuler /> }
      ]
    },
    {
      name: "Almacenes",
      path: "/dashboard/products/warehouses",
      icon: <CompanyIconSM />,
      subItems: [
        { name: "Lista", path: "/dashboard/products/list", access: true, icon: <CompanyIconSM /> },
        { name: "Opciones", path: "/dashboard/products/list", access: true, icon: <CompanyIconSM /> },
        { name: "Historial", path: "/dashboard/products/list", access: true, icon: <CompanyIconSM /> }
      ]
    },
    {
      name: "Compras",
      path: "/dashboard/products/shopping",
      icon: <CompanyIconSM />,
      subItems: [
        { name: "Lista", path: "/dashboard/products/list", access: true, icon: <CompanyIconSM /> },
        { name: "Opciones", path: "/dashboard/products/list", access: true, icon: <CompanyIconSM /> },
        { name: "Historial", path: "/dashboard/products/list", access: true, icon: <CompanyIconSM /> }
      ]
    },
    {
      name: "Ventas",
      path: "/dashboard/products/sales",
      icon: <CompanyIconSM />,
      subItems: [
        { name: "Lista", path: "/dashboard/products/list", access: true, icon: <CompanyIconSM /> },
        { name: "Opciones", path: "/dashboard/products/list", access: true, icon: <CompanyIconSM /> },
        { name: "Historial", path: "/dashboard/products/list", access: true, icon: <CompanyIconSM /> }
      ]
    }
  ]

  return (
    <div className={`${isOpenNavbar ? "w-55" : "w-14.5"} flex gap-8 flex-col bg-content rounded-xl transition-[width] duration-200 p-1 shrink-0`} >
      <div className={`${isOpenNavbar? 'p-4':'p-0'}`}>
        <img src={(branch?.logoUrl === '') ? logoVertical:branch?.logoUrl} alt="logo-sucursal" className="w-full" />
      </div>

      <div className="p-2 flex flex-col gap-4">
        {navbarItems.map((item, index) => <NavbarItem navbarItem={item} key={index} isOpen={isOpenNavbar} />)}
      </div>
    </div>
  );
}

const NavbarItem = ({ navbarItem, isOpen }: { navbarItem: NavbarItemType, isOpen: boolean }) => {
  const { pathname } = useLocation();
  const [openSubItems, setOpenSubItems] = useState(pathname === navbarItem.path);

  return (
    <div className="w-full">
      <button
        className={`${isOpen ? 'text-start px-4' : 'flex relative justify-center items-center'} w-full flex items-center gap-2 bg-primary-300 text-white py-2 rounded-full cursor-pointer group`}
        onClick={() => { setOpenSubItems(!openSubItems) }}
      >
        <span className="text-lg">{navbarItem.icon}</span>{isOpen ? navbarItem.name : ""}

        {!isOpen &&
          <div className="absolute hidden left-7 top-0 group-hover:flex ps-5">
            <div className="w-52 bg-content rounded-lg text-primary-300 p-4 shadow">
              {navbarItem.subItems.map((subItem, index) => (
                <Link
                  className={`w-full flex items-center gap-2 text-start text-sm text-primary-300 border-b-2 border-secondary-300 rounded-t-lg cursor-pointer hover:bg-secondary-300/10 ${pathname === subItem.path ? 'bg-secondary-300/10' : ''}`}
                  key={index}
                  to={subItem.path}
                >
                  {subItem.icon} {subItem.name}
                </Link>
              ))}
            </div>
          </div>}
      </button>

      <div className={`${(!openSubItems || !isOpen) ? "hidden" : ""} flex flex-col gap-1 items-start ps-4 pe-2`}>
        {navbarItem.subItems.map((subItem, index) => (
          <Link
            key={index}
            to={subItem.path}
            className={`w-full flex items-center gap-2 text-start text-sm text-primary-300 border-b-2 border-secondary-300 rounded-t-lg cursor-pointer hover:bg-secondary-300/10 ${pathname === subItem.path ? 'bg-secondary-300/10' : ''}`}
          >
            {subItem.icon} {subItem.name}
          </Link>
        ))}
      </div>
    </div>
  )
}