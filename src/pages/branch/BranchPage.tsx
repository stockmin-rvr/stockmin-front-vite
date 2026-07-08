import { Link, useNavigate } from "react-router";
import { ContentAuth } from "../auth/components/AuthContent";
import { LoadingIconSM, PlusIconSM } from "../../components/Icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import BranchCard from "./components/BranchCard";
import { useEffect } from "react";
import { findAllBranchApi, loginBranchApi } from "../../store/thunks/branchThunk";
import type { Branch } from "../../types/models";

export default function BranchPage() {
  const {loading, list} = useAppSelector(s => s.branch);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const branchJSON = localStorage.getItem('branch');
    if(branchJSON){
      const branch:Branch = JSON.parse(branchJSON);
      dispatch(loginBranchApi(branch));
      navigate('/dashboard');
    }else{
      dispatch(findAllBranchApi());
    }
  }, [])

  return (
    <ContentAuth type="login">
      <div className="flex gap-4 flex-col items-center justify-center text-center">
        <h1 className="text-primary-300 text-4xl" >Elige tu sucursal</h1>
        <h2 className="text-secondary-300 text-xl">Selecciona la sucursal a las que ingresaras</h2>
      </div>

      <div className="w-full p-4 flex flex-col gap-4">
        {loading && (
          <div className="w-full flex justify-center text-xl"><LoadingIconSM className="text-primary-300 animate-spin" /></div>
        )}
        {list?.map((branch, i) => (
          <BranchCard branch={branch} key={i} />
        ))}

        <Link className="w-full h-30 border border-neutral-200 text-neutral-200 opacity-70 hover:opacity-100 border-dashed flex justify-center items-center gap-4 cursor-pointer rounded-2xl" to="/branch/register">
          <PlusIconSM /> Registra una nueva sucursal
        </Link>
      </div>
    </ContentAuth>
  );
}