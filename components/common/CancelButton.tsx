import React, { ReactNode, type FC } from 'react';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    value: string;
    [key: string]: any;
}
const CancelButton: FC<ButtonProps> = ({ type = 'button', className = '', onClick, children, value, ...props }) => {
    return (
        <button
            type={type}
            className={`mt-6 w-full border-0  bg-[#E94B5B] rounded-8xl text-sm font-normal py-2 font-manrope transition-all duration-300 ease-in-out  text-white hover:bg-[#d52943] focus:outline-none ${className}`}
            onClick={onClick}
            {...props}
        >
            {value}
        </button>
    );
};

export default CancelButton;
