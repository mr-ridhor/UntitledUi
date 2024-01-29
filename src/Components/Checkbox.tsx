import { FieldError, UseFormRegister } from "react-hook-form";
import InputError from "./InputError";
import { ReactNode } from "react";

interface CheckboxProps {
  className?: string;
  name: string;
  register: UseFormRegister<any>; // Adjust the type as needed
  error?: FieldError | undefined;
  content?: ReactNode;
}

const Checkbox = ({
  className,
  name,
  register,
  error,
  content,
}: CheckboxProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-1">
        <input type="checkbox" className={className} {...register(name)} />
        {content}
      </div>

      {error && <InputError message={error.message} />}
    </div>
  );
};

export default Checkbox;