import { type InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { EyeCloseIconSM, EyeOpenIconSM, PlusIconSM } from "./Icons";

interface InputTextAuthProp extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  placeholder?: string;
  type?: 'text' | 'email';
  error?: string;
}

export function InputTextAuth({
  icon,
  placeholder = '',
  type = 'text',
  error = '',
  ...props
}: InputTextAuthProp) {
  return (
    <div className="w-full">
      <div className="relative flex flex-col items-center">
        <span className="absolute left-0 top-2.25 text-2xl text-neutral-100 mx-3">{icon}</span>
        <input
          {...props}
          className={`w-full ps-12 border-2 ${error ? "border-danger-300 " : "border-primary-300 focus:border-secondary-300"} rounded-full focus:outline-none py-2 px-4 disabled:bg-neutral-100/10 disabled:cursor-not-allowed`}
          type={type}
          placeholder={placeholder}
        />
        <span className="text-danger-300 text-sm">{error}</span>
      </div>
    </div>
  )
}

interface InputDashboardType {
  placeholder?: string;
  label?: string,
  type?: "text" | "search"
  error?: string,
  disabled?: boolean
}

export function InputTextDashboard({
  placeholder = '',
  label = '',
  type = 'text',
  error = '',
  disabled = false,
  ...props
}: InputDashboardType) {
  return (
    <div className="w-full flex flex-col">
      <label>
        <span className={"text-sm uppercase text-primary-300 font-semibold"}>{label}</span>
        <input
          {...props}
          className={`w-full border border-primary-300 px-2 py-1 rounded-lg focus:outline-none focus:border-secondary-300`}
          disabled={disabled}
          type={type}
          placeholder={placeholder}
        />
      </label>
      <span className="text-center text-danger-300 text-sm">{error}</span>
    </div>
  )
}

interface SelectDashboardType {
  options: { value: string, option: string }[],
  label?: string,
  placeholder?: string,
  error?: string,
  disabled?: boolean
}

export function SelectDashboard({
  options = [],
  label = '',
  placeholder = '...',
  error = '',
  disabled = false,
  ...props
}: SelectDashboardType) {
  return (
    <div className="w-full flex flex-col">
      <label>
        <span className={"text-sm uppercase text-primary-300 font-semibold"}>{label}</span>
        <select
          {...props}
          className={`w-full bg-content border border-primary-300 px-2 py-1 rounded-lg focus:outline-none focus:border-secondary-300`}
          disabled={disabled}
        >
          <option value='' className="bg-primary-200/20">{placeholder}</option>
          {options.map((o, i) => <option key={i} value={o.value}>{o.option}</option>)}
        </select>
      </label>
      <span className="text-center text-danger-300 text-sm">{error}</span>
    </div>
  )
}


interface InputRadioDashboardProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function InputRadioDashboard({
  label,
  ...props
}: InputRadioDashboardProps) {
  return (
    <label className="group flex items-center gap-3 cursor-pointer select-none">

      {label && (<span>{label}</span>)}

      <input
        type="checkbox"
        className="hidden"
        {...props}
      />

      <div className=" w-12 h-6 rounded-full bg-neutral-100 p-1 transition-all duration-300 group-has-checked:bg-secondary-300">
        <div className=" w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 group-has-checked:translate-x-6" />
      </div>

    </label>
  );
}

export function InputPasswordAuth({
  icon,
  placeholder = '',
  error = '',
  ...props
}: InputTextAuthProp) {
  const [showPassword, setShowpassword] = useState(false);
  return (
    <div className="w-full">
      <div className="relative flex flex-col items-center">
        <span className="absolute left-0 top-2.25 text-2xl text-neutral-100 mx-3">{icon}</span>
        <input
          {...props}
          className={`w-full px-12 border-2 ${error ? "border-danger-300 " : "border-primary-300 focus:border-secondary-300"} rounded-full focus:outline-none py-2 disabled:bg-neutral-100/10 disabled:cursor-not-allowed`}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          autoComplete="off"
        />
        <span className="absolute right-0 top-2.25 text-2xl text-neutral-100 mx-3 cursor-pointer" onClick={() => setShowpassword(!showPassword)}>
          {showPassword ? <EyeOpenIconSM /> : <EyeCloseIconSM />}
        </span>
        <span className="text-danger-300 text-sm">{error}</span>
      </div>
    </div>
  )
}

interface InputFileProp {
  placeholder?: string;
  onChangeFile?: (file: File) => void;
  accept?: string;
  maxSize?: number; //MB
}

export function InputFileAuth({
  placeholder,
  onChangeFile,
  accept = "image/*",
  maxSize = 1
}: InputFileProp) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const handleOpenFile = () => {
    inputRef.current?.click();
  };

  const handleFile = (file: File) => {
    const size = file.size / 1024;
    if (size > maxSize) {
      setError(`El tamaño archivo revaza el máximo permitido (${maxSize}KB)`);
    } else {
      setError("");
      const url = URL.createObjectURL(file);
      setPreview(url);
      onChangeFile?.(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    handleFile(file);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        onClick={handleOpenFile}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
            w-full h-40 border-2 border-neutral-100 border-dashed rounded-lg overflow-hidden cursor-pointer flex items-center justify-center transition-all
            ${isDragging
            ? "border-primary bg-primary/10"
            : "border-border bg-muted hover:bg-muted/80"
          }
          `}
      >
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="flex items-center gap-2 text-sm text-neutral-100 text-center px-2">
            <PlusIconSM /> Arrastra o haz click
          </span>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
      {error !== "" && <span className="text-sm text-danger-300 text-center">{error}</span>}
      <span className="text-sm text-neutral-100 text-center">{placeholder}</span>
    </div>
  );
}

export function InputFileDashboard({
  placeholder,
  onChangeFile,
  accept = "image/*",
  maxSize = 1
}: InputFileProp) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const handleOpenFile = () => {
    inputRef.current?.click();
  };

  const handleFile = (file: File) => {
    const size = file.size / 1024;
    if (size > maxSize) {
      setError(`El tamaño archivo revaza el máximo permitido (${maxSize}KB)`);
    } else {
      setError("");
      const url = URL.createObjectURL(file);
      setPreview(url);
      onChangeFile?.(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    handleFile(file);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        onClick={handleOpenFile}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
            w-full h-55 border-2 border-neutral-100 border-dashed rounded-lg overflow-hidden cursor-pointer flex items-center justify-center transition-all
            ${isDragging
            ? "border-primary bg-primary/10"
            : "border-border bg-muted hover:bg-muted/80"
          }
          `}
      >
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="h-full object-cover"
          />
        ) : (
          <span className="flex items-center gap-2 text-sm text-neutral-100 text-center px-2">
            <PlusIconSM /> Arrastra o haz click
          </span>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
      {error !== "" && <span className="text-sm text-danger-300 text-center">{error}</span>}
      <span className="text-sm text-neutral-100 text-center">{placeholder}</span>
    </div>
  );
}