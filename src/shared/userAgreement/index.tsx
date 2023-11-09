import { FC } from "react";

import { BASE_DOMAIN } from "@/utils/constants";

const UserAgreement: FC = () => {
    return (
        <div className={"text-xs text-cyanBlueDark"}>
            Нажимая на кнопку, я соглашаюсь с 
            <a 
                className={"underline hover:text-yellowWarm duration-[200ms]"} href={`${BASE_DOMAIN}/privacy/`} 
                rel="noreferrer" 
                target={"_blank"}
            > Пользовательским соглашением </a>
            и даю свое согласие на обработку персональных данных.
        </div>
    );
};

export default UserAgreement;