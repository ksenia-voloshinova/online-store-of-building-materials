import { useEffect, useState } from "react";

interface IWindowSize {
    width: number | undefined;
    height: number | undefined;
}

function useWindowSize() {
    const [windowSize, setWindowSize] = useState<IWindowSize>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        handleResize();
        
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function handleResize() {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }
    
    return windowSize;
}

export default useWindowSize;