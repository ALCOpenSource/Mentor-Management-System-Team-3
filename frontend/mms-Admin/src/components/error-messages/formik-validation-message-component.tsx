import { FC } from "react";
import { ErrorMessage } from "formik";
import "./formik-validation-message-component.css";

interface FormikValidationMessageProps {
  name: string;
}

const FormikValidationMessageComponent: FC<FormikValidationMessageProps> = ({
  name,
}) => {
  return (
    <ErrorMessage name={name} className="w-full">
      {(msg) => <div className="text-error">{msg}</div>}
    </ErrorMessage>
  );
};
export default FormikValidationMessageComponent;
