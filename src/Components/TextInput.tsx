import { FieldError, UseFormRegister } from "react-hook-form";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import { ReactNode } from "react";

interface TextInputProps {
  type?: string;
  name: string;
  label?: string;
  register: UseFormRegister<any>; // Adjust the type as needed
  error?: FieldError | undefined;
  children?: ReactNode;
  className?: string;
  placeholder?: string;
  row?: number;
}

export const TextInput: React.FC<TextInputProps> = ({
  type,
  name,
  label,
  register,
  error,
  placeholder,
}) => {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <InputLabel value={label} />
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full h-9 bg-inherit border border-gray-300 dark:border-slate-700 focus:outline-none  rounded-lg shadow-sm px-2 `}
        {...register(name)}
      />
      {error && <InputError message={error.message} />}
    </div>
  );
};



export const CheckBoxInput: React.FC<TextInputProps> = ({
  name,
  label,
  register,
  error,
  className,
}) => {
  return (
    <>
      <div className={`flex gap-2 cursor-pointer ${className && className}`}>
        <input
          type="checkbox"
          {...register(name)}
          name={name}
          className="cursor-pointer"
        />
        <p>{label}</p>
      </div>
      {error && <InputError message={error.message} />}
    </>
  );
};