import HCaptcha from "@hcaptcha/react-hcaptcha";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

import useFormState from "@/hooks/useFormState";
import feedbackService from "@/services/feedbackService";
import FormContainer from "@/shared/containers/formContainer";
import { INIT_FORM_DATA, SUPPLIERS_FORM_DATA } from "@/shared/forms/supplierForm/constants";
import { TSuppliers } from "@/shared/forms/supplierForm/types";
import DefaultButton from "@/shared/UI/buttons/defaultButton";
import ControlledFullColoredCheckbox from "@/shared/UI/checkboxes/controlledFullColoredCheckbox";
import SimpleInputControlled from "@/shared/UI/inputs/simpleInputControlled";
import Uploader from "@/shared/UI/uploader";
import UserAgreement from "@/shared/userAgreement";
import { NAME_FIELDS } from "@/types/forms";
import createFormData from "@/utils/createFormData";
import { SUPPLIERS_SCHEMA } from "@/utils/schemas";

const SupplierForm = () => {
    const { isSuccess, isError, setSuccess, setError, message } = useFormState();
    const { handleSubmit, control, formState: { errors }, reset } = useForm<TSuppliers>({
        resolver: yupResolver(SUPPLIERS_SCHEMA),
    });
    const [isVerifiedRecaptcha, setIsVerifiedRecaptcha] = useState<boolean>(false);
    const [file, setFile] = useState<null | File>(null);
    const [isResetFile, setIsResetFile] = useState(false);
    
    async function onSubmit(supplier: TSuppliers) {
        const { name, position, company, phone, message } = supplier;
        const formData = createFormData({
            name,
            position,
            company,
            phone,
            message,
            file,
        });
        
        const { status, data } = await feedbackService.supplier(formData);
        
        if (status === 200) {
            await setSuccess(data.message);
            setFile(null);
            setIsResetFile(true);
            reset(INIT_FORM_DATA);
        } else {
            await setError(data.message);
        }
    }
    
    function handleFile(file: File) {
        setFile(file);
    }

    function renderDealersFields() {
        return SUPPLIERS_FORM_DATA.map(data => {
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
                action={"/local/forms/inform.php"}
                className={"z-[100] flex flex-col gap-[24px]"}
                method={"post"}
                onSubmit={handleSubmit(onSubmit)}
            >
                {renderDealersFields()}
                <Uploader isReset={isResetFile} setReset={setIsResetFile} onChange={handleFile} />
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

export default SupplierForm;