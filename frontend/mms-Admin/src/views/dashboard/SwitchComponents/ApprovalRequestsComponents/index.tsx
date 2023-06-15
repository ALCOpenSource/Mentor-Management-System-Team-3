import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../services/redux/Store";
import { selectCurrentUserNameSelector, selectCurrentUserToken } from "../../../../services/redux/slices/current-user-slice";
import { fetchApprovalRequestsMetaDataApiAsync } from "../../../../services/axios/api-services/approval-requests";
import LoadingComponent from "../../../../components/loading-components/loading-component";

export type RequestType = "MENTOR-MANAGER-REQUEST" | "MENTOR-REQUEST" | "PROGRAM-REQUEST";

function ApprovalRequests() {
    const [categories, setCategories] = useState<undefined | { icon: any; url: string; name: string; num: number; }[]>(undefined);
    const [recents, setRecents] = useState<undefined | { icon: any; url: string; name: string; type: RequestType; num: number; }[]>(undefined);
    const [isBusy, setIsBusy] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const token: string = useAppSelector(selectCurrentUserToken);
    const { userId, email } = useAppSelector(selectCurrentUserNameSelector);
    const navigate = useNavigate();

    const programSVG = (<svg width="13" className="-m-3" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.875 0.875H1.5C1.15482 0.875 0.875 1.15482 0.875 1.5V5.875C0.875 6.22018 1.15482 6.5 1.5 6.5H5.875C6.22018 6.5 6.5 6.22018 6.5 5.875V1.5C6.5 1.15482 6.22018 0.875 5.875 0.875Z" stroke="#FF5964" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M11.8125 9H9.3125C9.13991 9 9 9.13991 9 9.3125V11.8125C9 11.9851 9.13991 12.125 9.3125 12.125H11.8125C11.9851 12.125 12.125 11.9851 12.125 11.8125V9.3125C12.125 9.13991 11.9851 9 11.8125 9Z" stroke="#FF5964" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M11.8125 3.375H9.3125C9.13991 3.375 9 3.51491 9 3.6875V6.1875C9 6.36009 9.13991 6.5 9.3125 6.5H11.8125C11.9851 6.5 12.125 6.36009 12.125 6.1875V3.6875C12.125 3.51491 11.9851 3.375 11.8125 3.375Z" stroke="#FF5964" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M6.1875 9H3.6875C3.51491 9 3.375 9.13991 3.375 9.3125V11.8125C3.375 11.9851 3.51491 12.125 3.6875 12.125H6.1875C6.36009 12.125 6.5 11.9851 6.5 11.8125V9.3125C6.5 9.13991 6.36009 9 6.1875 9Z" stroke="#FF5964" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    );
    const mentorSVG = (<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.5 5.875C7.88071 5.875 9 4.75571 9 3.375C9 1.99429 7.88071 0.875 6.5 0.875C5.11929 0.875 4 1.99429 4 3.375C4 4.75571 5.11929 5.875 6.5 5.875Z" stroke="#FF5964" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M1.5 12.125V9.625C1.5 8.93463 2.05964 8.375 2.75 8.375H10.25C10.9404 8.375 11.5 8.93463 11.5 9.625V12.125" stroke="#FF5964" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    );

    const mmsSVG = (<svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.625 5.875C7.00571 5.875 8.125 4.75571 8.125 3.375C8.125 1.99429 7.00571 0.875 5.625 0.875C4.24429 0.875 3.125 1.99429 3.125 3.375C3.125 4.75571 4.24429 5.875 5.625 5.875Z" stroke="#FF5964" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M1.25 12.125V9.625C1.25 8.93463 1.80964 8.375 2.5 8.375H8.75C9.44037 8.375 10 8.93463 10 9.625V12.125" stroke="#FF5964" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10 0.875C10.5377 1.01269 11.0144 1.32544 11.3548 1.76394C11.6951 2.20245 11.8799 2.74177 11.8799 3.29688C11.8799 3.85198 11.6951 4.3913 11.3548 4.82981C11.0144 5.26831 10.5377 5.58106 10 5.71875" stroke="#FF5964" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M11.875 8.375H12.5C13.1904 8.375 13.75 8.93463 13.75 9.625V12.125" stroke="#FF5964" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    );


    const showErrorMessage = (tt: any) => {
        try {
            setIsBusy(false);
            setErrorMessage(tt?.message ?? tt);
        } catch (err) {
            setErrorMessage(tt);
        }
    };

    useEffect(() => {
        try {
            setErrorMessage("");
            setSuccessMessage("");

            fetchApprovalRequestsMetaDataApiAsync(token, userId ?? "", email ?? "")
                .then(obj => {
                    setCategories(obj?.[0]);
                    setRecents(obj?.[1]);
                })
                .catch(err => { showErrorMessage(err) });
        } catch (error) { showErrorMessage(error) }
    }, [email, token, userId])

    return (
        <div className="w-full mt-[33px] ml-[28px] h-full flex p-4 flex-row">
            <h5 className="text-1xl text-gray-two font-bold mt-4">
                {successMessage}
            </h5>
            <LoadingComponent isBusy={isBusy} />
            <h5
                 className="text-1xl font-bold mt-4 text-lightRed-one"
            >
                {errorMessage}
            </h5>
            <div className="w-[309px] h-full flex flex-col my-0 mx-0">
                <div className="w-[309px] h-[312px] bg-lighterGreen-three flex flex-col">
                    <label className="font-mukta text-customBlack-two ml-[20px] mt-[9px] font-bold text-[18px] leading-[30px]" >Category</label>
                    <ul className="list-none p-0 m-0 h-full w-full">
                        {categories?.map((item, idx) => {
                            return (
                                <button onClick={() => navigate(`/dashboard/approval-requests/${item.url}`)} className="w-full focus:bg-white hover:shadow-lg focus:btn-animate" >
                                    <div className="w-full focus:bg-white items-center flex flex-row">
                                        <img
                                            src={item.icon}
                                            alt="profile logo"
                                            className="w-[45px] h-[45px] mx-5 mt-4"
                                        />
                                        <label className="font-mukta py-auto text-left mx-1 align text-customBlack-two ml-[10px] mt-[9px] font-bold w-full text-[16px] leading-[29.59px]" >{item.name}</label>
                                        <label className="font-mukta mx-5 my-auto text-customBlack-one ml-0 mt-[9px] font-bold text-[24px] w-[50px] leading-[39.89px]" >{item.num}</label>
                                    </div>
                                </button>
                            );
                        })}
                    </ul>
                </div>
                <div className="w-[309px] mt-5 h-[calc(100%-400px)] bg-lighterGreen-three flex flex-col">
                    <label className="font-mukta text-customBlack-two ml-[20px] mt-[9px] font-bold text-[18px] leading-[30px]" >Recent</label>
                    <ul className="list-none scrollable-by-y p-0 m-0 w-full h-full">
                        {recents?.map((item, idx) => {
                            if (item.type === "PROGRAM-REQUEST") {
                                return (
                                    <button onClick={() => navigate(`/dashboard/approval-requests/${item.url}`, { state: item })}
                                        className="w-full focus:bg-white hover:shadow-lg focus:btn-animate" >
                                        <div className="flex items-center flex-row w-[293px] h-[70px] bg-white" >
                                            <img
                                                src={item.icon}
                                                alt="profile logo"
                                                className="mx-5 mt-4 w-[45px] h-[45px]"
                                            />
                                            <div className={`-ml-5 mt-5 btn-animate justify-start w-5 h-5 text-xs font-bold text-white border-0 border-white rounded-full`}>
                                                {programSVG}
                                            </div>

                                            <label className="font-mukta truncate py-auto  text-customBlack-two ml-[10px] mt-[9px] font-bold text-[16px] leading-[26.59px] pr-3" >{item.name}</label>
                                            <div className={`mr-auto right-[100px] px-3 btn-animate inline-flex items-center justify-center w-5 h-5 text-xs mt-3 font-bold text-white bg-red-three border-0 border-white`}>{item.num}</div>
                                        </div>
                                    </button>
                                );
                            } else {
                                return (
                                    <button onClick={() => navigate(`/dashboard/approval-requests/${item.url}`, { state: item })}
                                        className="w-full focus:bg-white hover:shadow-lg focus:btn-animate" >
                                        <div className="flex items-center flex-row w-[293px] h-[70px] bg-white" >
                                            <img
                                                src={item.icon}
                                                alt="profile logo"
                                                className="w-[45px] h-[45px] mx-5 mt-4"
                                            />

                                            <div className={`ml-[-35px] mt-0 btn-animate justify-start w-5 h-5 text-xs font-bold text-white border-0 border-white rounded-full`}>
                                                {item.type === "MENTOR-MANAGER-REQUEST" ? mmsSVG : mentorSVG}
                                            </div>
                                            <label className="font-mukta truncate py-auto  text-customBlack-two ml-[10px] mt-[9px] font-bold text-[16px] leading-[26.59px] pr-3" >{item.name}</label>
                                            <button
                                                type="button"
                                                className="mt-1 inline-flex bg-green-three items-center px-3 text-[12px] leading-6 text-white ml-auto rounded-md shadow btn-animate"
                                                disabled>
                                                View
                                            </button>
                                        </div>
                                    </button>
                                );
                            }
                        })}
                    </ul>
                </div>
            </div>
            <div className="w-full h-full flex flex-row">
                <Outlet />
            </div>
        </div>
    )
}

export default ApprovalRequests;