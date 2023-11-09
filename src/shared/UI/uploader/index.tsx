import { FC, useEffect, useRef, useState } from "react";

import Attache from "@/assets/icons/attache.svg";

interface IUploader {
    onChange: (file: File) => void;
    isReset: boolean;
    setReset: (value: boolean) => void;
}

const Uploader: FC<IUploader> = ({ onChange, isReset, setReset }) => {
    const [file, setFile] = useState<null | File>(null);
    const inputRef = useRef<any>(null);
    
    useEffect(() => {
        if (!isReset) return;
        
        setFile(null);
        inputRef.current.value = null;
        setReset(false);
    }, [isReset]);

    function handleFile(e: any) {
        const file = e.target.files[0];

        setFile(file);
        onChange(file);
    }
    
    return (
        <div>
            <div className={"relative w-max overflow-hidden"}>
                <button className={"flex items-center gap-[4px] cursor-pointer text-blueMagenta " +
                    "text-xs hover:text-yellowWarm"}
                >
                    <Attache className={"w-[16px] h-[16px]"} />
                    {file ? "Заменить файл" : "Прикрепить файл"}
                </button>
                <input
                    ref={inputRef}
                    className={"absolute top-[0px] bottom-[0px] right-[0px] left-[0px] opacity-0"}
                    type="file"
                    onChange={handleFile}
                />
            </div>
            {file && (
                <p className={"mt-[10px] text-xs text-blueMagenta underline"}>
                    Загруженный файл: {file.name ?? ""}
                </p>
            )}
        </div>
    );
};

export default Uploader;