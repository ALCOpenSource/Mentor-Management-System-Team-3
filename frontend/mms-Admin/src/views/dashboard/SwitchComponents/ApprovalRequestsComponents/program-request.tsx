import { FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { object, array, string } from "yup";
import { useAppSelector } from "../../../../services/redux/Store";
import { selectCurrentUserNameSelector, selectCurrentUserToken } from "../../../../services/redux/slices/current-user-slice";
import { fetchProgramsApprovalRequestsApiAsync } from "../../../../services/axios/api-services/approval-requests";

const ProgramRequests: React.FC = () => {

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [programRequests, setProgramRequests] = useState<undefined | {
        icon: any;
        name: string;
        url: string;
        num: number;
    }[]>();
    const token = useAppSelector(selectCurrentUserToken);
    const { userId, email } = useAppSelector(selectCurrentUserNameSelector);

    const showErrorMessage = (tt: any) => {
        try {
            setErrorMessage(tt?.message ?? tt);
        } catch (err) {
            setErrorMessage(tt);
        }
    };

    useEffect(() => {
        try {
            setErrorMessage("");
            setSuccessMessage("");

            fetchProgramsApprovalRequestsApiAsync(token, userId ?? "", email ?? "")
                .then(obj => {
                    setProgramRequests(obj)
                })
                .catch(err => { showErrorMessage(err) });
        } catch (error) { showErrorMessage(error) }
    }, [email, token, userId])

    return (
        <div className="w-full h-full">
            <Formik
                initialValues={{}}
                onSubmit={(values: {}) => console.log(values)}
                validationSchema={object().shape({
                    programs: array().of(
                        object().shape({
                            firstName: string().required("Entering a first name is required"),
                        })
                    ),
                })}
                render={({ handleSubmit, errors, touched, values }) => (
                    <Form className="w-full h-full">
                        <div className="w-full  flex mx-0 top-[1px]">
                            <label
                                className="relative text-[20px] mt-[15px] font-semibold leading-[33px] text-[#333] h-[33px] left-0 font-mukta ml-7 pt-0"
                                htmlFor="about"
                            >
                                Program Requests
                            </label>
                        </div>
                        <h5 className="text-1xl text-gray-two font-bold mt-4">
                            {successMessage}
                        </h5>

                        <h5
                            style={{ color: "orangered" }}
                            className="text-1xl font-bold mt-4"
                        >
                            {errorMessage}
                        </h5>

                        <div className="w-full flex scrollable-by-y h-[calc(100%-130px)] mt-1 pb-10">
                            <FieldArray
                                name="programs"
                                render={(helpers) => (
                                    <div >
                                        {programRequests && programRequests.length > 0
                                            ? programRequests.map(
                                                (
                                                    item,
                                                    index: React.Key | null | undefined
                                                ) => (
                                                    <React.Fragment key={index}>
                                                        <button
                                                            className="w-full focus:bg-white hover:shadow-lg focus:btn-animate" >
                                                            <div className=" rounded-lg border-[1px] ml-7 border-lightGray-two  flex items-center flex-grow flex-row max-w-[757px] h-[70px] bg-white" >
                                                                <img
                                                                    src={item.icon}
                                                                    alt="profile logo"
                                                                    className="mx-5 mt-4 w-[45px] h-[45px]"
                                                                />
                                                                <div className={`-ml-5 mt-5 btn-animate justify-start w-5 h-5 text-xs font-bold text-white border-0 border-white rounded-full`}>
                                                                    {item.icon}
                                                                </div>

                                                                <label className="font-mukta truncate py-auto  text-customBlack-two ml-[10px] mt-[9px] font-bold text-[16px] leading-[26.59px] pr-3" >{item.name}</label>
                                                                <div className={`ml-auto mr-5 px-3 btn-animate inline-flex items-center justify-center w-5 h-5 text-xs mt-0 font-bold text-white bg-red-three border-0 border-white`}>{item.num}</div>
                                                            </div>
                                                        </button>
                                                    </React.Fragment>
                                                )
                                            )
                                            : null}
                                    </div>
                                )}
                            />
                        </div>
                    </Form>
                )}
            ></Formik>
        </div>
    )
};
export default ProgramRequests;
