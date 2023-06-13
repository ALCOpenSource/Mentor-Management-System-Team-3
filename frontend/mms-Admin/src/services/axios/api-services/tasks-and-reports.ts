import { getRandomInteger } from "../../mathFunctions";
import TasksIcon from "./../../../assets/images/dashboard-icons/tsaks.svg";

export type Status = "IN PROGRESS" | "CANCELLED" | "COMPLETED";
export interface ProgramTask {
  icon: any;
  title: string;
  details: string;
  url: string;
  status: Status;
  mentorManagersAssigned: string[];
  mentorAssigned: string[];
  taskReports: string[];
}

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
    for (let i = 0; i < getRandomInteger(0, getRandomInteger(5, 100)); i++) {
      task.mentorAssigned.push(`Mentor ${i + 1}`);
    }
    for (let i = 0; i < getRandomInteger(0, getRandomInteger(5, 50)); i++) {
      task.mentorManagersAssigned.push(`Mentor Manager ${i + 1}`);
    }
    for (let i = 0; i < getRandomInteger(0, getRandomInteger(5, 100)); i++) {
      task.taskReports.push(`Report ${i + 1}`);
    }
    tasks.push(task);
  }

  return await Promise.resolve(tasks);
};
