import { useState } from "react";

function useFormState() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    
    function setLoading(value: boolean) {
        setIsLoading(value);
    }

    async function setError(message: string) {
        await setIsSuccess(false);
        await setMessage(message);
        await setIsError(true);
    }

    async function setSuccess(message: string) {
        await setIsError(false);
        await setIsSuccess(true);
        await setMessage(message);
    }
    
    return {
        isLoading,
        isError,
        isSuccess,
        message,
        setLoading,
        setError,
        setSuccess,
    };
}

export default useFormState;