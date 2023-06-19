import { MentorProp } from "../../../views/dashboard/SwitchComponents/AdminMessagesComponents/select-someone";
import { getRandomInteger } from "../../mathFunctions";
import TasksIcon from "./../../../assets/images/dashboard-icons/tsaks.svg";
import avatarSVG from "./../../../assets/images/avatar.svg";
import reportSVG from "./../../../assets/images/reports-2.svg";
import { randomizeArray } from "../../generalFunctions";
import { addMinutes } from "../../dateFunctions";

export type Status = "IN PROGRESS" | "CANCELLED" | "COMPLETED";
export type ReportDetail = [string, string] | [string, string, ReportDetail[]];
export interface ProgramTask {
  icon: any;
  title: string;
  details: string;
  url: string;
  status: Status;
  mentorManagersAssigned: MentorProp[];
  mentorAssigned: MentorProp[];
  taskReports: string[];
}

export interface ProgramReport {
  icon: any;
  title: string;
  doneBy: string;
  url: string;
  status: Status;
  from: Date;
  to: Date;
  details?: ReportDetail[];
}

export const saveTaskApiAsync = async (
  task: ProgramTask,
  token: string,
  isUpdating: boolean,
  userId: string,
  userEmail: string
) => {
  console.log(task, token, isUpdating, userEmail, userId);
  return await Promise.resolve(task);
};

export const fetchAllReportsDataApiAsync = async (
  token: string,
  userId: string,
  email: string
) => {
  const tasks: ProgramReport[] = [];
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
    const task: ProgramReport = {
      icon: reportSVG,
      title: "Google Africa Scholarship Report " + (index + 1),
      doneBy: user,
      url: "reports",
      status: status,
      from: fromDate,
      to: toDate,
    };
    tasks.push(task);
    const details: ReportDetail[] = [];
    for (let k = 0; k < getRandomInteger(2, getRandomInteger(5, 20)); k++) {
      const subDetails: ReportDetail[] = [];
      const isDetailed = getRandomInteger(0, getRandomInteger(4, 5)) === 3;
      if (isDetailed)
        for (let j = 0; j < getRandomInteger(2, getRandomInteger(3, 5)); j++) {
          const smallSubDetails: ReportDetail[] = [];
          const isDetailed2 = getRandomInteger(0, getRandomInteger(3, 5)) === 3;
          if (isDetailed2)
            for (
              let i = 0;
              i < getRandomInteger(2, getRandomInteger(3, 4));
              i++
            ) {
              smallSubDetails.push([
                `Small Sub-Title ${i}`,
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. ",
              ]);
            }
          if (smallSubDetails.length > 1) {
            subDetails.push([
              `Sub-Title ${j}`,
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. ",
              smallSubDetails,
            ]);
          } else {
            subDetails.push([
              `Sub-Title ${j}`,
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. ",
            ]);
          }
        }

      if (subDetails.length > 1) {
        details.push([
          `Title ${k}`,
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. ",
          subDetails,
        ]);
      } else {
        details.push([
          `Title ${k}`,
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. ",
        ]);
      }
      task.details = details;  
    }
  }
  return await Promise.resolve(tasks);
};

export const fetchAllTaskReportsDataApiAsync = async (
  token: string,
  userId: string,
  email: string
) => {
  const tasks: ProgramReport[] = [];
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
    const task: ProgramReport = {
      icon: reportSVG,
      title: "Room Library article written in Java " + (index + 1),
      doneBy: user,
      url: "reports",
      status: status,
      from: fromDate,
      to: toDate,
    };
    tasks.push(task);
    const details: ReportDetail[] = [];
    for (let k = 0; k < getRandomInteger(2, getRandomInteger(5, 20)); k++) {
      const subDetails: ReportDetail[] = [];
      const isDetailed = getRandomInteger(0, getRandomInteger(4, 5)) === 3;
      if (isDetailed)
        for (let j = 0; j < getRandomInteger(2, getRandomInteger(3, 5)); j++) {
          const smallSubDetails: ReportDetail[] = [];
          const isDetailed2 = getRandomInteger(0, getRandomInteger(3, 5)) === 3;
          if (isDetailed2)
            for (
              let i = 0;
              i < getRandomInteger(2, getRandomInteger(3, 4));
              i++
            ) {
              smallSubDetails.push([
                `Small Sub-Title ${i}`,
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. ",
              ]);
            }
          if (smallSubDetails.length > 1) {
            subDetails.push([
              `Sub-Title ${j}`,
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. ",
              smallSubDetails,
            ]);
          } else {
            subDetails.push([
              `Sub-Title ${j}`,
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. ",
            ]);
          }
        }

      if (subDetails.length > 1) {
        details.push([
          `Title ${k}`,
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. ",
          subDetails,
        ]);
      } else {
        details.push([
          `Title ${k}`,
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. ",
        ]);
      }
      task.details = details;  
    }
  }
  return await Promise.resolve(tasks);
};

export const fetchAllTaskDataApiAsync = async (
  token: string,
  userId: string,
  email: string
) => {
  const tasks: ProgramTask[] = [];
  for (let index = 0; index < 20; index++) {
    const rnd = getRandomInteger(0, 10);
    let status: Status = "IN PROGRESS";
    if (rnd === 1) status = "CANCELLED";
    if (rnd > 1 && rnd < 5) status = "COMPLETED";

    const task: ProgramTask = {
      icon: TasksIcon,
      url: "tasks",
      title: "Room library article written in java " + (index + 1),
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque",
      status,
      mentorAssigned: [],
      mentorManagersAssigned: [],
      taskReports: [],
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
      task.taskReports.push(`Report ${i + 1}`);
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
