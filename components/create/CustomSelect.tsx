"use Client"
import Select from 'react-select'

type options = {
    value: string,
    label: string,
}

interface selectProps {
    OnSelect?: any
    value: any,
    options: options[],
    label: string,
    placeholder: string
    disabled?: boolean
}

export const CustomSelect: React.FC<selectProps> = ({OnSelect, value, options, label, placeholder, disabled}) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={'role'} className="font-semibold text-[0.8rem] text-neutral500 w-full">
                {label}
            </label>
            {/* w-full rounded-xl border border-neutralAlpha20 px-4 py-[0.8rem] pr-12 */}
            <Select options={options}
            isDisabled={disabled ? disabled : false}
                unstyled
                onChange={OnSelect as any}
                isSearchable={false}
                value={value}
                classNames={{option: (state: any) => "hover:bg-neutral-100 py-1 px-2 cursor-pointer"}}
                placeholder={<p className="font-manrope font-normal text-[0.8rem] text-[#B0B0B0]">{placeholder}</p>}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        cursor: "pointer",
                        border: '1px solid #11111133',
                        borderRadius: '12px',
                        padding: '0.8rem 1rem',
                        margin: '0px',
                        flexGrow: 1,
                        position: 'relative',
                        '@media (max-width: 1440px)': {
                           
                        },
                        color: state.isDisabled ? "#B3B0B0" : "#0E1726"
                    }),
                    menu: (baseStyles) => ({
                        ...baseStyles,
                        position: 'absolute',
                        top: '100%',
                        left: '0',
                        right: '0',
                        color: '#7B7B7B',
                        background: 'white',
                        fontSize: '1rem',
                        padding: '16px 20px',
                        borderRadius: '10px',
                        zIndex: 999,
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    }),
                    menuList: (baseStyles) => ({
                        ...baseStyles,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                    }),
                    option: (baseStyles) => ({
                        cursor: "pointer"
                    }),
                  
               
                   
                    
                }}
            />
        </div>
    )
}