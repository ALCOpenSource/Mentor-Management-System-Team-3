import React from "react";
import logo from "../../assets/images/mms_logo.svg";
import passwordSuccessLogo from "../../assets/images/password-reset-success.svg";
import SuccessSplashComponent from "../../components/success-splash-component/success-splash-component";

const ForgotPasswordSuccess = () => {

	return (
		<div className="flex w-screen h-screen">
			<div className="flex-col flex-auto w-6/12 bg-green-three">
				<div className='flex items-center justify-center w-full flex-col mt-[22%]'>
					<img src={logo} className="w-60 h-50 mb-11" alt="logo" />
					<h3 className='text-white text-3xl font-bold'>Mentor Management System</h3>
				</div>
			</div>
			<div className="flex-col flex-auto w-6/12">
				<div className='flex justify-center items-center h-full'>
					<SuccessSplashComponent
						title='Password Reset Successful'
						btnText='Done'
						imageSrc={passwordSuccessLogo}
					/>

				</div>
			</div>
		</div>
	);
};
export default ForgotPasswordSuccess;
