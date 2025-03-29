'use client';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toggleSidebar } from '@/store/themeConfigSlice';
import { IRootState } from '@/store';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { showMessage } from '@/utils/notify/Alert';
import { FaChevronLeft } from 'react-icons/fa6';
import { LoginCheck } from '../loginCheck';

const Sidebar = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [activePath, setActivePath] = useState<string>('');

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const { push } = useRouter();

    const toggleMenu = (value: string) => {
        push(`/${value}`);
    };

    useEffect(() => {
        setActiveRoute();
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [pathname]);

    const setActiveRoute = () => {
        console.log(pathname)
        if(pathname == "/"){
            setActivePath("/blogs")
            return
        }
        setActivePath(pathname || '');
    };
    const [visibleDropdowns, setVisibleDropdowns] = useState<string[]>([]);

    const handleShowDropDown = (key: string) => {
        setVisibleDropdowns((prevKeys) => (prevKeys.includes(key) ? prevKeys.filter((k) => k !== key) : [...prevKeys, key]));
    };

    type SidebarLink = {
        isGroup: boolean,
        isHeading: boolean,
        icon: string | StaticImport,
        activeIcon: string | StaticImport,
        hRef: string | "";
        children: SidebarLink
    };


    const handleLogout = () => {
        localStorage.removeItem("token")
        showMessage("Logout successfull", "success")
        setTimeout(() => {
            push("/signin")
        }, 1000);
    }



    return (
        <div className={semidark ? 'dark' : ''}>
            <LoginCheck />
            <nav
                className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="h-full bg-white dark:bg-black">
                    <div className="flex items-center justify-between px-5 py-3">
                        <Link href="/" className="main-logo flex shrink-0 items-center">
                           AliHassan
                        </Link>

                        <button
                            type="button"
                            className="collapse-icon flex h-8 w-8 items-center justify-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <FaChevronLeft />
                        </button>
                    </div>
                    <PerfectScrollbar className="relative h-[calc(100vh-80px)] ">
                        <div className="overflow-y-auto h-[calc(100%-4rem)] no-scrollbar">
                            <ul className="relative space-y-0.5 p-4 py-10 font-semibold">


                                {/* Subscribers */}
                                <li className="menu nav-item ">

                                    <button type="button" className={`${activePath.includes('/blogs') ? 'bg-[#ceddda]' : ''} group w-full`} onClick={() => toggleMenu('')}>
                                        <div className="flex items-center gap-3"> 
                                            <span className="text-black  dark:text-[#506690] dark:group-hover:text-white-dark">Blogs</span>
                                        </div>
                                    </button>
                                </li>


                                <li className="menu nav-item ">

                                    <button type="button" className={`${activePath.includes('/create') ? 'bg-[#ceddda]' : ''} group w-full`} onClick={() => toggleMenu('create')}>
                                        <div className="flex items-center gap-3">  
                                            <span className="text-black  dark:text-[#506690] dark:group-hover:text-white-dark">Create Blog</span>
                                        </div>
                                    </button>
                                </li>

                                
                                <li className="menu nav-item ">

                                    <button type="button" className={`${activePath.includes('/allblogs') ? 'bg-[#ceddda]' : ''} group w-full`} onClick={() => toggleMenu('allblogs')}>
                                        <div className="flex items-center gap-3">  
                                            <span className="text-black  dark:text-[#506690] dark:group-hover:text-white-dark">All Blogs</span>
                                        </div>



                                    </button>
                                </li>

                                <li className="menu nav-item ">

                                    <button type="button" className={`${activePath.includes('/subscriptions') ? 'bg-[#ceddda]' : ''} group w-full`} onClick={handleLogout}>
                                        <div className="flex items-center gap-3">  
                                            <span className="text-black  dark:text-[#506690] dark:group-hover:text-white-dark">Log out</span>
                                        </div>



                                    </button>
                                </li>








                            </ul>
                        </div>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
