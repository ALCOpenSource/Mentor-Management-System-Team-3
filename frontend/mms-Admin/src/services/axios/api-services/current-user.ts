import getCountryFlag from "../../countries";
import {
  ChangePasswordDetails,
  LoggedInUser,
  SystemUser,
  UsernamePassword,
} from "../../redux/types/system-user";

export const changeCurrentUserPasswordApiAsync = async (
  userDetails: ChangePasswordDetails
) => {
  return userDetails;
};

export const updateCurrentUserApiAsync = async (userDetails: SystemUser) => {
  return userDetails;
};

export const updateCurrentUserProfilePictureApiAsync = async (image: any) => {
  return image;
};

export const loginCurrentUserApiAsync = async (
  userDetails: UsernamePassword
) => {
  // const response = await fetch("http://localhost:8000/current-user", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     name,
  //   }),
  //});
  //const data = await response.json();
  //return data;
  try {
    let loggedInUser: SystemUser = {
      firstNames: "Eliud",
      lastName: "Amukambwa",
      userRole: "Admin",
      about:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim  ut cursus purus efficitur et. Duis ac enim tellus. Phasellus pharetra metus, ut cursus purus efficitur et. Duis ac enim tellus. Phasellus eget tortor dapibus, laoreet mauris sed, dignissim lectus.  Duis ac enim tellus. Phasellus pharetra metus, ut cursus purus efficitur et. Duis ac enim tellus. Phasellus eget tortor dapibus, laoreet mauris sed, dignissim lectus. ",
      website: "www.pilgrims.com",
      country: "Us",
      city: "Nairobi",
      email: "eliudfromkenya@gmail.com",
      github: "@pecular.umeh",
      linkedin: "@pecular.umeh",
      instagram: "@pecular.umeh",
      twitter: "@pecular.umeh",
    };

    //const userP =  `./../../../assets/images/flag-icons-main/flags/4x3/ug.svg`;

    console.log("fg 1", loggedInUser);
    const flag = getCountryFlag(loggedInUser.country ?? " ");
    const profilePic = getCountryFlag("uganda"); // await readFile(getCountryFlag(loggedInUser.country ?? " "));
    const userToken = "my user token";

    loggedInUser = {
      ...loggedInUser,
      countryFlagIcon: flag,
      userImage: profilePic,
    };
    console.log("fg", loggedInUser);
    const user: LoggedInUser = {
      user: loggedInUser,
      userToken: userToken
    };
   // throw new Error("Invalid email or password, please check and try again.");
    if (userDetails?.afterSuccessful) userDetails?.afterSuccessful();
    return user;
  } catch (err) {
    if (userDetails?.afterUnSuccessful)
      userDetails?.afterUnSuccessful(err);
    console.log(err);
    throw err;
  }
};
