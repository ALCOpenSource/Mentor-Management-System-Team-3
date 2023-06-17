import { MentorProp } from "../../../views/dashboard/SwitchComponents/AdminMessagesComponents/select-someone";
import { getRandomInteger } from "../../mathFunctions";
import avatarSVG from "./../../../assets/images/avatar.svg";
import googleSVG from "./../../../assets/images/google.svg";
import { addMinutes } from "../../dateFunctions";
import { randomizeArray } from "../../generalFunctions";

export type Status = "IN PROGRESS" | "CANCELLED" | "COMPLETED";
export type ReportDetail = [string, string] | [string, string, ReportDetail[]];

export interface Program {
  icon: any;
  title: string;
  doneBy: string;
  url: string;
  status: Status;
  from: Date;
  to: Date;
  details?: string;
  mentorAssigned: MentorProp[];
  mentorManagersAssigned: MentorProp[];
  creteriasAssigned: MentorProp[];
}

export const saveTaskApiAsync = async (
  task: Program,
  token: string,
  isUpdating: boolean,
  userId: string,
  userEmail: string
) => {
  console.log(task, token, isUpdating, userEmail, userId);
  return await Promise.resolve(task);
};

export const fetchAllProgramsDataApiAsync = async (
  token: string,
  userId: string,
  email: string
) => {
  const tasks: Program[] = [];
  for (let index = 0; index < 20; index++) {
    let rnd = getRandomInteger(0, 10);
    let status: Status = "IN PROGRESS";
    if (rnd === 1) status = "CANCELLED";
    if (rnd > 1 && rnd < 5) status = "COMPLETED";

    rnd = getRandomInteger(0, getRandomInteger(2, 4));
    let user = "Ibrahim Kabiru";
    if (rnd === 1) user = "Alvis Davis";
    else if (rnd === 2) user = "Peculiar Umeh";

    rnd = getRandomInteger(0, getRandomInteger(3, 4));
    const fromDate = addMinutes(
      new Date(),
      (rnd === 2 ? -1 : 1) * getRandomInteger(60, 27000)
    );
    const toDate = addMinutes(fromDate, getRandomInteger(70, 27000));
    const task: Program = {
      icon: googleSVG,
      title: "Google Africa Scholarship Report " + (index + 1),
      doneBy: user,
      url: "reports",
      status: status,
      from: fromDate,
      to: toDate,
      mentorAssigned: [],
      mentorManagersAssigned: [],
      creteriasAssigned: [],
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. ",
    };

    Promise.all([
      fetchAllMentorApiAsync(token, userId, email),
      fetchAllMentorManagerApiAsync(token, userId, email),
    ]).then((tt) => {
      const allMentors = randomizeArray(tt[0]);
      const allMentorManagers = randomizeArray(tt[1]);

      for (let i = 0; i < getRandomInteger(0, getRandomInteger(5, 40)); i++) {
        task.mentorAssigned.push(allMentors[i]);
      }
      for (let i = 0; i < getRandomInteger(0, getRandomInteger(5, 20)); i++) {
        task.mentorManagersAssigned.push(allMentorManagers[i]);
      }
    });

    for (let i = 0; i < getRandomInteger(0, getRandomInteger(5, 100)); i++) {
      //task.creteriasAssigned.push([]);
    }

    tasks.push(task);
  }
  return await Promise.resolve(tasks);
};

export const fetchAllMentorApiAsync = async (
  token: string,
  userId: string,
  email: string
) => {
  const mentors: MentorProp[] = [];
  for (let i = 0; i < 100; i++) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - getRandomInteger(0, 1500000));
    mentors.push({
      name: "Mentor User " + i,
      icon: avatarSVG,
      details: "Program Assistant, Andela, She/her",
      title: "PROGRAM ASST.",
      mentor: "MENTOR-GADS",
    });
  }
  return await Promise.resolve(mentors);
};


export const fetchAllCreteriasApiAsync = async (
  token: string,
  userId: string,
  email: string
) => {
  const mentors: MentorProp[] = [];
  for (let i = 0; i < 100; i++) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - getRandomInteger(0, 1500000));
    mentors.push({
      name: "Mentor User " + i,
      icon: avatarSVG,
      details: "Program Assistant, Andela, She/her",
      title: "PROGRAM ASST.",
      mentor: "MENTOR-GADS",
    });
  }
  return await Promise.resolve(mentors);
};

export const fetchAllMentorManagerApiAsync = async (
  token: string,
  userId: string,
  email: string
) => {
  const mentors: MentorProp[] = [];
  for (let i = 0; i < 100; i++) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - getRandomInteger(0, 1500000));
    mentors.push({
      name: "MMS User " + i,
      icon: avatarSVG,
      details: "Program Assistant, Andela, She/her",
      title: "PROGRAM ASST.",
      mentor: "MENTOR-GADS",
    });
  }
  return await Promise.resolve(mentors);
};
