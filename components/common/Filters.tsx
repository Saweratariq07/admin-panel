import React from 'react';
import Dropdown from '@/components/dropdown';
import { TbSortDescending } from 'react-icons/tb';

const Filters = ({ filters }: any) => {
    return (
        <>
            <div className="dropdown">
                <Dropdown
                    offset={[0, 1]}
                    placement={` bottom-end `}
                    button={
                        <button className="flex px-6 gap-x-1.5 items-center justify-center border-0   text-white bg-primary-800 hover:bg-primary-700 transition-all duration-300 ease-in-out rounded-8xl text-sm font-normal py-2 ">
                            <span>Filter</span>
                            <span>
                                <TbSortDescending className="text-white h-4 w-4" />
                            </span>
                        </button>
                    }
                >
                    <ul className='w-44'>
                        {filters.map((filter: any) => (
                            <li key={filter.id}>
                                <button type="button">{filter.name}</button>
                            </li>
                        ))}
                    </ul>
                </Dropdown>
            </div>
        </>
    );
};

export default Filters;
