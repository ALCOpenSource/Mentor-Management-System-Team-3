import { Privacy } from "../../redux/types/privacy";
import { NameDetails } from "../../redux/types/system-user";

export const updatePrivacyItemApiAsync = async (privacyDetails: {
  key: string;
  value: boolean;
  obj:Privacy;
}) => {
  //update api call
  console.log("changed privacy", privacyDetails);
  //todo

  return privacyDetails;
};

export const updateAllPrivaciesApiAsync = async (
  privacyDetails: Privacy
) => {
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
