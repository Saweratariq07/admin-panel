import React from 'react';
import Dropdown from '@/components/dropdown';
export const DownloadButton = () => {
    return (
        <div>
            <div className="dropdown">
                <Dropdown
                    offset={[0, 1]}
                    placement={`  bottom-start   `}
                    button={
                        <button className="  flex px-4 gap-x-1.5 items-center justify-center border-0   text-white bg-primary-800 hover:bg-primary-700 transition-all duration-300 ease-in-out rounded-8xl text-sm font-normal py-2  ">
                            <svg className="fill-current w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                            </svg>
                            <span>Download</span>
                        </button>
                    }
                >
                    <ul className='w-32 !mt-3 '>
                        <li>
                            <button type="button">Excel</button>
                        </li>
                        <li>
                            <button type="button">Pdf</button>
                        </li>
                    </ul>
                </Dropdown>
            </div>
        </div>
    );
};

 
