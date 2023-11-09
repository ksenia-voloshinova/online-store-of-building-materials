import { FC } from "react";

import PageTitle from "@/shared/pageTitle";

const TitleFavorites: FC = () => {
    return (
        <div className={"mt-[25px]"}>
            <PageTitle title={"Избранное"} />
        </div>
    );
};

export default TitleFavorites;
