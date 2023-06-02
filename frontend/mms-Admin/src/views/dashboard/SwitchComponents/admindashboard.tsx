import { useEffect, useState } from "react";
import calendar from "../../../assets/calendar.svg";
import Moment from 'react-moment';
import {
  useAppSelector,
} from "../../../services/redux/Store";
import { selectCurrentDashboardActivePrograms, selectCurrentDashboardProgramOverviews, selectCurrentDashboardReportOverviews, selectCurrentDashboardTasks, updateDashboardActiveProgramsAction, updateDashboardProgramsOverviewAction, updateDashboardReportsOverviewAction, updateDashboardTasksAction } from "../../../services/redux/slices/dashboard-slices";
import { ActiveProgram, ProgramOverview, ReportsOverview, TasksOverview } from "../../../services/redux/types/dashboard-types";
import { fetchDashboardActiveProgramsApiAsync, fetchDashboardProgramsOverviewApiAsync, fetchDashboardReportsOverviewApiAsync, fetchDashboardTasksApiAsync } from "../../../services/axios/api-services/dashboard";
import { selectCurrentUserToken } from "../../../services/redux/slices/current-user-slice";
import { useNavigate } from "react-router-dom";
import { getOrdinalizeDates, getShortDate } from "../../../services/dateFunctions";

function AdminDashboard() {
  const [activePrograms, setActivePrograms] = useState<ActiveProgram[]>(useAppSelector(selectCurrentDashboardActivePrograms));
  const [noOfActivePrograms, setNoOfActivePrograms] = useState<number>(0);
  const [noOfProgramOverviews, setNoOfProgramOverviews] = useState<number>(0);
  const [noOfReportsOverviews, setNoOfReportsOverviews] = useState<number>(0);
  const [reportsOverview, setReportsOverview] = useState<ReportsOverview[]>(useAppSelector(selectCurrentDashboardReportOverviews));
  const [programOverview, setProgramOverview] = useState<ProgramOverview[]>(useAppSelector(selectCurrentDashboardProgramOverviews));
  const [tasksOverview, setTasksOverview] = useState<TasksOverview[]>(useAppSelector(selectCurrentDashboardTasks));
  const token = useAppSelector(selectCurrentUserToken);
  const navigate = useNavigate();
  const programsFilteringPeriod = ["Today", "This Week", "This Month", "This Year"]

  useEffect(() => {
    Promise.all(
      [fetchDashboardActiveProgramsApiAsync(token),
      fetchDashboardTasksApiAsync(token),
      fetchDashboardProgramsOverviewApiAsync(token),
      fetchDashboardReportsOverviewApiAsync(token)]
      ).then(result => {
      updateDashboardActiveProgramsAction(result[0]);
      updateDashboardTasksAction(result[1]);
      updateDashboardProgramsOverviewAction(result[2]);
      updateDashboardReportsOverviewAction(result[3]);
      setNoOfActivePrograms(result[0]?.length ?? 0);
      setNoOfProgramOverviews(result[2]?.length ?? 0)
      setNoOfReportsOverviews(result[3]?.length ?? 0);
      setActivePrograms(result[0] ?? []);
      setReportsOverview(result[3] ?? []);
      setProgramOverview(result[2] ?? []);
      setTasksOverview(result[1] ?? []);
    }).catch(err => console.log(err))
  }, [token])

  return (
    <div className="w-full h-full ml-0 my-auto overflow-x-hidden">
      <div className="w-[100%] h-[100%]">
        <section className="w-full h-full  overflow-x-hidden scrollable-by-y pt-2">
          <div className="h-[54px] flex flex-row" >
            <h2 className="text-base ml-8 mt-8 font-bold">Dashboard</h2>
            <select value={"This Week"} className="text-[18px] h-[32px] right-5 pr-5 py-0 mt-8 bg-lighterGreen-three ml-auto rounded-[5px]">
              {programsFilteringPeriod.map((item, i) => (<option value={item}>{item}</option>))}
            </select>
          </div>
          <section className="w-full overflow-x-hidden">
            <section className="flex flex-row w-full p-8 py-4">
              <section className="bg-green-three btn-animate rounded-lg p-0 flex justify-start items-start mr-4 w-[194px] h-[92px]">
                <h3 className="text-[64px] text-white m-0 p-0 pl-[20px] font-bold">{noOfActivePrograms}</h3>
                <h3 className="text-white mt-4 pl-[12px] text-[20px] font-bold">
                  <span>Active <br /> Programs</span>
                </h3>
                <button onClick={() => navigate("/dashboard/programs")} className="btn-secondary text-green-three bg-white mt-3 mr-8 rounded-md px-2 ml-[-15px]">View</button>
              </section>

              <div className="h-[92px] w-full flex flex-row bg-lighterGreen-three">
                {activePrograms.map((item, i) => {
                  return (
                    <div className="h-[69px] flex flex-row relative ml-3 mt-[11px] btn-animate bg-lighterGreen-two">
                      <div className="ml-0 pr-16">
                        <div className="flex flex-col items-start justify-between p-0">
                          <h3 className="text-[20px] min-w-[70px] whitespace-nowrap max-h-[33px] font-normal text-customBlack-two mt-[7px] ml-[19px]">{item.name}</h3>
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

          <section className="w-full">
            <section className="ml-8 flex flex-col bg-lighterGreen-three rounded-lg h-[188px] w-full overflow-x-hidden px-4 mb-4">
              <section className="flex flex-row items-center justify-between px-8">
                <h3 className="text-[18px] ml-[-30px] z-10 mt-[15px] font-semibold">Programs Overview</h3>
                <button className="text-[18px] h-[32px] hover:shadow-inner transform hover:scale-105 hover:bg-opacity-80 transition ease-out duration-300 right-0 px-1 py-0 mt-[15px]  mr-[10px] bg-white rounded-[5px]"> {`${noOfProgramOverviews} Active`} </button>
              </section>

              <div className="h-[92px] w-full mt-[-10px] flex flex-row bg-lighterGreen-three">
                {programOverview.map((item, i) => {
                  return (
                    <div className="btn-animate h-[92px] rounded-lg min-w-[332px] flex flex-row relative mt-[15px] bg-lighterGreen-two mr-4">
                      <div className="ml-16 mt-3 pr-16">
                        <div className="flex flex-col items-start justify-between p-0">
                          <h3 className="text-[20px] whitespace-nowrap max-h-[33px] font-normal text-customBlack-two mt-[7px] ml-[19px]">{item.name}</h3>
                          <span className="mt-[30px] flex flex-grow absolute ml-[19px]">
                            <span className="text-[12px] text-gray-two">{` ${item.percentage}%`}</span>
                            <div className="h-[7px] min-w-[53px] ml-9 mt-[7px] rounded-full bg-green-three" />
                          </span>
                        </div>
                      </div>
                      <span className="ml-2 absolute left-1 mb-2 bottom-0 text-[12px] text-gray-two">{` ${getShortDate(item.from ?? new Date())} -> ${getShortDate(item.to ?? new Date())}`}</span>
                      <div className="ml-2 absolute left-1 mt-4">
                        <img className="w-[47px] h-[47px]" src={item.icon} alt="program icon" />
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="text-[12px] h-[24px] w-[70px] text-white bg-green-three hover:shadow-inner transform hover:scale-105 hover:bg-opacity-80 transition ease-out duration-300 right-0 px-1 py-0 mt-[25px] ml-auto mr-[21px] rounded-[5px]"> {`View All`} </button>
            </section>
          </section>

          <section className="mx-8 flex flex-col overflow-hidden bg-lighterGreen-three rounded-lg h-[181px] w-full p-4 mb-0">
            <section className="flex flex-row h-full items-center justify-between px-8">
              <h3 className="text-[18px] ml-[-30px] z-10 mt-[1px] font-semibold">Reports Overview</h3>
              <button className="text-[18px] h-[32px] hover:shadow-inner transform hover:scale-105 hover:bg-opacity-80 transition ease-out duration-300 right-0 px-1 py-0 mt-[1px]  mr-[10px] bg-white rounded-[5px]"> {`${noOfReportsOverviews} Reports Submited`} </button>
            </section>

            <div className="h-[92px] w-full flex flex-row bg-lighterGreen-three">
              {reportsOverview.map((item, i) => {
                return (
                  <div className="btn-animate h-[64px] rounded-lg min-w-[332px] flex flex-row relative mt-[12px] bg-lighterGreen-two mr-4">
                    <div className="ml-10 mt-2 pr-3">
                      <div className="flex flex-col items-start justify-between p-0">
                        <h3 className="text-[20px] whitespace-nowrap max-h-[33px] font-normal text-customBlack-two mt-0 ml-[19px]">{item.name}</h3>
                        <span className="mt-[30px] flex flex-grow absolute ml-[19px]">
                          <span className="text-[12px] font-semibold text-gray-two">{` By ${item.by}`}</span>
                          <span className="text-[12px] text-gray-two">{" "}{`  -    ${getOrdinalizeDates(item.from, item.to)}`}</span>
                        </span>
                      </div>
                    </div>
                    <div className="ml-2 absolute left-1 mt-4">
                      <img className="w-[33px] h-[33px]" src={item.icon} alt="program icon" />
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="text-[12px] h-[24px] w-[70px] text-white bg-green-three hover:shadow-inner transform hover:scale-105 hover:bg-opacity-80 transition ease-out duration-300 right-0 px-1 py-1 mt-[25px] ml-auto mr-[20px] rounded-[5px]"> {`View All`} </button>
          </section>

          <section className="mx-8 flex flex-col w-full bg-lighterGreen-three rounded-lg h-[381px] mt-4 overflow-x-hidden p-4 mb-4">
            <section className="flex flex-row items-center justify-between px-8">
              <h3 className="text-[18px] ml-[-30px] mt-[1px] font-semibold">Tasks Overview</h3>
              <button className="text-[18px] absolute h-[32px] hover:shadow-inner transform hover:scale-105 hover:bg-opacity-80 transition ease-out duration-300 right-3 px-5 py-0 mt-[15px] ml-[-50px] bg-white mr-auto rounded-[5px]"> {`${noOfReportsOverviews} Reports Submited`} </button>
            </section>

            <div className="h-[152px] w-full flex flex-row overflow-x-hidden bg-lighterGreen-three">
              <section className="btn-animate bg-green-three rounded-lg mt-5 flex justify-center items-center min-w-[120px] h-[92px] min-h-[92px] mr-8">
                <h3 className="text-white whitespace-nowrap text-[20px]">In Progress</h3>
              </section>

              {tasksOverview.filter(c => c.status === "In Progress").map((item, i) => {
                return (
                  <div className="btn-animate h-[92px] rounded-lg max-w-[284px] flex flex-row relative mt-[22px] bg-lighterGreen-two mr-4">
                    <div className="ml-10 mt-2 pr-3">
                      <div className="flex flex-col items-start justify-between p-0 pt-2">
                        <h3 className="text-[20px] w-[215px] max-h-[33px] leading-5 font-normal text-customBlack-two mt-0 ml-[19px]">{item.name}</h3>
                        <span className="mt-[42px] flex flex-grow absolute ml-[19px]">
                          <img src={calendar} alt="Calendar" className="mr-4 w-[16.67px] h-[16.67px]" />
                          <span className="text-[12px] text-gray-two">{(<Moment fromNow>{item.to}</Moment>)}</span>
                        </span>
                      </div>
                    </div>
                    <div className="ml-2 absolute left-1 mt-7">
                      <img className="w-[33px] h-[33px]" src={item.icon} alt="program icon" />
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="text-[12px] h-[24px] w-[70px] text-white bg-green-three hover:shadow-inner transform hover:scale-105 hover:bg-opacity-80 transition ease-out duration-300 right-0 px-1 py-0 mt-[1px] ml-auto mr-[20px] rounded-[5px]"> {`View All`} </button>
            <div className="h-[92px] mt-[1px] w-full flex flex-row bg-lighterGreen-three">
              <section className="btn-animate bg-green-three rounded-lg mt-11 flex justify-center items-center min-w-[120px] min-h-[92px] mr-8">
                <h3 className="text-white text-[20px]">Completed</h3>
              </section>

              {tasksOverview.filter(c => c.status !== "In Progress").map((item, i) => {
                return (
                  <div className="btn-animate h-[92px] rounded-lg max-w-[284px] flex flex-row relative mt-[42px] bg-lighterGreen-two mr-4">
                    <div className="ml-10 mt-2 pr-3">
                      <div className="flex flex-col items-start justify-between p-0 pt-2">
                        <h3 className="text-[20px] w-[215px] max-h-[33px] leading-5 font-normal text-customBlack-two mt-0 ml-[19px]">{item.name}</h3>
                        <span className="mt-[42px] flex flex-grow absolute ml-[19px]">
                          <img src={calendar} alt="Calendar" className="mr-4 w-[16.67px] h-[16.67px]" />
                          <span className="text-[12px] text-gray-two">{` 3 days from now`}</span>
                        </span>
                      </div>
                    </div>
                    <div className="ml-2 absolute left-1 mt-7">
                      <img className="w-[33px] h-[33px]" src={item.icon} alt="program icon" />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
