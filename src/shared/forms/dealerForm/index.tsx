import HCaptcha from "@hcaptcha/react-hcaptcha";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

import useFormState from "@/hooks/useFormState";
import feedbackService from "@/services/feedbackService";
import FormContainer from "@/shared/containers/formContainer";
import { DEALERS_FORM_DATA, INIT_FORM_DATA } from "@/shared/forms/dealerForm/constants";
import { TDealers } from "@/shared/forms/dealerForm/types";
import DefaultButton from "@/shared/UI/buttons/defaultButton";
import ControlledFullColoredCheckbox from "@/shared/UI/checkboxes/controlledFullColoredCheckbox";
import SimpleInputControlled from "@/shared/UI/inputs/simpleInputControlled";
import UserAgreement from "@/shared/userAgreement";
import { NAME_FIELDS } from "@/types/forms";
import { DEALERS_SCHEMA } from "@/utils/schemas";

const DealerForm: FC = () => {
    const { isSuccess, isError, setSuccess, setError, message } = useFormState();
    const { handleSubmit, control, reset, formState: { errors } } = useForm<TDealers>({
        resolver: yupResolver(DEALERS_SCHEMA),
    });
    const [isVerifiedRecaptcha, setIsVerifiedRecaptcha] = useState<boolean>(false);
    
    async function onSubmit(dealer: TDealers) {
        const { name, position, company, phone, email, message } = dealer;
        const { data, status } = await feedbackService.dealer({
            name,
            position,
            company,
            phone,
            email,
            message,
        });

        if (status === 200) {
            await setSuccess(data.message);
            reset(INIT_FORM_DATA);
        } else {
            await setError(data.message);
        }
    }

    function renderDealersFields() {
        return DEALERS_FORM_DATA.map(data => {
            const { name, title, mask } = data;

            return (
                <SimpleInputControlled
                    key={name}
                    control={control}
                    defaultValue={""}
                    errorMessage={errors[name]?.message ?? ""}
                    mask={mask}
                    name={name}
                    styles={"!border-b-whiteWarm !border-b-1"}
                    title={title}
                />
            );
        });
    }
    
    return (
        <FormContainer 
            isError={isError}
            isSuccess={isSuccess}
            message={message}
            showRequire={false}
        >
            <form
                action={"/local/forms/subdivisionsform.php"}
                className={"z-[100] flex flex-col gap-[24px]"}
                method={"post"}
                onSubmit={handleSubmit(onSubmit)}
            >
                {renderDealersFields()}
                <ControlledFullColoredCheckbox 
                    control={control}
                    defaultValue={false}
                    errorMessage={errors[NAME_FIELDS.agreement]?.message ?? ""}
                    name={NAME_FIELDS.agreement}
                >
                    <UserAgreement />
                </ControlledFullColoredCheckbox>
                <HCaptcha
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA ?? ""}
                    onChalExpired={() => setIsVerifiedRecaptcha(false)}
                    onError={() => setIsVerifiedRecaptcha(false)}
                    onExpire={() => setIsVerifiedRecaptcha(false)}
                    onVerify={() => setIsVerifiedRecaptcha(true)}
                />
                <DefaultButton isDisabled={!isVerifiedRecaptcha}>
                    Сохранить
                </DefaultButton>
            </form>
        </FormContainer>
    );
};

export default DealerForm;