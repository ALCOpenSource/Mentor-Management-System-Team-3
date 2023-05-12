import getCountryFlag from "../../countries";
import axiosWithBearer, { axiosWithoutBearer } from "../axios-services";
import {
  ChangePasswordDetails,
  LoggedInUser,
  SystemUser,
  UsernamePassword,
} from "../../redux/types/system-user";
import avatar from '../../../assets/images/avatar.svg';
export const changeCurrentUserPasswordApiAsync = async (
  userDetails: ChangePasswordDetails
) => {
  return userDetails;
};

export const resetCurrentUserPasswordApiAsync = async (userEmail: string) => {
  return userEmail;
};

export const updateCurrentUserApiAsync = async (
  userDetails: SystemUser,
  token: string
) => {
  await axiosWithBearer(token ?? "")
    .put("users/update", userDetails)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
  return userDetails;
};

export const updateCurrentUserProfilePictureApiAsync = async (image: any) => {
  return image;
};

export const loginCurrentUserApiAsync = async (
  userDetails: UsernamePassword
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
      role = obj.role;
      token = obj.access_token;
      return obj;
    })
    .catch((err) => {
      if (userDetails?.afterUnSuccessful) userDetails?.afterUnSuccessful(err);
      throw err;
    });

  const getUser = getToken
    .then(() =>
      axiosWithBearer(token ?? "")
        .get("/users/me")
        .then((data) => {
          return data;
        })
        .catch((err) => {
          if (userDetails?.afterUnSuccessful)
            userDetails?.afterUnSuccessful(err);
          throw err;
        })
    )
    .catch((err) => {
      if (userDetails?.afterUnSuccessful) userDetails?.afterUnSuccessful(err);
      throw err;
    });

  const getUserAvatar = getToken
    .then((tt) =>
      axiosWithBearer(token ?? "").get("/auth/avatar", {
        responseType: 'arraybuffer',
        responseEncoding: "base64"
      })
    )
    .then((res) => {
      return Buffer.from(res.data, "base64");
    })
    .catch((err) => {
      // if (userDetails?.afterUnSuccessful)
      //   userDetails?.afterUnSuccessful(err);
    });

  const finalize = Promise.all([getUser, getUserAvatar])
    .then((userData) => {
      const mx = userData[0].data.data;
      const userProfileImage = userData[1] ?? avatar;

      let loggedInUser: SystemUser = {
        firstNames: mx.firstName,
        lastName: mx.lastName,
        userRole: role,
        website: mx.website,
        about: mx.bio,
        country: mx.country,
        city: mx.city,
        email: mx.email,
        github: mx.socials.github,
        linkedin: mx.socials.linkedin,
        instagram: mx.socials.instagram,
        twitter: mx.socials.twitter,
      };

      const flag = getCountryFlag(loggedInUser.country ?? " ");
      const profilePic = userProfileImage;
      const userToken = token;

      loggedInUser = {
        ...loggedInUser,
        countryFlagIcon: flag,
        userImage: profilePic,
      };
      const user: LoggedInUser = {
        user: loggedInUser,
        userToken: userToken,
      };
      if (userDetails?.afterSuccessful) userDetails?.afterSuccessful();
      return user;
    })
    .catch((err) => {
      const message = err.response.data.message ?? err;
      if (userDetails?.afterUnSuccessful)
        userDetails?.afterUnSuccessful(message);
      throw message;
    });
  return finalize;
};

// var options = {
//   method: 'GET',
//   url: 'https://api.pexels.com/v1/curated',
//   params: {page: '2', per_page: '40'},
//   headers: {Authorization: '_authkey_'}
// };
