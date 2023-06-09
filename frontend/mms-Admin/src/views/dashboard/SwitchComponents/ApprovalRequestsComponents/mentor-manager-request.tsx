import { FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { object, array, string } from "yup";
import { useAppSelector } from "../../../../services/redux/Store";
import { selectCurrentUserNameSelector, selectCurrentUserToken } from "../../../../services/redux/slices/current-user-slice";
import { fetchMentorManagersApprovalRequestsApiAsync } from "../../../../services/axios/api-services/approval-requests";
import AccordionUserElement from "../../../../components/shared/accordion-user-element";
import { MentorUser } from "../../../../services/redux/types/system-user";

const MentorManagerRequests: React.FC = () => {

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [mentorManagerRequest, setMentorManagerRequest] = useState<undefined | MentorUser[]>();
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

            fetchMentorManagersApprovalRequestsApiAsync(token, userId ?? "", email ?? "")
                .then(obj => {
                    setMentorManagerRequest(obj)
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
                    mentors: array().of(
                        object().shape({
                            firstName: string().required("Entering a first name is required"),
                        })
                    ),
                })}
                render={({ handleSubmit, errors, touched, values }) => (
                    <Form className="w-full h-full">
                        <div className="w-full flex mx-0 top-[1px]">
                            <label
                                className="relative text-[20px] mt-[15px] font-semibold leading-[33px] text-[#333] h-[33px] left-0 font-mukta ms-5 pt-0"
                                htmlFor="about"
                            >
                                Mentor Manager Requests
                            </label>

                            <div className="w-auto ml-auto p-0 m-0 mr-[54px] flex flex-row content-end ">
                                <button type="submit" className="btn-primary">
                                    Add new Mentor Manager
                                </button>
                            </div>
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
                                name="mentors"
                                render={(helpers) => (
                                    <div>
                                        {mentorManagerRequest && mentorManagerRequest.length > 0
                                            ? mentorManagerRequest.map(
                                                (
                                                    mentor: MentorUser,
                                                    index: React.Key | null | undefined
                                                ) => (
                                                    <React.Fragment key={index}>
                                                    <AccordionUserElement isExpanded={false} width={736} user={mentor} id="{index}"   />
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
export default MentorManagerRequests;
