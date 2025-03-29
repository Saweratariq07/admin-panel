import React, { ReactNode, type FC } from 'react';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    value: string;
    [key: string]: any;
}

const Button: FC<ButtonProps> = ({ type = 'button', className = '', onClick, children, value, ...props }) => {
    return (
        <button
            type={type}
            className={`mt-6 w-full border-0 text-white rounded-8xl text-sm font-normal py-4 font-manrope transition-all duration-300 ease-in-out  ${className}`}
            onClick={onClick}
            {...props}
        >
            {value}
        </button>
    );
};

export default Button;
