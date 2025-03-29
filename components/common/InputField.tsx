import React, { type FC, type ReactNode } from 'react';

interface InputProps {
    id: string;
    label?: string;
    type?: string;
    placeholder: string;
    className?: string;
    icon?: ReactNode;
    onChange: any,
    value?: string;
    disable?: boolean;
    name?:string;
    error: string
}

const InputField: FC<InputProps> = ({ id, label, placeholder, icon, onChange, value, className = '', type = 'text'  ,disable, error}) => {
    return (
        <div>
            {label ? (
                <label htmlFor={id} className="text-lg font-semibold text-neutral-1000 font-manrope">
                    {label}
                </label>
            ) : (
                ''
            )}
            <div className="relative text-white-dark">
                <input
                    id={id}
                    name={id}
                    type={type}
                    placeholder={placeholder}
                    className={`py-10 px-5 rounded-lg border placeholder:text-neutral-400 text-neutral-700 border-neutral-20 w-full focus:outline-none font-normal text-base font-manrope ${className}`}
                    onChange={onChange}
                    value={value}
                    disabled={disable}
                />
                {icon ? <span className="absolute end-5 top-1/2 -translate-y-1/2">{icon}</span> : ''}
                
                {error && <p className='mt-1 ps-5 text-danger'>{error}</p>}
            </div>
        </div>
    );
};

export default InputField;
