import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../assets/images/mms_logo.svg";
import PasswordField from "../../components/passwordField";

interface FormValues {
  password: string;
}

const initialValues: FormValues = {
  password: "",
};

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
});

const ForgotPasswordForm = () => {
  return (
    <div className="flex w-screen h-screen">
      <div className="flex-col flex-auto w-6/12 bg-green-three">
        <div className="flex items-center justify-center w-full flex-col mt-[22%]">
          <img src={logo} className="w-60 h-50 mb-11" alt="logo" />
          <h3 className="text-white text-3xl font-bold">
            Mentor Management System
          </h3>
        </div>
      </div>
      <div className="flex-col flex-auto w-6/12">
        <div className="flex justify-center w-full h-full flex-col px-[133px]">
          <h3 className="text-3xl font-bold leading-[53.18px]">
            Set new password
          </h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              console.log(values);
              actions.setSubmitting(false);
            }}
          >
            {(formikProps) => (
              <Form>
                <div className="w-3/5 m-auto">
                  <div className="flex flex-col relative">
                    <div className="relative">
                      <PasswordField
                        name="password"
                        id="password"
                        placeholder="Password"
                      />
                    </div>
                    <ErrorMessage name="password" />
                  </div>
                  <p className="text-gray-two leading-[26.59px] text-base">
                    *Your new password must be different from previously used
                    password.
                  </p>
                  <button
                    disabled={formikProps.isSubmitting}
                    className="btn-primary mt-10 text-lg"
                  >
                    Reset Password
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default ForgotPasswordForm;
