import type { Branch } from "../../../types/models";

type BranchCardProp = {
    branch: Branch;
}

export default function BranchCard({ branch }: BranchCardProp) {
    const loading = false;

    const openBranch = () => {
        if (!loading) {
            console.log(branch);
            // setLoading(true);
            // localStorage.setItem("branch", JSON.stringify(branch))
            // setBranch(branch);
            // router.push(`/dashboard`);
        }
    }

    return (
        <div className={`relative w-full h-30 p-4 border border-neutral-200 text-neutral-200 flex items-center gap-4 rounded-2xl hover:opacity-100  overflow-hidden ${loading ? "cursor-not-allowed opacity-100" : "cursor-pointer opacity-80"}`} onClick={openBranch}>

            {loading &&
                <div className="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-neutral-300/30 text-white backdrop-blur-sm z-20">
                    Ingresando...
                </div>
            }

            <div className="w-1/2 flex justify-center items-center overflow-hidden">
                <div className="relative w-30 h-20">
                    <img src={branch.logoUrl} alt={"nombre"} className="object-contain" />
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