import { BiError } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { VscError } from "react-icons/vsc";
import type { ResponseMessageType } from "../types/api";
import { MdInfo } from "react-icons/md";


export function ResponseMessage({message, type}:ResponseMessageType) {
    const style = {
        error: {class: 'border-danger-300 text-danger-300', icon: <VscError className="text-3xl"/>},
        success: {class: 'border-success-300 text-success-300', icon: <IoMdCheckmarkCircleOutline className="text-3xl" />},
        warning: {class: 'border-warning-300 text-warning-300', icon: <BiError className="text-3xl"/>},
        default: {class: 'border-neutral-200 text-neutral-200', icon: <MdInfo className="text-3xl"/>},
    }

    return(
        <div className={`${message === ""?"hidden":""} flex items-center justify-center gap-2  border border-dashed rounded-lg p-1 ${style[type || 'default'].class}`}>
            <div>
                {style[type || 'default'].icon}
            </div>
            <div className="flex-1 text-center text-sm">
                {message}           
            </div>
        </div>
    )
}