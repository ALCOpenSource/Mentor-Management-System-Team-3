import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../services/redux/Store";
import { selectCurrentUserNameSelector, selectCurrentUserToken } from "../../../../services/redux/slices/current-user-slice";
import { fetchCertificateRequestsMetaDataApiAsync } from "../../../../services/axios/api-services/certificates-requests";
import LoadingComponent from "../../../../components/loading-components/loading-component";

export type CertificateRequestType = "APPROVED-CERTIFICATES" | "MY-GENERATED-CERTIFICATES" | "PENDING-APPROVAL-CERTIFICATES";

function Certificates() {
    const [categories, setCategories] = useState<undefined | { icon: any; url: string; name: string; num: number; }[]>(undefined);
    const [recents, setRecents] = useState<undefined | { icon: any; url: string; name: string; type: CertificateRequestType; program: string; }[]>(undefined);
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

    useEffect(() => {
        try {
            setErrorMessage("");
            setSuccessMessage("");

            fetchCertificateRequestsMetaDataApiAsync(token, userId ?? "", email ?? "")
                .then(obj => {
                    setCategories(obj?.[0]);
                    setRecents(obj?.[1]);
                })
                .catch(err => { showErrorMessage(err) });
        } catch (error) { showErrorMessage(error) }
    }, [email, token, userId])

    return (
        <div className="w-full mt-[3px] ml-[28px] h-full flex p-4 flex-row">
            <h5 className="text-1xl text-gray-two font-bold mt-4">
                {successMessage}
            </h5>
            <LoadingComponent isBusy={isBusy} />
            <h5
                style={{ color: "orangered" }}
                className="text-1xl font-bold mt-4"
            >
                {errorMessage}
            </h5>
            <div className="w-[309px] h-full flex flex-col my-0 mx-0">
                <div className="w-[309px] h-[312px] bg-lighterGreen-three flex flex-col">
                    <label className="font-mukta text-customBlack-two ml-[20px] mt-[9px] font-bold text-[18px] leading-[30px]" >Category</label>
                    <ul className="list-none p-0 m-0 h-full w-full">
                        {categories?.map((item, idx) => {
                            if (item.icon) {
                                return (
                                    <button onClick={() => navigate(`/dashboard/certificates/${item.url}`)} className="w-full focus:bg-white hover:shadow-lg focus:btn-animate" >
                                        <div className="w-full focus:bg-white items-center flex flex-row">
                                            <img
                                                src={item.icon}
                                                alt="profile logo"
                                                className="w-[45px] h-[45px] mx-5 mt-4"
                                            />
                                            <label className="font-mukta py-auto text-left max-w-[128px] mx-1 align text-customBlack-two ml-[10px] mt-[9px] font-bold w-full text-[16px] leading-[29.59px]" >{item.name}</label>
                                            <label className="font-mukta mx-5 my-auto text-customBlack-one ml-0 mt-[9px] font-bold text-[24px] w-[50px] leading-[39.89px]" >{item.num}</label>
                                        </div>
                                    </button>);
                            } else {
                                return (
                                    <button onClick={() => navigate(`/dashboard/certificates/${item.url}`)} className="w-full focus:bg-white hover:shadow-lg focus:btn-animate" >
                                        <div className="w-full focus:bg-white items-center flex flex-row">
                                            <label className="font-mukta py-auto text-left mx-1 align text-customBlack-two ml-[10px] mt-[9px] w-full text-[16px] leading-[29.59px]" >{item.name}</label>
                                            <div className={`right-[100px] px-3 btn-animate inline-flex items-center justify-center w-5 h-5 text-xs mt-3 font-bold text-white mr-9 rounded-lg bg-red-three border-0 border-white`}>{item.num}</div>
                                        </div>
                                    </button>);
                            }
                        })}
                    </ul>
                </div>
                <div className="w-[309px] mt-5 h-[calc(100%-400px)] bg-lighterGreen-three flex flex-col">
                    <label className="font-mukta text-customBlack-two ml-[20px] mt-[9px] font-bold text-[18px] leading-[30px]" >Recent</label>
                    <ul className="list-none scrollable-by-y p-0 m-0 w-full h-full">
                        {recents?.map((item, idx) => {
                            return (
                                <button onClick={() => navigate(`/dashboard/approval-requests/${item.url}`, { state: item })}
                                    className="w-full focus:bg-white hover:shadow-lg focus:btn-animate" >
                                    <div className="flex items-center flex-row w-[293px] h-[70px] bg-white" >
                                        <img
                                            src={item.icon}
                                            alt="profile logo"
                                            className="w-[45px] h-[45px] mx-5 mt-4"
                                        />
                                        <label className="font-mukta truncate py-auto text-customBlack-two ml-[10px] mt-[9px] font-bold text-[16px] leading-[26.59px] pr-3" >{item.name}</label>
                                        <button
                                            type="button"
                                            className="mt-1 inline-flex bg-green-three items-center px-3 text-[12px] leading-6 text-white ml-auto rounded-md shadow btn-animate"
                                            disabled>
                                            View
                                        </button>
                                    </div>
                                </button>
                            );
                        })
                        }
                    </ul>
                </div>
            </div>
            <div className="w-full h-full flex flex-row">
                <Outlet />
            </div>
        </div>
    )
}

export default Certificates;
