import { FC } from "react";

import LegalEntityForm from "@/shared/forms/legalEntityForm";
import PersonalInfoBasketForm from "@/shared/forms/personalInfoBasketForm";
import CircleSwitcher from "@/shared/UI/switcher/circleSwitcher";
import { setCustomer, setSectionsActive } from "@/store/slices/basketSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { PERSONAL_TYPE } from "@/types/profile";

const personalDataTypes = [
    {
        id: PERSONAL_TYPE.personal,
        name: "customerType",
        title: "Частное лицо",
    },
    {
        id: PERSONAL_TYPE.legal,
        name: "customerType",
        title: "Юридическое лицо",
    }
];

const PersonalInfo: FC = () => {
    const dispatch = useAppDispatch();
    const customer = useAppSelector(({ basket }) => basket.sections.customer);
    const components = {
        [PERSONAL_TYPE.personal]: <PersonalInfoBasketForm onSubmit={onSubmit} />,
        [PERSONAL_TYPE.legal]: <LegalEntityForm onSubmit={onSubmit} />,
    };

    function onSubmit() {
        dispatch(setSectionsActive("payment"));
    }

    function onChange(name: string) {
        dispatch(setCustomer({
            ...customer,
            customerType: name,
        }));
    }

    function renderTypes() {
        return personalDataTypes.map(data => {
            const { id, name, title } = data;

            return (
                <CircleSwitcher
                    key={id}
                    id={id}
                    isChecked={id === customer.customerType}
                    name={name}
                    title={title}
                    onChange={onChange}
                />
            );
        });
    }

    return (
        <div className={"flex flex-col gap-[16px]"}>
            <div className={"flex flex-col md:flex-row gap-[16px]"}>
                {renderTypes()}
            </div>
            {components[customer.customerType]}
        </div>
    );
};

export default PersonalInfo;
