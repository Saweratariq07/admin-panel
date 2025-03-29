import React, { useEffect, useRef, useState } from 'react';
import Select, { type StylesConfig } from 'react-select';

interface DropdownProps {
    data: { label: string; value: string }[];
    label: string;
    onHandleClick?: (item: { label: string; value: string }) => void;
    name?: string;
    value?: string;
    disabled?: boolean;
    notSort?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({ data, label, onHandleClick, name, value, disabled, notSort }) => {
    const [selectedValue, setSelectedValue] = useState<string>(value || '');
    const [searchedData, setSearchedData] = useState<{ label: string; value: string }[]>([]);
    useEffect(() => {
        if (typeof value != 'string') {
            setSelectedValue(value || '');
        }
    }, [value]);

    useEffect(() => {
        if (notSort) {
            setSearchedData(data);
        } else {
            const sortedData = Array.isArray(data) ? [...data].sort((a, b) => a.label.localeCompare(b.label)) : [];
            setSearchedData(sortedData);
        }
    }, [data]);

    const colourStyles: StylesConfig<any> = {
        control: (styles) => ({
            ...styles,
            maxWidth: '100%',
            width: '100%',
            backgroundColor: 'transparent',
            color: '#404040',
            borderRadius: '60px',
            borderColor: '#11111133',
            boxShadow: 'none',
            borderWidth: '1px',
            outline: 'none',
            fontSize: '16px',
            fontWeight: 'normal',
            padding: '6px 12px 6px 14px',
            ':hover': {
                borderColor: '#11111133',
                outline: 'none',
            },
        }),
        input: (styles) => ({
            ...styles,
            color: '#404040',
        }),
        placeholder: (styles) => ({
            ...styles,
            color: '#989898',
        }),
        singleValue: (styles) => ({
            ...styles,
            color: '#404040',
            border: 'none',
            ':hover': {
                backgroundColor: '#292929',
            },
        }),
        menu: (styles) => ({
            ...styles,
            backgroundColor: '#F1F6F5',
            borderRadius: '12px',
            border: 'none',
            padding: '0px',
            boxShadow: '0 2px 2px rgb(224 230 237 / 46%), 1px 6px 7px rgb(224 230 237 / 80%)',
            color: '#292929',
            margin: '1px',
            left: '1px',
            zIndex: '9999',
            width: '100%',
        }),
        menuList: (styles) => ({
            ...styles,
            borderRadius: '12px',
            color: '#292929',
            padding: '0px',
            backgroundColor: 'white',
            width: '100%',
            outline: 'none',
            fontSize: '16px',
            fontWeight: 'normal',
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        option: (styles, { isSelected }) => ({
            ...styles,
            backgroundColor: isSelected ? '#f3f4f6' : 'white',
            color: isSelected ? '#292929' : '#292929',
            paddingLeft: '22px',
            paddingRight: '22px',
            paddingTop: '14px',
            paddingBottom: '14px',
            ':hover': {
                backgroundColor: '#f3f4f6',
            },
        }),
    };

    return (
        <div>
            <label htmlFor="" className="text-lg font-semibold text-neutral-1000 font-manrope">
                {label}
            </label>
            <Select //@ts-ignore
                options={searchedData}
                placeholder={label}
                styles={colourStyles}
                value={selectedValue}
                onChange={(selectedOption) => {
                    //@ts-ignore
                    setSelectedValue(selectedOption);
                    onHandleClick && onHandleClick(selectedOption);
                }}
                name={name}
                className='  !text-neutral-700'
                isDisabled={disabled}
            />
        </div>
    );
};
