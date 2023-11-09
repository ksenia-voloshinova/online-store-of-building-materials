import { FC } from "react";

const Copyright: FC = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <div className={"flex justify-between"}>
            <small className={"text-blueMagenta"}>© {currentYear} Docke</small>
        </div>
    );
};

export default Copyright;