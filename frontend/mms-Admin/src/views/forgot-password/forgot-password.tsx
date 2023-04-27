import React, { useState } from "react";
import logo from "../../assets/images/mms_logo.svg";

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	
	return (
		<div className="flex w-full h-screen">
			<div className="flex flex-col w-6/12 bg-green-three content-center justify-center">
				<div className='flex items-center justify-center w-full flex-col'>
					<img src={logo} className="w-60 h-50 mb-11" alt="logo" />
					<h3 className='text-white text-3xl font-bold'>Mentor Management System</h3>
				</div>
			</div>
			<div className="flex flex-col w-6/12 content-center justify-center">
				<form className='className="w-2/5 m-auto'>
					<h3 className='text-3xl font-bold mb-2'>Forgot Password?</h3>
					<p className='text-xl text-gray-two'>
						Please enter your registered email to reset your password.
					</p>

					<div className="my-4">
                <input
                  type="email"
                  id="email"
                  value={email}
                  placeholder="Email"
                  onChange={(event) => setEmail(event.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-one leading-tight focus:outline-none focus:shadow-outline"
                />
                </div>

					<button className="bg-green-three py-2 w-full text-white rounded-md font-medium text-lg">
						Done
					</button>
				</form>
			</div>
		</div>
	);
};
export default ForgotPassword;