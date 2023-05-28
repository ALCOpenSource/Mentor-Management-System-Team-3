import { FC } from "react";
import { ErrorMessage } from "formik";

interface FormikValidationMessageProps {
  name: string;
}

const FormikValidationMessageComponent: FC<FormikValidationMessageProps> = ({
  name,
}) => {
  return (
    <ErrorMessage name={name} className="w-full">
      {(msg) => <div className="outline-none px-[8px] py-[12px] left-[100px] font-bold w-full text-lightRed-one">{msg}</div>}
    </ErrorMessage>
  );
};
export default FormikValidationMessageComponent;
