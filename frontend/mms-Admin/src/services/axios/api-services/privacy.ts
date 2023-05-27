import { Privacy } from "../../redux/types/privacy";
import { NameDetails } from "../../redux/types/system-user";
import axiosWithBearer from "../axios-services";

export const updatePrivacyItemApiAsync = async (
  privacyDetails: {
    key: string;
    value: boolean;
    obj: Privacy;
  },
  token: string
) => {
  const value = {
    enableAllSocialLinksVisibility: privacyDetails.obj.showContactInfo ?? false,
    enableGithubLinkVisibility: privacyDetails.obj.showGitHub ?? false,
    enableInstagramLinkVisibility: privacyDetails.obj.showInstagram ?? false,
    enableLinkedinLinkVisibility: privacyDetails.obj.showLinkedin ?? false,
    enableTwitterLinkVisibility: privacyDetails.obj.showTwitter ?? false,
  };

  const updatePrivacy = await axiosWithBearer(token ?? "")
    .patch("/preferences/privacy", value)
    .then((data) => {      
      return privacyDetails;
    })
    .catch((err) => {
      throw err?.response?.data?.message ?? err;
    });
  return updatePrivacy;
};

export const updateAllPrivaciesApiAsync = async (privacyDetails: Privacy) => {
  //update api call
  console.log("update privacyDetails mmmm", privacyDetails);
  //todo

  return privacyDetails;
};

export const fetchPrivaciesApiAsync = async (
  userDetails: NameDetails,
  privacyDetails: Privacy
) => {
  //update api call
  //console.log("update privacyDetails mmmm", privacyDetails);
  //todo

  return privacyDetails;
};
