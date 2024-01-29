// // Button.tsx

// import React from 'react';

// interface ButtonProps {
//   label: string;
//   mainColor: string;
//   disabledColor: string;
//   disabled?: boolean;
//   onClick?: () => void;
// }

// const Button: React.FC<ButtonProps> = ({
//   label,
//   mainColor,
//   disabledColor,
//   disabled = false,
//   onClick,
// }) => {
//   const buttonClasses = `py-2 px-4 rounded ${
//     disabled
//       ? `bg-${disabledColor} cursor-not-allowed opacity-70`
//       : `bg-${mainColor} hover:bg-${mainColor}-dark cursor-pointer`
//   } text-white`;

//   return (
//     <button className={buttonClasses} onClick={onClick} disabled={disabled}>
//       {label}
//     </button>
//   );
// };

// export default Button;
import { ReactNode } from "react";
import { ClipLoader } from "react-spinners";
// import { twMerge } from "tailwind-merge";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
  loading?: boolean;
  onClick?: () => void;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  className = "",
  disabled,
  children,
  loading,
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={`${className}`}
    //   className={twMerge(
    //     `inline-flex items-center justify-center px-4 py-2 bg-primary dark:bg-gray-600 border border-transparent rounded-sm font-semibold text-xs text-white tracking-widest hover:opacity-70  active:bg-primary focus:outline-none  focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
    //       disabled && "opacity-25"
    //     }`,
    //     className
    //   )}
      disabled={disabled ?? loading}
    >
      {loading ? (
        <ClipLoader
          size={12}
          color={"gray"}
          loading={disabled}
          className="my-1"
        />
      ) : (
        <>{children}</>
      )}
    </button>
  );
};