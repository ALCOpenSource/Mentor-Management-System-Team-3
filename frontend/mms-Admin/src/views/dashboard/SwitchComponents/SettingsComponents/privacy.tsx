import React, { useState } from "react";
import { Formik, Form } from "formik";
import "../index.css";
import ToggleSwitch from "../../../../components/ToggleSwitch'/ToggleSwitch";
import { useAppDispatch, useAppSelector } from "../../../../services/redux/Store";
import { selectCurrentPrivacy, updateAllPrivacies, updatePrivacyItem } from "../../../../services/redux/slices/privacy-slice";
import { Privacy } from "../../../../services/redux/types/privacy";


const PrivacyPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const obj = useAppSelector(selectCurrentPrivacy);
  const [currentPrivacy, setCurrentPrivacy] = useState(obj);

  const setPrivacy = async (key: string, value: boolean) => {
    var lastValue = Object.entries(currentPrivacy)
      .filter(n => n[0] === key && n[1] === value);

    if (lastValue[1])
      return;

    const obj = { ...currentPrivacy, [key]: value };
    setCurrentPrivacy(obj);
    await dispatch(updatePrivacyItem({ key, value, obj }));
  }

  const handleSubmit = async (values: Privacy) => {
    await dispatch(updateAllPrivacies(obj));
  };

  return (
    <div>
      <Formik
        initialValues={obj}
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
                    isChecked={currentPrivacy.showContactInfo}
                    onChange={(event) => setPrivacy("showContactInfo", event)}
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
                    isChecked={currentPrivacy.showGitHub}
                    onChange={(event) => setPrivacy("showGitHub", event)}
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
                    isChecked={currentPrivacy.showInstagram}
                    onChange={(event) => setPrivacy("showInstagram", event)}
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
                    isChecked={currentPrivacy.showLinkedin}
                    onChange={(event) => setPrivacy("showLinkedin", event)}
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
                    isChecked={currentPrivacy.showTwitter}
                    onChange={(event) => setPrivacy("showTwitter", event)}
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


