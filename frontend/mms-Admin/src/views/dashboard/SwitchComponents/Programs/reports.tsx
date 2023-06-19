import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../services/redux/Store";
import { selectCurrentUserNameSelector, selectCurrentUserToken } from "../../../../services/redux/slices/current-user-slice";
import LoadingComponent from "../../../../components/loading-components/loading-component";
import { ProgramReport, ReportDetail, fetchAllReportsDataApiAsync, fetchAllTaskReportsDataApiAsync } from "../../../../services/axios/api-services/tasks-and-reports";
import noSelectedItem from "./../../../../assets/images/messages/no-selected-item.svg"
import searchIconSVG from "./../../../../assets/images/search-green.svg";
import { getOrdinalizeDates } from "../../../../services/dateFunctions";

function Reports() {
    const [tasks, setTasks] = useState<undefined | ProgramReport[]>(undefined);
    //const [currentTask, setCurrentTask] = useState<undefined | ProgramReport>(undefined);
    const [dataToLoad, setDataToLoad] = useState<"TASKS" | "REPORTS">("REPORTS");
    const [reports, setReports] = useState<undefined | ProgramReport[]>(undefined);
    const [currentReport, setCurrentReport] = useState<undefined | ProgramReport>(undefined);

    const [isBusy, setIsBusy] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const token: string = useAppSelector(selectCurrentUserToken);
    const { userId, email } = useAppSelector(selectCurrentUserNameSelector);
    const navigate = useNavigate();

    const showErrorMessage = (tt: any) => {
        try {
            setIsBusy(false);
            setErrorMessage(tt?.message ?? tt);
        } catch (err) {
            setErrorMessage(tt);
        }
    };

    useMemo(() => {
        try {
            setErrorMessage("");
            setSuccessMessage("");

            Promise.all([fetchAllTaskReportsDataApiAsync(token, userId ?? "", email ?? ""),
            fetchAllReportsDataApiAsync(token, userId ?? "", email ?? "")])
                .then(obj => {
                    setReports(obj[1]);
                    setTasks(obj[0]);
                })
                .catch(err => { showErrorMessage(err) });
        } catch (error) { showErrorMessage(error) }
    }, [email, token, userId])

    function getDetail(tab: number, details: ReportDetail[]) {
        return details?.map((detail, idx) => {
            if (!details)
                return undefined;

            let innerOne:any = undefined;
            const newDetails = detail[2]
            if ((newDetails?.length ?? 0) > 0) {
                innerOne = getDetail(++tab, newDetails ?? [])
            }

            return (
                <div className={`flex flex-col ml-[${(tab * 10)}px] w-full h-full`}>
                    <h3 className="text-[20px] whitespace-nowrap mt-1 pr-3 w-full font-semibold text-customBlack-two pl-[19px]">{detail[0]}</h3>
                    <span className="mt-1 flex flex-grow w-full ml-[20px]">
                        <span className="text-[16px] font-semibold w-full text-gray-two">{detail[1]}</span>
                    </span>
                    {innerOne}
                </div>
            )
        });
    }

    const btnTitle = "bg-green-three cursor-pointer tracking-wider text-white rounded-[10px] p-[1px] pe-[4px] ps-[4px] min-h-[42px] font-semibold mt-0 overflow-hidden focus:shadow-md leading-tight focus:outline-none relative hover:shadow-inner transform hover:scale-105 hover:bg-opacity-80 transition ease-out duration-300 focus:bg-lighterGreen-three focus:text-green-three";

    return (
        <div className="w-full mt-[3px] ml-0 h-full flex p-4 flex-row">
            <h5 className="text-1xl text-gray-two font-bold mt-4">
                {successMessage}
            </h5>
            <LoadingComponent isBusy={isBusy} />
            <h5
                className="text-1xl font-bold mt-4 text-lightRed-one"
            >
                {errorMessage}
            </h5>
            <div className="w-[350px] h-full flex flex-col my-0 mx-0">
                <div className="w-[350px] h-full flex flex-col">
                    <div className="flex flex-row px-3 py-1 rounded-lg bg-green-three mx-1 my-2">
                        <button onClick={() => setDataToLoad("REPORTS")} className={`mr-auto ml-0 ${btnTitle}`} >
                            Program Reports
                        </button>
                        <button onClick={() => setDataToLoad("TASKS")} className={`ml- mr-0 ${btnTitle}`} >
                            Task Reports
                        </button>
                    </div>
                    <div className="w-full flex flex-row mx-0">
                        <label
                            className="relative text-[20px] whitespace-nowrap mt-[10px] font-semibold leading-[33px] text-[#333] h-[33px] left-0 font-mukta ms-5 pt-0"
                            htmlFor="about"
                        >
                            Reports
                        </label>
                        <div className="ml-auto mr-0">
                            <button type="submit" >
                                <img
                                    src={searchIconSVG}
                                    alt="Search icon"
                                    className="h-[20px] w-[20px] mx-[10px] btn-animate"
                                />
                            </button>
                        </div>
                    </div>
                    {(dataToLoad === "REPORTS") && (<ul className="list-none px-3 m-0 scrollable-by-y mt-5 h-full w-full">
                        {reports?.map((item, idx) => {
                            return (
                                <button onClick={() => setCurrentReport(item)} className="w-full focus:bg-lighterGreen-three hover:shadow-lg focus:btn-animate" >
                                    <div className="btn-animate h-[64px] rounded-lg w-[310px] flex flex-row relative mt-[12px] border border-lightGray-two mr-4">
                                        <div className="pl-10 mt-2 w-[310px]">
                                            <div className="flex flex-col p-0">
                                                <h3 className="text-[16px] truncate pr-3 max-h-[33px] font-semibold text-customBlack-two mt-1 pl-[19px]">{item.title}</h3>
                                                <span className="mt-[30px] flex flex-grow absolute ml-[20px]">
                                                    <span className="text-[12px] font-semibold text-gray-two">{` By ${item.doneBy}`}</span>
                                                    <span className="text-[12px] text-gray-two">{" "}{`  -    ${getOrdinalizeDates(item.from, item.to)}`}</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ml-2 absolute left-1 mt-4">
                                            <img className="w-[33px] h-[33px]" src={item.icon} alt="report icon" />
                                        </div>
                                    </div>
                                </button>);
                        })}
                    </ul>)}
                    {(dataToLoad !== "REPORTS") && (<ul className="list-none px-3 m-0 scrollable-by-y mt-5 h-full w-full">
                        {tasks?.map((item, idx) => {
                            return (
                                <button onClick={() => setCurrentReport(item)} className="w-full focus:bg-lighterGreen-three hover:shadow-lg focus:btn-animate" >
                                    <div className="btn-animate h-[64px] rounded-lg w-[310px] flex flex-row relative mt-[12px] border border-lightGray-two mr-4">
                                        <div className="pl-10 mt-2 w-[310px]">
                                            <div className="flex flex-col p-0">
                                                <h3 className="text-[16px] truncate pr-3 max-h-[33px] font-semibold text-customBlack-two mt-1 pl-[19px]">{item.title}</h3>
                                                <span className="mt-[30px] flex flex-grow absolute ml-[20px]">
                                                    <span className="text-[12px] font-semibold text-gray-two">{` By ${item.doneBy}`}</span>
                                                    <span className="text-[12px] text-gray-two">{" "}{`  -    ${getOrdinalizeDates(item.from, item.to)}`}</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ml-2 absolute left-1 mt-4">
                                            <img className="w-[33px] h-[33px]" src={item.icon} alt="report icon" />
                                        </div>
                                    </div>
                                </button>);
                        })}
                    </ul>)}
                </div>
            </div>
            <div className="max-w-[757px] w-full relative h-full flex flex-col">
                {
                    (!currentReport) && (
                        <div className="flex flex-col h-full w-full">
                            <button onClick={tt => { tt.preventDefault(); navigate("/dashboard/edit-report") }} className="btn-primary mr-2 mb-4 ml-auto" >
                                Compose Report
                            </button>

                            <div className="flex flex-col border border-lightGray-two w-full h-full">
                                <div className="flex flex-col items-center my-auto">
                                    <img
                                        src={noSelectedItem}
                                        className="h-[49.86px] w-[44.57px] m-auto"
                                        alt="Attach file icon"
                                    />
                                    <label className="font-mukta text-[20px] leading-[33px] w-full items-center font-semibold text-center text-[#141414]">
                                        No item selected yet
                                    </label>
                                    <label className="m-auto font-mukta font-[16px] leading-[27px] mb-10 items-center text-center text-[#999999]">
                                        Select an item from the list to view report detail
                                    </label>
                                </div>
                            </div>
                        </div>
                    )
                }

                {currentReport &&
                    (<div className="w-full relative h-[calc(100%-180px)] border mt-2 mb-11 rounded-lg border-lightGray-two flex flex-col">
                        <div className="h-[64px] rounded-lg w-full flex flex-row relative mt-0 mr-4">
                            <div className="pl-10 mt-2 w-full">
                                <div className="flex flex-col p-0">
                                    <h3 className="text-[20px] truncate pr-3 font-semibold text-customBlack-two mt-1 pl-[19px]">{currentReport.title}</h3>
                                    <span className="mt-[30px] flex flex-grow absolute ml-[20px]">
                                        <span className="text-[12px] font-semibold text-gray-two">{` By ${currentReport.doneBy}`}</span>
                                        <span className="text-[12px] text-gray-two">{" "}{`  -    ${getOrdinalizeDates(currentReport.from, currentReport.to)}`}</span>
                                    </span>
                                </div>
                            </div>
                            <div className="ml-2 absolute left-1 mt-4">
                                <img className="w-[33px] h-[33px]" src={currentReport.icon} alt="report icon" />
                            </div>
                            <button onClick={tt => { tt.preventDefault(); setCurrentReport(undefined); }} className="mr-2 mb-4 ml-auto" >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.2929 1.05L6.69645 5.64645L6.34289 6L6.69645 6.35355L11.2929 10.95L10.95 11.2929L6.35355 6.69645L6 6.34289L5.64645 6.69645L1.05 11.2929L0.707107 10.95L5.30355 6.35355L5.65711 6L5.30355 5.64645L0.707107 1.05L1.05 0.707107L5.64645 5.30355L6 5.65711L6.35355 5.30355L10.95 0.707107L11.2929 1.05Z" fill="#058B94" stroke="#058B94" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex px-5 flex-col mt-3 w-full h-full bg-lighterGreen-three">
                            <div className="flex mr-0 mt-9 ml-auto scrollable-by-y px-5 flex-col">
                                {
                                    currentReport?.details?.map((item, idx) => {
                                        return (getDetail(0, currentReport?.details ?? []));
                                    })}
                            </div>
                        </div>
                        <div className="flex mt-3 px-10 flex-row">
                            <button onClick={tt => tt.preventDefault()} className="bg-transparent btn-animate hover:bg-green-three text-green-three font-semibold hover:text-white py-0 px-6 max-h-[40px] mx-4 border border-green-three hover:border-transparent rounded-lg">
                                Share
                            </button>
                            <button onClick={tt => tt.preventDefault()} className="btn-primary mr-3 ml-auto max-h-[30px] p-0" >Download</button>
                        </div>
                    </div>)}
            </div>
        </div>
    )
}

export default Reports;
