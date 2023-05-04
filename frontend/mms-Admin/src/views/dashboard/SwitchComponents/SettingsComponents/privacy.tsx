import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./index.css";
import ToggleSwitch from "../../../../components/ToggleSwitch'/ToggleSwitch";

interface FormValues {
  userId: string;
  showLinkedin: boolean;
  showTwitter: boolean;
  showGitHub: boolean;
  showInstagram: boolean;
  showContactInfo: boolean;
}

const PrivacyPage: React.FC = () => {
  const initialValues: FormValues = {
    userId: "",
    showLinkedin: true,
    showTwitter: false,
    showGitHub: true,
    showInstagram: false,
    showContactInfo: true,
  };

  const validationSchema = Yup.object().shape({});

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
            <div className="flex flex-col relative p-5">
              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className="toggle-switch-label"
                    style={{ width: "300px" }}
                    htmlFor="showContactInfo"
                  >
                    Show contact info
                  </label>
                  <ToggleSwitch
                    id="showContactInfo"
                    //isChecked={initialValues.showContactInfo}
                  />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className="toggle-switch-label"
                    style={{ width: "300px" }}
                    htmlFor="showGitHub"
                  >
                    Show GitHub
                  </label>
                  <ToggleSwitch
                    id="showGitHub"
                    //isChecked={initialValues.showGitHub}
                  />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className="toggle-switch-label"
                    style={{ width: "300px" }}
                    htmlFor="showInstagram"
                  >
                    Show Instagram
                  </label>
                  <ToggleSwitch
                    id="showInstagram"
                    //isChecked={initialValues.showInstagram}
                  />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className="toggle-switch-label"
                    style={{ width: "300px" }}
                    htmlFor="showLinkedin"
                  >
                    Show linkedin
                  </label>
                  <ToggleSwitch
                    id="showLinkedin"
                    //isChecked={initialValues.showLinkedin}
                  />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-row  relative  w-full">
                  <label
                    className="toggle-switch-label"
                    style={{ width: "300px" }}
                    htmlFor="showTwitter"
                  >
                    Show Twitter
                  </label>
                  <ToggleSwitch
                    id="showTwitter"
                    //isChecked={initialValues.showTwitter}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PrivacyPage;
