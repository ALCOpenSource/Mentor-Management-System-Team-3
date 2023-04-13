import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import logo from "../../assets/images/mms_logo.svg";
import SVG_ICONS from "../../assets/svg-icons";

interface FormValues {
	password: string;
}

const initialValues: FormValues = {
	password: ''
};

const validationSchema = Yup.object().shape({
	password: Yup.string().required('Password is required')
});

const ForgotPasswordForm = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	return (
		<div className="flex w-full h-screen">
			<div className="flex-col flex-auto w-6/12 bg-green-three">
				<div className='flex items-center justify-center w-full flex-col mt-[22%]'>
					<img src={logo} className="w-60 h-50 mb-11" alt="logo" />
					<h3 className='text-white text-3xl font-bold'>Mentor Management System</h3>
				</div>
			</div>
			<div className="flex-col flex-auto w-6/12">
				<div className='flex justify-center w-full h-full flex-col px-[133px]'>
					<h3 className='text-3xl font-bold leading-[53.18px]'>Set new password</h3>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={(values, actions) => {
							console.log(values);
							actions.setSubmitting(false);
						}}
					>
						{(formikProps) => (
							<Form>
								<div className='flex flex-col relative'>
									<div className="relative w-full">
										<Field type={showPassword ? 'text' : 'password'} id="password" name="password" placeholder="Password" className="p-[10px] border-2 border-lightGray-two rounded-[5px] text-[20px] my-5 w-full" />
										<button className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none" onClick={() => { setShowPassword(!showPassword); }}>
											{showPassword ? SVG_ICONS.PASSWORD.SHOW : SVG_ICONS.PASSWORD.HIDE}
										</button>
									</div>
									<ErrorMessage name="password" />
								</div>
								<p className='text-gray-two leading-[26.59px] text-base'>
									*Your new password must be different from previously used password.
								</p>
								<button disabled={formikProps.isSubmitting} className="bg-green-three w-full text-white rounded-[10px] p-[10px] font-medium mt-10 text-lg">
									Reset Password
								</button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default ForgotPasswordForm;