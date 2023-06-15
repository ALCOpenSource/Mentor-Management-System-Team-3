import { MentorProp } from "../../../views/dashboard/SwitchComponents/AdminMessagesComponents/select-someone";
import { getRandomInteger } from "../../mathFunctions";
import TasksIcon from "./../../../assets/images/dashboard-icons/tsaks.svg";
import avatarSVG from "./../../../assets/images/avatar.svg";
import { randomizeArray } from "../../generalFunctions";

export type Status = "IN PROGRESS" | "CANCELLED" | "COMPLETED";
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

export const saveTaskApiAsync = async (
  task: ProgramTask,
  token: string,
  isUpdating: boolean,
  userId: string,
  userEmail: string
) => {
  console.log(task, token,isUpdating,userEmail,userId);
  return await Promise.resolve(task);
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

    Promise.all([fetchAllMentorApiAsync(token,userId,email), fetchAllMentorManagerApiAsync(token,userId,email)])
    .then(tt =>{
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
