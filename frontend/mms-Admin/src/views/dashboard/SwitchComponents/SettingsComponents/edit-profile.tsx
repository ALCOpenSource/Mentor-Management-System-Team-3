import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import avatar from "./../../../../assets/images/avatar.svg";
import "../index.css";
import VALIDATION_PATTERNS from "../../../../assets/validation-patterns";
import FormikValidationMessageComponent from "../../../../components/error-messages/formik-validation-message-component";
import linkedInSVG from "../../../../assets/images/social/Linkedin.svg";
import githubSVG from "../../../../assets/images/social/Github.svg";
import twitterSVG from "../../../../assets/images/social/Twitter.svg";
import instagramSVG from "../../../../assets/images/social/Instagram.svg";
import { SystemUser } from "../../../../services/redux/types/system-user";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../services/redux/Store";
import {
  selectCurrentUser,
  selectCurrentUserProfilePicture,
  updateCurrentUser,
  updateCurrentUserProfilePicture,
} from "../../../../services/redux/slices/current-user-slice";
import { countries } from "../../../../services/countries";
import MessagePopUpPage from "../../../../components/messages/message-pop-up";

const EditProfilePage: React.FC = () => {
  const obj = useAppSelector(selectCurrentUser);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [filebase64, setFileBase64] = useState<string>(
    useAppSelector(selectCurrentUserProfilePicture) ?? avatar
  );

  const showErrorMessage = (tt: any) => {
    try {
      setErrorMessage(tt?.message ?? tt);
    } catch (err) {
      setErrorMessage(tt);
    }
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setSuccessMessage("");
  //     setErrorMessage("");
  //   }, 10000)
  // }, [errorMessage])

  const initialValues: SystemUser = {
    firstNames: "",
    lastName: "",
    bio: "",
    website: "",
    country: "",
    city: "",
    github: "",
    linkedin: "",
    instagram: "",
    twitter: "",
    userId: "",
    role: "",
    email: ""
  };

  if (obj) {
    initialValues.firstNames = obj.firstNames;
    initialValues.lastName = obj.lastName;
    initialValues.userId = obj.userId;
    initialValues.email = obj.email;
    initialValues.role = obj.role;
    initialValues.bio = obj.bio;
    initialValues.website = obj.website;
    initialValues.country = obj.country;
    initialValues.city = obj.city;
    initialValues.github = obj.github;
    initialValues.linkedin = obj.linkedin;
    initialValues.instagram = obj.instagram;
    initialValues.twitter = obj.twitter;
    initialValues.userImage = obj.userImage;
    initialValues.countryFlagIcon = obj.countryFlagIcon;
  }




  function convertFile(files: FileList | null) {
    try {
      if (files) {
        const fileRef = files[0] || "";
        const fileType: string = fileRef.type || "";
        console.log("This file upload is of type:", fileType);
        const reader = new FileReader();
        reader.readAsBinaryString(fileRef);
        reader.onload = async (ev: any) => {
          const img = `data:${fileType};base64,${btoa(ev.target.result)}`;
          // convert it to base64
          setFileBase64(img);
          try {
            dispatch(updateCurrentUserProfilePicture(img))
              .then(err => setSuccessMessage("Successfully changed profile picture"))
              .catch(err => showErrorMessage(err));
          } catch (error) { showErrorMessage(error) }
        };
      }
    } catch (ee) {
      console.log(ee);
    }
  }

  const validationSchema = Yup.object().shape({
    firstNames: Yup.string().required("First name is required please"),
    lastName: Yup.string().required("Last name is required please"),
    bio: Yup.string().required("Please your bio is required"),
    website: Yup.string().matches(
      VALIDATION_PATTERNS.WEBSITE_URL,
      "Please enter a valid website url"
    ),
    github: Yup.string().matches(
      VALIDATION_PATTERNS.GITHUB_PROFILE,
      "Please enter a valid github profile"
    ),
    linkedin: Yup.string().matches(
      VALIDATION_PATTERNS.LINKEDIN_PROFILE,
      "Please enter a valid linkedin profile"
    ),
    instagram: Yup.string().matches(
      VALIDATION_PATTERNS.INSTAGRAM_PROFILE,
      "Please enter a valid instagram profile"
    ),
    twitter: Yup.string().matches(
      VALIDATION_PATTERNS.TWITTER,
      "Please enter a valid twitter profile"
    ),
  });

  const dispatch = useAppDispatch();
  const handleSubmit = async (values: SystemUser) => {
    try {
      await dispatch(updateCurrentUser(values))
        .then(tt => {
          setSuccessMessage("Successfully updated");
        })
        .catch(error => showErrorMessage(error));
    } catch (error) { showErrorMessage(error) }
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
            <div className="row w-full mb-6">
              <div className="flex items-start justify-start w-full flex-row mt-[2%]">
                <img
                  src={filebase64}
                  className="ms-3 mt-4 profile-avatar"
                  alt="user profile avatar"
                />
                <div>
                  <h3 className="text-black text-2xl ms-11 pt-3 pb-3 font-bold">
                    Set Profile Picture
                  </h3>
                  <label
                    className="btn-primary ms-11"
                    htmlFor="uploadFile"
                  >
                    Update Picture
                  </label>
                  <input
                    type="file"
                    id="uploadFile"
                    name="uploadFile"
                    accept="image/*"
                    className="bg-green-three ms-11 text-white rounded-[10px] p-[5px]  pe-[30px] ps-[30px]  font-medium mt-1"
                    onChange={(e) => convertFile(e.target.files)}
                  />
                </div>
                <div className="ms-5">
                  <h5 className="text-1xl text-gray-two font-bold mt-4">
                    {successMessage}
                  </h5>

                  <h5
                    style={{ color: "orangered" }}
                    className="text-1xl font-bold mt-4"
                  >
                    {errorMessage}
                  </h5>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col relative">
                <div className="mb-5">
                  <div className="flex flex-row  relative  w-full">
                    <label className="text-label" htmlFor="lastName">
                      Full Name
                    </label>
                    <Field
                      type="text"
                      id="firstNames"
                      name="firstNames"
                      placeholder="First Name"
                      className="general-text-input text-input ms-1 border-2 border-lightGray-two rounded-[5px] text-[15px] "
                    />
                    <Field
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      className="general-text-input text-input ms-6 border-2 border-lightGray-two rounded-[5px] text-[15px] "
                    />
                  </div>
                  <FormikValidationMessageComponent name="firstNames" />
                  <FormikValidationMessageComponent name="lastName" />
                </div>

                <div className="mb-5">
                  <div className="flex flex-row  relative  w-full">
                    <label className="text-label" htmlFor="bio">
                      About
                    </label>
                    <Field
                      type="text"
                      id="bio"
                      style={{ minHeight: "120px" }}
                      as="textarea"
                      name="bio"
                      placeholder="Your Bio"
                      className="general-text-input text-input ms-1 border-2 border-lightGray-two rounded-[5px] text-[15px] "
                    />
                  </div>
                  <FormikValidationMessageComponent name="bio" />
                </div>

                <div className="mb-5">
                  <div className="flex flex-row  relative  w-full">
                    <label className="text-label" htmlFor="website">
                      Website
                    </label>
                    <Field
                      type="text"
                      id="website"
                      name="website"
                      placeholder="www.example.com"
                      className="general-text-input text-input ms-1 border-2 border-lightGray-two rounded-[5px] text-[15px] "
                    />
                  </div>
                  <FormikValidationMessageComponent name="website" />
                </div>

                <div className="mb-5">
                  <div className="flex flex-row  relative  w-full">
                    <label className="text-label" htmlFor="country">
                      Country
                    </label>
                    <Field
                      id="country"
                      name="country"
                      placeholder="Select Country"
                      className="form-control general-text-input text-input ms-1 border-2 border-lightGray-two rounded-[5px] text-[15px] "
                      as="select"
                    //onChange={this.onItemTypeDropdownSelected}
                    >
                      {countries.map((item, i) => (<option>{item.name}</option>))}
                    </Field>
                    <label
                      style={{ paddingLeft: "44px" }}
                      className="text-label"
                      htmlFor="country"
                    >
                      City
                    </label>
                    <Field
                      type="text"
                      name="city"
                      list="cities"
                      id="city"
                      placeholder="Select City"
                      className="form-control general-text-input text-input ms-1 border-2 border-lightGray-two rounded-[5px] text-[15px] "
                    />
                    <datalist id="cities">
                      {countries.map((item, i) => (<option
                        value={`${item.capital}`}
                        key={`${item.capital}`}
                      >
                        {`${item.capital}`}
                      </option>))}
                    </datalist>
                  </div>
                  <FormikValidationMessageComponent name="country" />
                  <FormikValidationMessageComponent name="city" />
                </div>

                <div className="mb-0 flex flex-row">
                  <div className="flex flex-row input-icons relative w-full">
                    <label className="text-label" htmlFor="github">
                      Social
                    </label>
                    <div className="flex flex-col input-icons ps-5 relative w-full">
                      <div className="flex flex-row input-icons relative w-full">
                        <div className="flex flex-row input-icons ms-1 w-full">
                          <img
                            src={githubSVG}
                            alt="profile logo"
                            className="icon"
                          />
                          <Field
                            disabled
                            type="text"
                            value="GitHub"
                            className="text-input input-icon-label ms-1 border-2 border-lightGray-two rounded-[5px] ps-14 text-[15px] "
                          />
                          <Field
                            type="text"
                            id="github"
                            name="github"
                            placeholder="@githubuser"
                            className="general-text-input text-input input-icon-field ms-0 border-2 border-lightGray-two rounded-[5px] ps-14 text-[15px] "
                          />
                        </div>
                        <div className="flex flex-row input-icons ms-6 w-full">
                          <img
                            src={instagramSVG}
                            alt="profile logo"
                            className="icon"
                          />
                          <Field
                            disabled
                            type="text"
                            value="Instagram"
                            className="text-input input-icon-label ms-1 border-2 border-lightGray-two rounded-[5px] ps-14 text-[15px] "
                          />
                          <Field
                            type="text"
                            id="instagram"
                            name="instagram"
                            placeholder="@instagramuser"
                            className="general-text-input text-input input-icon-field ms-0 border-2 border-lightGray-two rounded-[5px] ps-14 text-[15px] "
                          />
                        </div>
                      </div>
                      <div className="flex flex-row input-icons relative w-full">
                        <div className="flex flex-row input-icons ms-1 w-full">
                          <img
                            src={linkedInSVG}
                            alt="profile logo"
                            className="icon"
                          />
                          <Field
                            disabled
                            type="text"
                            value="LinkedIn"
                            className="text-input input-icon-label ms-1 border-2 border-lightGray-two rounded-[5px] ps-14 text-[15px] "
                          />
                          <Field
                            type="text"
                            id="linkedin"
                            name="linkedin"
                            placeholder="@linkedinuser"
                            className="general-text-input text-input input-icon-field ms-0 border-2 border-lightGray-two rounded-[5px] ps-14 text-[15px] "
                          />
                        </div>
                        <div className="flex flex-row input-icons ms-6 w-full">
                          <img
                            src={twitterSVG}
                            alt="profile logo"
                            className="icon"
                          />
                          <Field
                            disabled
                            type="text"
                            value="Twitter"
                            className="text-input input-icon-label ms-1 border-2 border-lightGray-two rounded-[5px] ps-14 text-[15px] "
                          />
                          <Field
                            type="text"
                            id="twitter"
                            name="twitter"
                            placeholder="@twitteruser"
                            className="general-text-input text-input input-icon-field ms-0 border-2 border-lightGray-two rounded-[5px] ps-14 text-[15px] "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <FormikValidationMessageComponent name="github" />
                <FormikValidationMessageComponent name="instagram" />
                <FormikValidationMessageComponent name="linkedin" />
                <FormikValidationMessageComponent name="twitter" />
              </div>
            </div>
            {successMessage?.length > 7
              && (<MessagePopUpPage
                persist={false}
                toggle={() => { setSuccessMessage(""); setErrorMessage("") }}
                message={"Profile Successfully Saved"} />
              )}
            <div className="flex w-full">
              <button
                type="submit"
                style={{ marginLeft: "auto" }}
                className="btn-primary mt-1"
              >
                Save Changes
              </button>
            </div>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfilePage;
