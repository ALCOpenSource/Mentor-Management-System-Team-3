import React from "react";
import logo from "../../assets/images/mms_logo.svg";

const ForgotPassword = () => {
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
					<h3 className='text-3xl font-bold leading-[53.18px]'>Forgot Password?</h3>
					<p className='text-2xl text-gray-two leading-[39.89px]'>
						An email has been sent to your registered email.
						Follow the link to reset your password.
					</p>
					<button className="bg-green-three w-full text-white rounded-[10px] p-[10px] font-medium mt-10 text-lg">
						Done
					</button>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;