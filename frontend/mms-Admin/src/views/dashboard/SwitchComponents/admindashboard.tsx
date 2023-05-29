import { useEffect, useState } from "react";
import ellipsis3 from "../../../assets/Ellipse3.svg";
import note from "../../../assets/Vector (1).svg";
import direction from "../../../assets/Vector.svg";
import calendar from "../../../assets/calendar.svg";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../services/redux/Store";
import { fetchActivePrograms, fetchProgramsOverview, fetchReportsOverview, fetchTasks, selectCurrentDashboardActivePrograms, selectCurrentDashboardProgramOverviews, selectCurrentDashboardReportOverviews, selectCurrentDashboardTasks, updateDashboardActiveProgramsAction, updateDashboardProgramsOverviewAction, updateDashboardReportsOverviewAction, updateDashboardTasksAction } from "../../../services/redux/slices/dashboard-slices";
import { ActiveProgram, ProgramOverview, ReportsOverview, TasksOverview } from "../../../services/redux/types/dashboard-types";
import { arraysEqual } from "../../../services/generalFunctions";
import { fetchDashboardActiveProgramsApiAsync, fetchDashboardProgramsOverviewApiAsync, fetchDashboardReportsOverviewApiAsync, fetchDashboardTasksApiAsync } from "../../../services/axios/api-services/dashboard";
import { selectCurrentUserToken } from "../../../services/redux/slices/current-user-slice";
import { useNavigate } from "react-router-dom";
import { Field } from "formik";

function AdminDashboard() {
  const [activePrograms, setActivePrograms] = useState<ActiveProgram[]>(useAppSelector(selectCurrentDashboardActivePrograms));
  const [noOfActivePrograms, setNoOfActivePrograms] = useState<number>(0);
  const [reportsOverview, setReportsOverview] = useState<ReportsOverview[]>(useAppSelector(selectCurrentDashboardReportOverviews));
  const [programOverview, setProgramOverview] = useState<ProgramOverview[]>(useAppSelector(selectCurrentDashboardProgramOverviews));
  const [tasksOverview, setTasksOverview] = useState<TasksOverview[]>(useAppSelector(selectCurrentDashboardTasks));
  const token = useAppSelector(selectCurrentUserToken);
  const navigate = useNavigate();
  const programsFilteringPeriod = ["Today", "This Week", "This Month", "This Year"]

  const fetch = () => {
    return [
      fetchDashboardActiveProgramsApiAsync(token),
      fetchDashboardTasksApiAsync(token),
      fetchDashboardProgramsOverviewApiAsync(token),
      fetchDashboardReportsOverviewApiAsync(token)]
  };

  useEffect(() => {
    Promise.all(fetch()).then(result => {
      updateDashboardActiveProgramsAction(result[0]);
      updateDashboardTasksAction(result[1]);
      updateDashboardProgramsOverviewAction(result[2]);
      updateDashboardReportsOverviewAction(result[3]);
      setNoOfActivePrograms(result[0]?.length ?? 0);
      setActivePrograms(result[0] ?? []);
      setReportsOverview(result[3] ?? []);
      setProgramOverview(result[2] ?? []);
      setTasksOverview(result[1] ?? []);
    }).catch(err => console.log(err))
  }, [])

  console.log(activePrograms, reportsOverview, programOverview, tasksOverview);

  return (
    <section className="w-[calc(100%-300px)] h-full">
      <h2 className="text-base font-bold">Dashboard</h2>
      <select value={"This Week"} className="text-[18px] absolute h-[32px] right-3 px-5 py-0 mt-[-25px] bg-lighterGreen-three mr-auto rounded-[5px]">
        {programsFilteringPeriod.map((item, i) => (<option value={item}>{item}</option>))}
      </select>
      <section>
        <section className="flex flex-row w-full px-8 py-4 overflow-hidden overflow-y-hidden overflow-x-hidden ">
          <section className="bg-green-three rounded-lg p-0 flex justify-start items-start mr-8 w-[194px] h-[92px]">
            <h3 className="text-[64px] text-white m-0 p-0 pl-[20px] font-bold">{noOfActivePrograms}</h3>
            <h3 className="text-white mt-4 pl-[12px] text-[20px] font-bold">
              <span>Active <br /> Programs</span>
            </h3>
            <button onClick={() => navigate("/dashboard/programs")} className="btn-secondary text-green-three bg-white mt-3 mr-8 rounded-md px-2 ml-[-15px]">View</button>
          </section>

          <div className="h-[92px] w-full flex flex-row bg-lighterGreen-three">
            {activePrograms.map((item, i) => {
              return (
                <div className="h-[69px] flex flex-row relative mt-[11px] bg-lighterGreen-two mr-4">
                  <div className="ml-4 pr-16">
                    <div className="flex flex-col items-start justify-between p-0">
                      <h3 className="text-[20px] whitespace-nowrap max-h-[33px] font-normal text-customBlack-two mt-[7px] ml-[19px]">{item.name}</h3>
                      <span className="mt-[30px] absolute ml-[19px]">
                        <span className="text-[20px] font-semibold text-customBlack-two">{item.no}</span>
                        <span className="text-[16px] text-gray-two">{` +${item.percentage}%`}</span>
                      </span>
                    </div>
                  </div>
                  <div className="mr-2 absolute right-1 mt-4">
                    <img className="w-[35px] h-[35px]" src={item.icon} alt="program icon" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </section>
      <section className="flex flex-col bg-lighterGreen-three rounded-lg p-4 mb-8">
        <section className="flex flex-row items-center justify-between px-8">
          <h3 className="text-lg font-semibold">Programs Overview</h3>
          <button className="btn-secondary px-8 py-2 text-base bg-white">6 Active</button>
        </section>

        <section className="inline-flex">
          {[1, 2, 3].map((item, i) => {
            return (
              <section className="flex flex-row px-8 py-4">
                <section className="flex flex-col p-4 pr-[86.67px] bg-lighterGreen-two rounded-md">
                  <section className="flex flex-row items-center mb-4">
                    <section className="mr-4">
                      <img src={ellipsis3} alt="Ellipsis" />
                    </section>
                    <section className="ml-4">
                      <h3 className="text-xl">GADS Program 2022</h3>
                      <section className="flex flex-row items-center justify-between">
                        <label className="mr-12 text-sm text-gray-one">
                          50%
                        </label>
                        <p className="rounded-md w-full">
                          <p className="w-1/2 rounded-xl border-[6px] border-green-one"></p>
                        </p>
                      </section>
                    </section>
                  </section>
                  <span className="text-gray-one text-sm leading-1">
                    Jun 13, 2022 -{">"} Feb 10, 2023
                  </span>
                </section>
              </section>
            );
          })}
        </section>
      </section>
      <section className="flex flex-col bg-lighterGreen-three rounded-lg p-4 mb-8">
        <section className="flex flex-row items-center justify-between px-8">
          <h3 className="text-lg font-semibold">Reports Overview</h3>
          <button className="btn-secondary px-8 py-2 text-base bg-white">
            10 Reports Summitted
          </button>
        </section>
        <section className="inline-flex">
          {[1, 2, 3].map((item, i) => {
            return (
              <section className="flex flex-row p-8">
                <section className="flex flex-col p-4 pr-[86.67px] bg-lighterGreen-two rounded-lg">
                  <section className="flex flex-row items-center mb-4">
                    <section className="mr-4">
                      <img src={note} alt="Ellipsis" width="50" />
                    </section>
                    <section className="ml-4">
                      <h3 className="text-xl">Google Africa Scholarship</h3>
                      <section className="flex flex-row items-center justify-between">
                        <p className="text-gray-one text-md leading-1">
                          <span className="font-semibold">
                            By Ibrahim Kabir -
                          </span>
                          <span>19th-25th Oct 22</span>
                        </p>
                      </section>
                    </section>
                  </section>
                </section>
              </section>
            );
          })}
        </section>
      </section>
      <section className="flex flex-col bg-lighterGreen-three rounded-lg p-4 mb-8">
        <section>
          <h3 className="text-lg font-bold">Tasks Overview</h3>
        </section>

        <section className="flex flex-row p-8">
          <section className="bg-green-three rounded-lg p-4 flex justify-center items-center mr-8">
            <h3 className="text-white text-lg">In Progress</h3>
          </section>

          {[1, 2, 3].map((item, i) => {
            return (
              <>
                <section className="flex flex-col p-4 pr-[86.67px] bg-lighterGreen-two mr-8">
                  <section className="flex flex-row items-center mb-4">
                    <section className="mr-4">
                      <img src={direction} alt="Ellipsis" />
                    </section>
                    <section className="ml-4">
                      <h3 className="text-xl">
                        Room library article write ...
                      </h3>
                      <section className="flex flex-row items-center justify-between">
                        <img src={calendar} alt="Calendar" className="mr-4" />
                        <span className="rounded-md w-full text-lighterGray-four">
                          3 days from now
                        </span>
                      </section>
                    </section>
                  </section>
                </section>
              </>
            );
          })}
        </section>

        <section className="flex flex-row p-8">
          <section className="bg-green-three rounded-xl p-4 flex justify-center items-center mr-8">
            <h3 className="text-white text-lg">Completed</h3>
          </section>

          {[1, 2, 3].map((item, i) => {
            return (
              <>
                <section className="flex flex-col rounded-xl p-4 pr-[86.67px] bg-lighterGreen-two mr-8">
                  <section className="flex flex-row items-center mb-4">
                    <section className="mr-4">
                      <img src={direction} alt="Ellipsis" />
                    </section>
                    <section className="ml-4">
                      <h3 className="text-xl">
                        Room library article write ...
                      </h3>
                      <section className="flex flex-row items-center justify-between">
                        <img src={calendar} alt="Calendar" className="mr-4" />
                        <span className="rounded-md w-full text-lighterGray-four">
                          3 days from now
                        </span>
                      </section>
                    </section>
                  </section>
                </section>
              </>
            );
          })}
        </section>
      </section>
    </section>
  );
}

export default AdminDashboard;
