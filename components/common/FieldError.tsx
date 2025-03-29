import React from 'react';

export const FieldError = ({ error }: { error: string[] | undefined | string }) => {
    if (!error) return null;

    if (typeof error === 'string') {
        return <p className="ps-2 text-red-600">{error}</p>;
    }

    return (
        <>
            {error.map((message, index) => (
                <p className="ps-2 text-red-600" key={index}>
                    {message}
                </p>
            ))}
        </>
    );
};
