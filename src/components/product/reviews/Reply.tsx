import { FC } from "react";

interface IReply {
    reply: string;
}

const Reply: FC<IReply> = ({ reply }) => {
    return (
        <div className={"pl-[24px] flex flex-col gap-[8px]"}>
            <p className={"text-sm lg:text-[16px] text-cyanBlueDark font-bold"}>Ответ Docke</p>
            <p className={"text-sm lg:text-[16px]"}>{reply}</p>
        </div>
    );
};

export default Reply;