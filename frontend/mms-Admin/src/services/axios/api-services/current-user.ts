import getCountryFlag from "../../countries";
import axiosWithBearer, { axiosWithoutBearer } from "../axios-services";
import {
  ChangePasswordDetails,
  LoggedInUser,
  SystemUser,
  UsernamePassword,
} from "../../redux/types/system-user";
import avatar from "../../../assets/images/avatar.svg";
import { capitalizeEachWord } from "../../generalFunctions";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  updateLoggedInCurrentUser,
  updateLoggedInUserToken,
} from "../../redux/slices/current-user-slice";
export const changeCurrentUserPasswordApiAsync = async (
  userDetails: ChangePasswordDetails,
  token: string
) => {
  const data = {
    newPassword: userDetails.newPassword,
    currentPassword: userDetails.currentPassword,
    confirmNewPassword: userDetails.confirmPassword,
    userId: userDetails.userId,
  };

  const updatePassword = await axiosWithBearer(token ?? "")
    .patch("/auth/change-password", data)
    .then((data) => {
      return userDetails;
    })
    .catch((err) => {
      throw err?.response?.data?.message ?? err;
    });
  return updatePassword;
};

export const resetCurrentUserPasswordApiAsync = async (userEmail: string) => {
  return userEmail;
};

export const updateCurrentUserApiAsync = async (
  userDetails: SystemUser,
  token: string
) => {
  const firstName = userDetails.firstNames;
  const data: any = { ...userDetails, firstName };
  const update = await axiosWithBearer(token ?? "")
    .put("users/update", data)
    .then((data) => {
      return userDetails;
    })
    .catch((err) => {
      throw err?.response?.data?.message ?? err;
    });
  return update;
};

// export const updateCurrentUserProfilePictureApiAsync = async (image: any, token:string) => {
//   const saveUserAvatar =
//     axiosWithBearer(token ?? "").patch("/auth/avatar",image, {
//       responseType: "arraybuffer",
//       responseEncoding: "base64",
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//     })
//   .then((res) => {
//     //return Buffer.from(res.data, "base64");
//     return image;
//   })
//   .catch((err) => {
//     throw err;
//   });

//   return saveUserAvatar;
// };

export const updateCurrentUserProfilePictureApiAsync = async (
  image: any,
  token: string
) => {
  const bodyFormData = new FormData();
  bodyFormData.append("avatar", image);
  
  const saveUserAvatar = axiosWithBearer(token ?? "")
    .patch("/users/avatar", bodyFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      return image;
    })
    .catch((err) => {
      throw err?.response?.data?.message ?? err;
    });

  return saveUserAvatar;
};

export const logoutCurrentUserApiAsync = async () => { };

// export const loginCurrentUserApiAsync = async (
//   userDetails: UsernamePassword, dispatch: ThunkDispatch<unknown, unknown, AnyAction>
// ) => {
//   return new Promise<LoggedInUser>(function(resolve, reject){
//     if (userDetails?.afterSuccessful) userDetails?.afterSuccessful();
//     return getUser(dispatch);
//   })
// }

// function getUser(dispatch: ThunkDispatch<unknown, unknown, AnyAction>): LoggedInUser {
//   const flag = getCountryFlag("Ke");

//   const oldUser: SystemUser = {
//     firstNames: "Kabiru",
//     lastName: "Ibrahim",
//     userRole: "Admin",
//     about:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim  ut cursus purus efficitur et. Duis ac enim tellus. Phasellus pharetra metus, ut cursus purus efficitur et. Duis ac enim tellus. Phasellus eget tortor dapibus, laoreet mauris sed, dignissim lectus.  Duis ac enim tellus. Phasellus pharetra metus, ut cursus purus efficitur et. Duis ac enim tellus. Phasellus eget tortor dapibus, laoreet mauris sed, dignissim lectus. ",
//     website: "www.pecular.com",
//     country: "Nigeria",
//     city: "Lagos",
//     email: "pecular@andela.com",
//     github: "@pecular.umeh",
//     linkedin: "@pecular.umeh",
//     instagram: "@pecular.umeh",
//     twitter: "@pecular.umeh",
//     countryFlagIcon: flag,
//     userImage: avatar
//   };

//   const dispatch = useAppDispatch();
//dispatch(updateLoggedInCurrentUser(oldUser));
//   const logedInUser: LoggedInUser = {
//     user: oldUser,
//     userToken: "djhsgf dfgsdfjgdf gdfgsdfngsdf gdfgsdf",
//     loginTime: new Date().getTime(),
//   };
//   return logedInUser;
// }
export const loginCurrentUserApiAsync = async (
  userDetails: UsernamePassword,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
) => {
  const { username, password } = userDetails;
  let role: string | undefined = undefined;
  let token: string | undefined = undefined;

  const getToken = axiosWithoutBearer
    .post<{
      data: { access_token: string; email: string; id: string; role: string };
    }>("/auth/login", {
      email: `${username}`,
      password: `${password}`,
    })
    .then((data) => {
      const obj = data.data.data;
      role = obj.role ?? "Admin";
      token = obj.access_token;
      return obj;
    })
    .catch((err) => {
      throw err?.response?.data?.message ?? err;
    });

  const getUser = getToken
    .then(() =>
      axiosWithBearer(token ?? "")
        .get("/users/me")
        .then((data) => {
          return data;
        })
        .catch((err) => {
          throw err?.response?.data?.message ?? err;
        })
    )
    .catch((err) => {
      throw err?.response?.data?.message ?? err;
    });

  const getUserAvatar = getToken
    .then((tt) =>
      axiosWithBearer(token ?? "").get("/users/avatar", {
        responseType: "arraybuffer",
        responseEncoding: "base64",
      })
    )
    .then((res) => {
      return Buffer.from(res.data, "base64");
    })
    .catch((err) => {
      // if (userDetails?.afterUnSuccessful)
      //   userDetails?.afterUnSuccessful(err);
    });

  role = "Admin";
  const finalize = Promise.all([getUser, getUserAvatar])
    .then((userData) => {
      const mx = userData[0].data.data;
      const userProfileImage = userData[1] ?? avatar;

      let loggedInUser: SystemUser = {
        userId: mx.userId,
        firstNames: capitalizeEachWord(mx.firstName),
        lastName: capitalizeEachWord(mx.lastName),
        role: role ? capitalizeEachWord(role) : undefined,
        website: mx.website,
        bio: mx.bio,
        country: capitalizeEachWord(mx.country),
        city: capitalizeEachWord(mx.city),
        email: mx.email,
        github: mx.socials?.github,
        linkedin: mx.socials?.linkedin,
        instagram: mx.socials?.instagram,
        twitter: mx.socials?.twitter,
      };
      const flag = getCountryFlag(loggedInUser.country ?? " ");
      const profilePic = userProfileImage;
      const userToken = token;

      loggedInUser = {
        ...loggedInUser,
        countryFlagIcon: flag,
        userImage: profilePic,
      };

      dispatch(updateLoggedInCurrentUser(loggedInUser));
      dispatch(updateLoggedInUserToken(userToken));

      const user: LoggedInUser = {
        user: loggedInUser,
        userToken: userToken,
      };
      return user;
    })
    .catch((err) => {
      throw err?.response?.data?.message ?? err;
    });
  return finalize;
};


export const loginCurrentUserWIthGoogleApiAsync = async (
  userDetails: {
    email: string;
    displayName: string;
    profilePicture: string
  },
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
) => {
  const { email, displayName, profilePicture } = userDetails;
  let role: string | undefined = undefined;
  let token: string | undefined = undefined;

  const getToken = axiosWithoutBearer
    .post<{
      data: { access_token: string; email: string; id: string; role: string };
    }>("/auth/google/login", {
      email: `${email}`,
      profilePicture: `${profilePicture}`,
      displayName: `${displayName}`
    })
    .then((data) => {
      const obj = data.data.data;
      role = obj.role ?? "Admin";
      token = obj.access_token;
      return obj;
    })
    .catch((err) => {
      throw err?.response?.data?.message ?? err;
    });

  const getUser = getToken
    .then(() =>
      axiosWithBearer(token ?? "")
        .get("/users/me")
        .then((data) => {
          return data;
        })
        .catch((err) => {
          throw err?.response?.data?.message ?? err;
        })
    )
    .catch((err) => {
      throw err?.response?.data?.message ?? err;
    });

  const getUserAvatar = getToken
    .then((tt) =>
      axiosWithBearer(token ?? "").get("/users/avatar", {
        responseType: "arraybuffer",
        responseEncoding: "base64",
      })
    )
    .then((res) => {
      return Buffer.from(res.data, "base64");
    })
    .catch((err) => {
      // if (userDetails?.afterUnSuccessful)
      //   userDetails?.afterUnSuccessful(err);
    });

  role = "Admin";
  const finalize = Promise.all([getUser, getUserAvatar])
    .then((userData) => {
      const mx = userData[0].data.data;
      const userProfileImage = userData[1] ?? avatar;

      let loggedInUser: SystemUser = {
        userId: mx.userId,
        firstNames: capitalizeEachWord(mx.firstName),
        lastName: capitalizeEachWord(mx.lastName),
        role: role ? capitalizeEachWord(role) : undefined,
        website: mx.website,
        bio: mx.bio,
        country: capitalizeEachWord(mx.country),
        city: capitalizeEachWord(mx.city),
        email: mx.email,
        github: mx.socials?.github,
        linkedin: mx.socials?.linkedin,
        instagram: mx.socials?.instagram,
        twitter: mx.socials?.twitter,
      };
      console.log("dsa e1", mx);
      const flag = getCountryFlag(loggedInUser.country ?? " ");
      const profilePic = userProfileImage;
      const userToken = token;
      console.log("dsa e2", mx);

      loggedInUser = {
        ...loggedInUser,
        countryFlagIcon: flag,
        userImage: profilePic,
      };

      console.log("dsa 3", loggedInUser);
      dispatch(updateLoggedInCurrentUser(loggedInUser));
      dispatch(updateLoggedInUserToken(userToken));

      const user: LoggedInUser = {
        user: loggedInUser,
        userToken: userToken,
      };
      return user;
    })
    .catch((err) => {
      throw err?.response?.data?.message ?? err;
    });
  return finalize;
};
// var options = {
//   method: 'GET',
//   url: 'https://api.pexels.com/v1/curated',
//   params: {page: '2', per_page: '40'},
//   headers: {Authorization: '_authkey_'}
// };
