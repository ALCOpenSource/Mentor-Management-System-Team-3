import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import "../index.css";
import ToggleSwitch from "../../../../components/ToggleSwitch'/ToggleSwitch";
import { useAppDispatch, useAppSelector } from "../../../../services/redux/Store";
import { selectCurrentPrivacy, updateAllPrivacies, updatePrivacyItem } from "../../../../services/redux/slices/privacy-slice";
import { Privacy } from "../../../../services/redux/types/privacy";
import { capitalizeEachWord } from "../../../../services/generalFunctions";
import { fetchCurrentUserPreferences, selectCurrentUserToken } from "../../../../services/redux/slices/current-user-slice";

const PrivacyPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const obj = useAppSelector(selectCurrentPrivacy);
  const [currentPrivacy, setCurrentPrivacy] = useState(obj);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = useAppSelector(selectCurrentUserToken);

  const showErrorMessage = (tt: any) => {
    try {
      setErrorMessage(tt?.message ?? tt);
    } catch (err) {
      setErrorMessage(tt);
    }
  };

  useEffect(() =>{    
    try {
      setErrorMessage("");
      setSuccessMessage("");

       dispatch(fetchCurrentUserPreferences(token))
      .then(obj =>
        {
         console.log("grgr", obj);
         //const privacy = useAppSelector(selectCurrentUserToken);
        })
        .catch(err => { showErrorMessage(err) });
    } catch (error) { showErrorMessage(error) }
  }, [token, dispatch])

  const setPrivacy = async (key: string, value: boolean) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");

      var lastValue = Object.entries(currentPrivacy)
        .filter(n => n[0] === key && n[1] === value);

      if (lastValue[1])         
        return;
      
      const obj = { ...currentPrivacy, [key]: value };
      setCurrentPrivacy(obj);
      await dispatch(updatePrivacyItem({ key, value, obj })
      ).then(ff => setSuccessMessage(`Successfully saved ${capitalizeEachWord(key)}  (${value})`.replace("Show", "Show ")))
        .catch(err => { showErrorMessage(err) });
    } catch (error) { showErrorMessage(error) }
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

              <h5 className="text-1xl mt-12 text-gray-two font-bold">
                {successMessage}
              </h5>

              <h5
                style={{ color: "orangered" }}
                className="text-1xl font-bold mt-4"
              >
                {errorMessage}
              </h5>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PrivacyPage;


