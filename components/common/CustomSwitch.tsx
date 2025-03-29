'use client';

import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const CustomSwitch: React.FC<SwitchProps> = ({ checked, onChange, disabled }) => {
  return (
    <button
    onClick={(e) => {
      e.preventDefault()
      console.log(1)
      !disabled && onChange(!checked)
    }}
      className={`relative w-12 h-6 flex items-center rounded-full py-[14px] px-[6px] transition-colors border 
        ${checked ? 'bg-neutral100 border-secondaryAlpha40-Default' : 'bg-neutral100 border-neutralAlpha10'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      disabled={disabled}
    >
      <div
        className={`w-5 h-5  rounded-full shadow-md transform transition-transform
          ${checked ? 'translate-x-4 bg-secondary' : 'translate-x-0 bg-neutral500'}`}
      />
    </button>
  );
};

