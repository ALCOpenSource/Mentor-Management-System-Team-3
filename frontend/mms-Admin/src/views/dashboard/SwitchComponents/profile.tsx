import React from "react";
import { Formik, Form } from "formik";
import "../SwitchComponents/index.css";
import linkedInSVG from "../../../assets/images/social/Linkedin.svg";
import githubSVG from "../../../assets/images/social/Github.svg";
import twitterSVG from "../../../assets/images/social/Twitter.svg";
import instagramSVG from "../../../assets/images/social/Instagram.svg";
import { useNavigate } from "react-router-dom";
import { SystemUser } from "../../../services/redux/types/system-user";
import { useAppSelector } from "../../../services/redux/Store";
import { selectCurrentUser } from "../../../services/redux/slices/current-user-slice";

const GeneralPage: React.FC = () => {
  const initialValues =  useAppSelector(selectCurrentUser);

  const handleSubmit = (values: SystemUser) => {
    console.log(values);

    
    
    // save changes logic here
  };

  const navigate = useNavigate();
  const goToEditProfilePage = () => {
    navigate("../settings/general", {
      state: { initialValues },
    });
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form className="w-full profile-form  h-screen">
            <div className="row w-full mb-6">
              <div className="flex items-start justify-start w-full flex-row mt-[2%]">
                <img
                  src={initialValues.userImage}
                  className="profile-avatar"
                  alt="user profile avatar"
                />
                <div style={{ marginTop: "20px" }}>
                  <div className="flex row w-full">
                    <h3 className="text-black text-2xl ms-4 font-bold">
                      {initialValues.firstNames} {initialValues.lastName}
                    </h3>
                    <img
                      style={{ width: "24px" }}
                      className="ms-2"
                      src={initialValues.countryFlagIcon}
                      alt="country logo icon"
                    />
                  </div>
                  <label
                    style={{ background: "transparent" }}
                    className="data-label"
                  >
                    {initialValues.userRole}
                  </label>
                </div>
                <button
                  type="button"
                  onClick={goToEditProfilePage}
                  style={{ marginLeft: "auto", marginTop: "20px" }}
                  className="bg-green-three text-white rounded-[10px] p-[10px]  pe-[30px] ps-[30px]  font-medium"
                >
                  Edit Profile
                </button>
              </div>
            </div>
            <div>
              <div className="flex flex-col relative">
                <div className="mb-1">
                  <div className="flex flex-row  relative  w-full">
                    <label className="text-label" htmlFor="about">
                      About
                    </label>
                  </div>
                </div>

                <div className="mb-1">
                  <div className="flex flex-row  relative  w-full">
                    <label
                      style={{ minHeight: "90px" }}
                      id="about"
                      className="data-label ms-1 "
                    >
                      {initialValues.about}
                    </label>
                  </div>
                </div>

                <div className="mb-1">
                  <div className="flex flex-row  relative  w-full">
                    <label className="text-label" htmlFor="website">
                      Location:
                    </label>
                    <label
                      id="location"
                      style={{ background: "transparent", textAlign: "left" }}
                      className="data-label "
                    >
                      {initialValues.city}, {initialValues.country}
                    </label>
                  </div>
                </div>

                <div className="mb-1">
                  <div className="flex flex-row  relative  w-full">
                    <label className="text-label" htmlFor="website">
                      Email:
                    </label>
                    <label
                      id="location"
                      style={{ background: "transparent", textAlign: "left" }}
                      className="data-label "
                    >
                      {initialValues.email}
                    </label>
                  </div>
                </div>

                <div className="mb-1">
                  <div className="flex flex-row  relative  w-full">
                    <label className="text-label" htmlFor="website">
                      Website:
                    </label>
                    <label
                      id="location"
                      style={{ background: "transparent", textAlign: "left" }}
                      className="data-label "
                    >
                      {initialValues.website}
                    </label>
                  </div>
                </div>

                <div className="mb-1">
                  <div className="flex flex-row  relative  w-full">
                    <label
                      style={{ width: "auto" }}
                      className="text-label"
                      htmlFor="website"
                    >
                      Member Since:
                    </label>
                    <label
                      id="location"
                      style={{ background: "transparent", textAlign: "left" }}
                      className="data-label "
                    >
                      {initialValues.city}, {initialValues.country}
                    </label>
                  </div>
                </div>

                <div className="mb-1">
                  <div className="flex flex-row  relative  w-full">
                    <label
                      style={{ width: "auto" }}
                      className="text-label"
                      htmlFor="website"
                    >
                      Social
                    </label>
                  </div>
                </div>

                <div className="mb-0 flex flex-row">
                  <div className="flex flex-row input-icons relative w-full">
                    <div className="flex flex-col input-icons ps-5 relative w-full">
                      <div className="flex flex-row input-icons relative w-full">
                        <div className="flex flex-row input-icons ms-1 w-full">
                          <img
                            src={instagramSVG}
                            alt="profile logo"
                            className="icon"
                          />
                          <label
                            style={{ paddingLeft: "54px", height: "44px" }}
                            className="data-label w-full "
                          >
                            {initialValues.instagram}
                          </label>
                        </div>
                        <div className="flex flex-row input-icons ms-6 w-full">
                          <img
                            src={twitterSVG}
                            alt="profile logo"
                            className="icon"
                          />
                          <label
                            style={{ paddingLeft: "54px", height: "44px" }}
                            className="data-label w-full "
                          >
                            {initialValues.twitter}
                          </label>
                        </div>
                      </div>
                      <div className="flex flex-row input-icons relative w-full">
                        <div className="flex flex-row input-icons ms-1 w-full">
                          <img
                            src={githubSVG}
                            alt="profile logo"
                            className="icon"
                          />
                          <label
                            style={{ paddingLeft: "54px", height: "44px" }}
                            className="data-label w-full "
                          >
                            {initialValues.github}
                          </label>
                        </div>
                        <div className="flex flex-row input-icons ms-6 w-full">
                          <img
                            src={linkedInSVG}
                            alt="profile logo"
                            className="icon"
                          />
                          <label
                            style={{ paddingLeft: "54px", height: "44px" }}
                            className="data-label w-full "
                          >
                            {initialValues.linkedin}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GeneralPage;
