import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./index.css";
import VALIDATION_PATTERNS from "../../../../assets/validation-patterns";
import ToggleSwitch from "../../../../components/ToggleSwitch'/ToggleSwitch";

interface FormValues {
  userId: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ProfileForm: React.FC = () => {
  const initialValues: FormValues = {
    userId: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required(
      "Current password is required for you change it"
    ),
    newPassword: Yup.string()
      .required("New password to change is required please")
      .matches(
        VALIDATION_PATTERNS.VALID_PASSWORD,
        "A valid password must have atleast a lower letter, upper letter, number and sysmbol"
      ),
    confirmNewPassword: Yup.string()
      .required("Re-type the new password to confirm please")
      .oneOf(
        [Yup.ref("newPassword")],
        "New password and confirm password must match"
      ),
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
    // save changes logic here
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="w-full profile-form  h-screen">
            <div className="flex flex-col relative pt-1">
              <div className="flex w-full">
                <label className="text-[15px] strong-text">
                  {" "}
                  General Notifications{" "}
                </label>
              </div>
              <div className="flex w-full">
                <label
                  className="text-[15px] strong-text"
                  style={{ marginLeft: "400px" }}
                >
                  {" "}
                  Email{" "}
                </label>
                <label
                  className="text-[15px] strong-text"
                  style={{ marginLeft: "40px" }}
                >
                  {" "}
                  In-app{" "}
                </label>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className="toggle-switch-label"
                    style={{ width: "400px" }}
                    htmlFor="confirmNewPassword"
                  >
                    All Notifications
                  </label>
                  <ToggleSwitch id="fdfasdf" />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch id="fdfasdf" />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className="toggle-switch-label"
                    style={{ width: "400px" }}
                    htmlFor="confirmNewPassword"
                  >
                    Programs
                  </label>
                  <ToggleSwitch id="fdfasdf" />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch id="fdfasdf" />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className="toggle-switch-label"
                    style={{ width: "400px" }}
                    htmlFor="confirmNewPassword"
                  >
                    Tasks
                  </label>
                  <ToggleSwitch id="fdfasdf" />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch id="fdfasdf" />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className="toggle-switch-label"
                    style={{ width: "400px" }}
                    htmlFor="confirmNewPassword"
                  >
                    Approval Requests
                  </label>
                  <ToggleSwitch id="fdfasdf" />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch id="fdfasdf" />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className="toggle-switch-label"
                    style={{ width: "400px" }}
                    htmlFor="confirmNewPassword"
                  >
                    Reports
                  </label>
                  <ToggleSwitch id="fdfasdf" />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch id="fdfasdf" />
                </div>
              </div>
            </div>

            <div className="flex mt-5 flex-col relative pt-1">
              <div className="flex w-full">
                <label className="text-[15px] strong-text">
                  {" "}
                  Discussion Notifications{" "}
                </label>
              </div>
              <div className="flex w-full">
                <label
                  className="text-[15px] strong-text"
                  style={{ marginLeft: "400px" }}
                >
                  {" "}
                  Email{" "}
                </label>
                <label
                  className="text-[15px] strong-text"
                  style={{ marginLeft: "40px" }}
                >
                  {" "}
                  In-app{" "}
                </label>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className="toggle-switch-label"
                    style={{ width: "400px" }}
                    htmlFor="confirmNewPassword"
                  >
                    Comments on my post
                  </label>
                  <ToggleSwitch id="fdfasdf" />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch id="fdfasdf" />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className="toggle-switch-label"
                    style={{ width: "400px" }}
                    htmlFor="confirmNewPassword"
                  >
                    Posts
                  </label>
                  <ToggleSwitch id="fdfasdf" />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch id="fdfasdf" />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className="toggle-switch-label"
                    style={{ width: "400px" }}
                    htmlFor="confirmNewPassword"
                  >
                    Comments
                  </label>
                  <ToggleSwitch id="fdfasdf" />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch id="fdfasdf" />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className="toggle-switch-label"
                    style={{ width: "400px" }}
                    htmlFor="confirmNewPassword"
                  >
                    Mentions
                  </label>
                  <ToggleSwitch id="fdfasdf" />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch id="fdfasdf" />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className="toggle-switch-label"
                    style={{ width: "400px" }}
                    htmlFor="confirmNewPassword"
                  >
                    Direct Messages
                  </label>
                  <ToggleSwitch id="fdfasdf" />
                  <div style={{ width: "30px" }} />
                  <ToggleSwitch id="fdfasdf" />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileForm;
