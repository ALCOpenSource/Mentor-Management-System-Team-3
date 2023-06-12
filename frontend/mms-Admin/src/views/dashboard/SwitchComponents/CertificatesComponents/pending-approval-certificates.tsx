import { FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { object, array, string } from "yup";
import { useAppSelector } from "../../../../services/redux/Store";
import { selectCurrentUserNameSelector, selectCurrentUserToken } from "../../../../services/redux/slices/current-user-slice";
import { ProgramCertificate, fetchProgramsApprovalPendingCertificatesRequestsApiAsync } from "../../../../services/axios/api-services/certificates-requests";
import AccordionCertificateElement from "../../../../components/data-components/accordion-certificate-element";

const PendingApprovalCertificates: React.FC = () => {

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [approvedCertificateRequests, setApprovedCertificateRequests] = useState<undefined | ProgramCertificate[]>();
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

            fetchProgramsApprovalPendingCertificatesRequestsApiAsync(token, userId ?? "", email ?? "")
                .then(obj => {
                    setApprovedCertificateRequests(obj)
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
                    certificates: array().of(
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
                                Certificate Manager Requests
                            </label>

                            <div className="w-auto ml-auto p-0 m-0 mr-[54px] flex flex-row content-end ">
                                <button type="submit" className="btn-primary">
                                    Add new Certificate Manager
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
                                name="certificates"
                                render={(helpers) => (
                                    <div>
                                        {approvedCertificateRequests && approvedCertificateRequests.length > 0
                                            ? approvedCertificateRequests.map(
                                                (
                                                    certificate: ProgramCertificate,
                                                    index: React.Key | null | undefined
                                                ) => (
                                                    <React.Fragment key={index}>
                                                    <AccordionCertificateElement isExpanded={false} width={736} certificate={certificate} id="{index}"   />
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
export default PendingApprovalCertificates;
