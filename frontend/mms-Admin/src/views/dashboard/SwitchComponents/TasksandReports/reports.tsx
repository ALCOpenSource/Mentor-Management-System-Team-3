import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../services/redux/Store";
import { selectCurrentUserNameSelector, selectCurrentUserToken } from "../../../../services/redux/slices/current-user-slice";
import LoadingComponent from "../../../../components/loading-components/loading-component";
import { ProgramReport, fetchAllReportsDataApiAsync } from "../../../../services/axios/api-services/tasks-and-reports";
import noSelectedItem from "./../../../../assets/images/messages/no-selected-item.svg"
import searchIconSVG from "./../../../../assets/images/search-green.svg";
import { getOrdinalizeDates } from "../../../../services/dateFunctions";

function Reports() {
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

            fetchAllReportsDataApiAsync(token, userId ?? "", email ?? "")
                .then(obj => {
                    console.log(obj)
                    setReports(obj);
                })
                .catch(err => { showErrorMessage(err) });
        } catch (error) { showErrorMessage(error) }
    }, [email, token, userId])

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
                    <ul className="list-none px-3 m-0 scrollable-by-y mt-5 h-full w-full">
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
                    </ul>
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
                    (<div className="w-full relative h-full border mt-5 border-lightGray-two flex flex-col">
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
                            <button onClick={tt => { tt.preventDefault(); setCurrentReport(undefined);}} className="mr-2 mb-4 ml-auto" >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.2929 1.05L6.69645 5.64645L6.34289 6L6.69645 6.35355L11.2929 10.95L10.95 11.2929L6.35355 6.69645L6 6.34289L5.64645 6.69645L1.05 11.2929L0.707107 10.95L5.30355 6.35355L5.65711 6L5.30355 5.64645L0.707107 1.05L1.05 0.707107L5.64645 5.30355L6 5.65711L6.35355 5.30355L10.95 0.707107L11.2929 1.05Z" fill="#058B94" stroke="#058B94" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex px-5 flex-col mt-3 w-full h-full bg-lighterGreen-three">
                            <label className="text-[16px] text-gray-two">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque
                            </label>

                            <div className="flex mr-0 mt-9 ml-auto flex-row">
                                <button onClick={tt => tt.preventDefault()} className="bg-transparent btn-animate text-red-three font-semibold flex flex-row hover:text-red-two px-6 pt-3 max-h-[40px] mx-4 border-none hover:border-none rounded-lg">
                                    <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.635742 5.38459H2.89002M2.89002 5.38459H20.9243M2.89002 5.38459V20.0573C2.89002 20.6132 3.12753 21.1464 3.55028 21.5395C3.97304 21.9326 4.54643 22.1534 5.1443 22.1534H16.4157C17.0136 22.1534 17.587 21.9326 18.0097 21.5395C18.4325 21.1464 18.67 20.6132 18.67 20.0573V5.38459H2.89002ZM6.27144 5.38459V3.28849C6.27144 2.73257 6.50895 2.19941 6.9317 1.80632C7.35446 1.41322 7.92785 1.19238 8.52572 1.19238H13.0343C13.6322 1.19238 14.2055 1.41322 14.6283 1.80632C15.0511 2.19941 15.2886 2.73257 15.2886 3.28849V5.38459M8.52572 10.6249V16.9132M13.0343 10.6249V16.9132" stroke="#FF647C" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    Delete
                                </button>
                                <button onClick={tt => { tt.preventDefault(); navigate("/dashboard/edit-report", { state: currentReport }) }} className="btn-primary mr-[1px] ml-auto max-h-[30px] p-0" >Edit Report</button>
                            </div>
                        </div>
                    </div>)}
            </div>
        </div>
    )
}

export default Reports;
