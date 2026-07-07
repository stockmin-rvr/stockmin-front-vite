import type { Branch } from "../../../types/models";
import logo from "../../../assets/logos/logo-vertical.png";
import { useAppDispatch } from "../../../store/hooks";
import { useNavigate } from "react-router";
import { loginBranch } from "../../../store/thunks/branchThunk";

type BranchCardProp = {
    branch: Branch;
}

export default function BranchCard({ branch }: BranchCardProp) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const selectBranch = () => {
        dispatch(loginBranch(branch));
        navigate('/dashboard');
    }

    return (
        <div className={`relative w-full h-30 p-4 border border-neutral-200 text-neutral-200 flex items-center gap-4 rounded-2xl hover:opacity-100 overflow-hidden cursor-pointer opacity-80`} onClick={selectBranch}>

            <div className="w-1/2 flex justify-center items-center overflow-hidden">
                <div className="relative w-30 h-20">
                    <img src={branch.logoUrl === ''? logo:branch.logoUrl} alt={"nombre"} className="object-contain" />
                </div>
            </div>
            <div className="w-1/2 text-sm">
                <h2 className="font-semibold">{branch.name}</h2>
                <p className="truncate">{branch.nit}</p>
                <p className="truncate">{branch.location}</p>
                <p className="truncate">{branch.contacts}</p>
            </div>
        </div>
    );
}