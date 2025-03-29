import ComponentsAuthLoginForm from '@/components/auth/components-auth-login-form';
import { Metadata } from 'next';
import React from 'react';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Login Boxed',
};

const BoxedSignIn = () => {
    return (
        <div>
            <div className="absolute inset-0 font-manrope">
                <Image quality={100} width={100} height={100} src="/assets/images/BG_Image.png" alt="image" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            </div>

            <div className="relative flex min-h-screen  items-center justify-center bg-cover bg-center bg-no-repeat dark:bg-[#060818] sm:px-16">
                <div className="relative">
                    <div className="relative flex flex-col justify-center rounded-2xl bg-white w-full px-20 py-14 backdrop-blur-lg   ">
                        <div className="flex justify-center items-center">
                            <div className="pb-3">
                            </div>
                        </div>
                        <div className="mx-auto w-full min-w-[440px]">
                            <ComponentsAuthLoginForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoxedSignIn;
