import {
  ActiveProgram,
  ProgramOverview,
  ReportsOverview,
  TasksOverview,
} from "../../redux/types/dashboard-types";
import { getRandomInteger } from "../../mathFunctions";
import { randomizeArray } from "../../generalFunctions";
import { navMenuItems } from "../../../components/shared/sidebar";

import tasksSVG from "./../../../assets/images/dashboard-icons/tsaks.svg";
import googleGADsSVG from "./../../../assets/images/dashboard-icons/google-gads.svg";
import googleScholarshipSVG from "./../../../assets/images/dashboard-icons/google-scholarship.svg";
import { addMinutes } from "../../dateFunctions";

export async function fetchDashboardActiveProgramsApiAsync(
  token: string
): Promise<ActiveProgram[] | undefined> {
  const programs: ActiveProgram[] = [];
  const elements = randomizeArray([...navMenuItems]).filter(
    (c) => !["Logout", "Dashboard", "Profile"].includes(c.label)
  );
  const no = getRandomInteger(6, 8);
  for (let index = 0; index < no; index++) {
    const obj = elements[index];
    const activeProgram: ActiveProgram = {
      id: obj.label?.replace(" ", ""),
      name: obj.label,
      route: `/dashboard/${obj.route}}`,
      no: getRandomInteger(6, 39),
      percentage: parseFloat(
        ((100 * getRandomInteger(6, getRandomInteger(6, 27))) / 30).toFixed(2)
      ),
      icon: obj?.icon,
      from: new Date(),
      to: addMinutes(new Date(), getRandomInteger(60, 27000)),
    };
    programs.push(activeProgram);
  }
  return programs;
}

export async function fetchDashboardTasksApiAsync(
  token: string
): Promise<TasksOverview[] | undefined> {
  const programs: TasksOverview[] = [];
  const no = getRandomInteger(6, 80);
  for (let index = 0; index < no; index++) {
    const status = getRandomInteger(0, 3);
    const activeProgram: TasksOverview = {
      name: `Room Library article write ${index}`,
      no: getRandomInteger(6, 27),
      icon: tasksSVG,
      percentage: parseFloat(
        ((100 * getRandomInteger(6, getRandomInteger(6, 27))) / 30, 2).toFixed(2)
      ),
      status:
        status === 1 ? "In Progress" : status === 2 ? "Cancelled" : "Completed",
      from: new Date(),
      to: addMinutes(new Date(), getRandomInteger(60, 27000))
    };
    programs.push(activeProgram);
  }
  return programs;
}

export async function fetchDashboardProgramsOverviewApiAsync(
  token: string
): Promise<ProgramOverview[] | undefined> {
  const programs: ProgramOverview[] = [];
  const no = getRandomInteger(6, 10);
  for (let index = 0; index < no; index++) {
    const dateTo = new Date();
    dateTo.setMinutes(getRandomInteger(60, 1000));
    const activeProgram: ProgramOverview = {
      name: `GADS Program ${2019 + index}`,
      no: getRandomInteger(6, 27),
      icon: googleGADsSVG,
      percentage: parseFloat(
        ((100 * getRandomInteger(6, getRandomInteger(6, 27))) / 30).toFixed(2)
      ),
      from: dateTo,
      to: addMinutes(new Date(), getRandomInteger(60, 27000)),
    };
    programs.push(activeProgram);
  }
  return programs;
}

export async function fetchDashboardReportsOverviewApiAsync(
  token: string
): Promise<ReportsOverview[] | undefined> {
  const programs: ReportsOverview[] = [];
  const no = getRandomInteger(6, 80);
  for (let index = 0; index < no; index++) {
    const status = getRandomInteger(0, 3);
    const activeProgram: ReportsOverview = {
      name: "Google Africa Scholarship Report " + index,
      no: getRandomInteger(6, 80),
      icon:googleScholarshipSVG,
      percentage: parseFloat(
        ((100 * getRandomInteger(6, 8)) / 30).toFixed(2)
      ),
      by:
        status === 1
          ? "Ibrahim Kabiru"
          : status === 2
          ? "Alison Davis"
          : "James Melee         ",
      from: new Date(),
      to: addMinutes(new Date(), getRandomInteger(60, 27000)),
    };
    programs.push(activeProgram);
  }
  return programs;
}
