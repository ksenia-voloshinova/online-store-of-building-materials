import React, { FC, ReactNode } from "react";

interface IInterceptor {
    children: ReactNode;
    errorMessage?: string;
    isError?: boolean;
    isLoading?: boolean;
    isFetching?: boolean;
    loader?: string | ReactNode;
}

const Interceptor: FC<IInterceptor> = ({ 
    children, 
    errorMessage= "Не удалось загрузить раздел",
    isError = false,
    isLoading = false, 
    isFetching = false,
    loader = "Загрузка..."
}) => {
    return (
        <>
            {isLoading || isFetching ? (
                <>
                    {loader}
                </>
            ) : (
                <>
                    {isError ? (
                        <p>{errorMessage}</p>
                    ): (
                        <>
                            {children}
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default Interceptor;