import React from 'react'
import { FaPlus } from 'react-icons/fa6'

const CreateButton = ({
    type = 'button',
    className = '',
    onClick,
    ...props
}:any) => {
  return (
    < > <button
    type={type}
    className={` flex px-4 gap-x-1.5 items-center justify-center border-0   text-white bg-secondary hover:bg-[#01449d] transition-all duration-300 ease-in-out rounded-8xl text-sm font-normal py-2   ${className}`}
    onClick={onClick}
    {...props}
>
       <FaPlus/>
       <span>Create</span>

</button>
      
    </>
  )
}

export default CreateButton
 