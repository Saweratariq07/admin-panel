import React, { useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { FieldError } from '../FieldError';
import Button from '../Button';
import { Eye, EyeOff } from '@/components/icon/Eye';
import InputField from '../InputField';

type ModalProps = {
    isOpen?: boolean;
    width?: string;
    height?: string;
    children?: ReactNode;
    setOpenModal?: Dispatch<SetStateAction<boolean>>;
    name?: string;
    outerClassName?: string;
    innerClassName?: string;
    bgColor?: string;
};

const UpdatePassword = ({ width = 'max-w-md', setOpenModal, innerClassName = '' }: ModalProps) => {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<{ oldPassword?: string[] | undefined; newPassword?: string[] | undefined; confirmNewPassword?: string[] | undefined; submission?: string[] | string }>();

    const closeModal = () => {
        setOpenModal?.(false);
    };

    return (
        <>
            <div className="fixed inset-0 z-[999] flex items-center justify-center overflow-y-auto overflow-x-hidden">
                <div className="fixed inset-0 bg-black opacity-70"></div>

                <div
                    className={`my-8 inline-block w-full ${width} transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ${innerClassName}`}
                    onClick={(e) => e.stopPropagation()}
                    // action={handleSubmit}
                >
                    <h1 className="text-lg font-medium leading-6 text-gray-900">Change Password</h1>
                    <div className="mt-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-lightgrey">Old Password</label>
                            <div className="relative mt-1">
                                <InputField className="py-2" type={showOldPassword ? 'text' : 'password'} placeholder="Old Password" id="oldPassword" value={'*********'} />
                                <span className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3" onClick={() => setShowOldPassword(!showOldPassword)}>
                                    {showOldPassword ? <EyeOff /> : <Eye />}
                                </span>
                            </div>

                            <FieldError error={errors?.oldPassword} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-lightgrey">New Password</label>
                            <div className="relative mt-1">
                                <InputField className="py-2" type={showNewPassword ? 'text' : 'password'} placeholder="New Password" id="newPassword" />
                                <span className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3" onClick={() => setShowNewPassword(!showNewPassword)}>
                                    {showNewPassword ? <EyeOff /> : <Eye />}
                                </span>
                            </div>
                            <FieldError error={errors?.newPassword} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-lightgrey">Confirm Password</label>
                            <div className="relative mt-1">
                                <InputField className="py-2" type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm Password" id="confirmNewPassword" />
                                <span className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                                </span>
                            </div>
                            <FieldError error={errors?.confirmNewPassword} />
                        </div>
                    </div>

                    <div className="mt-6 flex w-full justify-end gap-4 text-right">
                        <span
                            onClick={closeModal}
                            className="flex h-[45px] rounded-8xl !w-fit cursor-pointer items-center justify-center gap-2 bg-gray-200 px-6 py-2 text-base font-normal !text-gray-700 hover:bg-gray-300"
                        >
                            Cancel
                        </span>
                        <Button value="Save" className="!h-[45px] !w-fit justify-center !px-6 !py-2 !mt-0" onClick={closeModal} />
                    </div>
                    <FieldError error={errors?.submission} />
                </div>
            </div>
        </>
    );
};

export default UpdatePassword;
