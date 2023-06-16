import { RequestType } from "../../../views/dashboard/SwitchComponents/ApprovalRequestsComponents";
import MentorIcon from "./../../../assets/images/approval-requests/mentors-request.svg";
import Programcon from "./../../../assets/images/approval-requests/programs-requests.svg";
import MMSIcon from "./../../../assets/images/approval-requests/mentor-manager-request.svg";

import MentorAvatar from "./../../../assets/images/approval-requests/mentor-avatar.svg";
import ProgramAvatar from "./../../../assets/images/approval-requests/program-avatar.svg";
import MMSAvatar from "./../../../assets/images/approval-requests/mentor-manager-avatar.svg";

import { getRandomInteger } from "../../mathFunctions";
import { randomizeArray } from "../../generalFunctions";
import { MentorUser } from "../../redux/types/system-user";

export const fetchApprovalRequestsMetaDataApiAsync = async (
  token: string,
  userId: string,
  email: string
) => {
  const categories: { icon: any; name: string; url: string; num: number }[] =
    [];
  const recents: {
    icon: any;
    name: string;
    url: string;
    type: RequestType;
    num: number;
  }[] = [];
  categories.push({
    icon: MMSIcon,
    url: "mentor-manager-request",
    name: "Mentor Manager Requests",
    num: getRandomInteger(100, 500),
  });
  categories.push({
    icon: MentorIcon,
    url: "mentor-request",
    name: "Mentor Requests",
    num: getRandomInteger(100, 400),
  });
  categories.push({
    icon: Programcon,
    url: "program-request",
    name: "Program Requests",
    num: getRandomInteger(100, 450),
  });

  for (let index = 0; index < 4; index++) {
    recents.push({
      icon: MentorAvatar,
      url: "mentor-request-details",
      name: "Kbiru Ibrahim",
      num: 0,
      type: "MENTOR-REQUEST",
    });
  }
  for (let index = 0; index < 4; index++) {
    recents.push({
      icon: ProgramAvatar,
      url: "program-request-details",
      name: "Google Developer Program 202" + index,
      num: getRandomInteger(index, 30),
      type: "PROGRAM-REQUEST",
    });
  }
  for (let index = 0; index < 4; index++) {
    recents.push({
      icon: MMSAvatar,
      url: "mentor-manager-request-details",
      name: "Alvis Davis",
      num: 0,
      type: "MENTOR-MANAGER-REQUEST",
    });
  }

  let cats = await Promise.resolve(categories);
  let recs = await Promise.resolve(randomizeArray(recents));
  return Promise.all([cats, recs]);
};

export const fetchMentorManagersApprovalRequestsApiAsync = async (
  token: string,
  userId: string,
  email: string
) => {
  const mentorManagerRequests: MentorUser[] = [];
  for (let i = 0; i < 100; i++) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - getRandomInteger(0, 1500000));
    mentorManagerRequests.push({
      firstNames:"Davis",
      lastName:"Alison "+ i,
      userAvatar: getRandomInteger(0, 2) === 1 ? MMSAvatar : MentorAvatar,
      details: "Program Assistant, Andela, She/her",
      title: "PROGRAM ASST.",
      mentor: "MENTOR-GADS",
      bio:" Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium omnis aut magnam illo aliquid quis. Maiores tempora quis, asperiores accusamus officia earum minima ducimus labore! Dolorem impedit praesentium culpa omnis.",
      technicalProficiency:"Java Script, Django, Mysql, Android",
      previousPrograms:["GADS 2022","Google I/O Extended 2021"],
      previousRolesHeld:["Learner","Mentor","Program Assistant",  "Program Assistant Lead"],
      availabiityForNewProgram:"available",
      programOfInterest:"Google Africa Scholarship Program",
      beenAmentorBefore:true,
      technicalYearsExperience:3,
      documents:["my CV.doc","birth Certificate.pdf"],
      status:"PENDING"
    });
  }
  return await Promise.resolve(mentorManagerRequests);
};

export const fetchMentorsApprovalRequestsApiAsync = async (
  token: string,
  userId: string,
  email: string
) => {
  const mentorRequests: MentorUser[] = [];
  for (let i = 0; i < 100; i++) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - getRandomInteger(0, 1500000));
    mentorRequests.push({
      firstNames:"Ibrahim",
      lastName:"Kabiru "+ i,
      userAvatar: getRandomInteger(0, 2) === 1 ? MMSAvatar : MentorAvatar,
      details: "Program Assistant, Andela, She/her",
      title: "PROGRAM ASST.",
      mentor: "MENTOR-GADS",
      bio:" Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium omnis aut magnam illo aliquid quis. Maiores tempora quis, asperiores accusamus officia earum minima ducimus labore! Dolorem impedit praesentium culpa omnis.",
      technicalProficiency:"Java Script, Django, Mysql, Android",
      previousPrograms:["GADS 2022","Google I/O Extended 2021"],
      previousRolesHeld:["Learner","Mentor","Program Assistant",  "Program Assistant Lead"],
      availabiityForNewProgram:"available",
      programOfInterest:"Google Africa Scholarship Program",
      beenAmentorBefore:true,
      technicalYearsExperience:3,
      documents:["my CV.doc","birth Certificate.pdf"],
      status:"PENDING"
    });
  }
  return await Promise.resolve(mentorRequests);
};


export const fetchProgramsApprovalRequestsApiAsync = async (
  token: string,
  userId: string,
  email: string
) => {
  const mentorRequests: {
    icon: any;
    name: string;
    url: string;
    num: number;
  }[] = [];
  for (let i = 0; i < 100; i++) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - getRandomInteger(0, 1500000));
    mentorRequests.push({
      icon: ProgramAvatar,
      url: "program-request",
      name: "Google Africa Scholarship Program " + i,
      num: getRandomInteger(100, 450)
    });
  }
  return await Promise.resolve(mentorRequests);
};