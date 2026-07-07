import { LoadingIconSM } from "./Icons";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { MdOutlineMoreVert } from "react-icons/md";
import type React from "react";

interface ButtonAuthProp {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'submit' | 'button';
  color?: 'primary' | 'secondary' | 'warning' | 'success' | 'danger';
  loading?: boolean;
  disabled?: boolean

}
export function ButtonAuth({
  children,
  onClick = () => { },
  type = 'button',
  color = 'primary',
  loading = false,
  disabled = false
}: ButtonAuthProp) {
  const colorVariants = {
    primary: 'bg-primary-300',
    secondary: 'bg-secondary-300',
    warning: 'bg-warning-300',
    success: 'bg-success-300',
    danger: 'bg-danger-300'
  }
  return (
    <button
      className={`${colorVariants[color]} flex items-center gap-2 text-white rounded-2xl py-2 px-4 cursor-pointer hover:opacity-90 disabled:opacity-90 disabled:cursor-not-allowed`}
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {children}
      {loading && <LoadingIconSM className="text-lg animate-spin" />}
    </button>
  )
}

interface ButtonDashboardProp extends ButtonAuthProp {
  icon?: React.ReactNode
}
export function ButtonDashboard({
  children,
  onClick = () => { },
  type = 'button',
  color = 'primary',
  loading = false,
  disabled = false,
  icon,
}: ButtonDashboardProp) {
  const colorVariants = {
    primary: 'bg-primary-300',
    secondary: 'bg-secondary-300',
    warning: 'bg-warning-300',
    success: 'bg-success-300',
    danger: 'bg-danger-300'
  }

  return (
    <button
      className={`${colorVariants[color]} flex items-center rounded-lg gap-2 text-white py-1 px-4 cursor-pointer hover:opacity-90 disabled:opacity-90 disabled:cursor-not-allowed`}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? <LoadingIconSM className="animate-spin" /> : icon}{children}
    </button>
  )
}

type ButtonActionsProp = {
  actions: {
    type?: 'edit' | 'delete' | 'more' ,
    customIcon?: React.ReactNode,
    color: 'primary' | 'danger' | 'neutral',
    onClick: () => void
  }[];
  loading?: boolean;
}
export function ButtonActions({ actions, loading }: ButtonActionsProp) {
  const classBasic = 'w-6 h-6 hover:bg-primary-100/20 rounded-full flex justify-center items-center cursor-pointer disabled:text-neutral-200 disabled:cursor-not-allowed disabled:bg-neutral-100/10';

  const colors = {
    primary: 'text-primary-300',
    danger: 'text-danger-300',
    neutral: 'text-neutral-200',
  }

  const icons = {
    edit: <FiEdit3/>,
    delete: <RiDeleteBin7Line/>,
    more: <MdOutlineMoreVert/>
  }

  return (
    <div className="flex justify-center gap-2" >
      {actions.map((a, i) =>
        <button
          key={i}
          className={`${classBasic} ${colors[a.color]}`}
          onClick={a.onClick}
          disabled={loading}
        >{a.customIcon || icons[a.type || 'more'] }</button>
      )}
    </div>
  )
}