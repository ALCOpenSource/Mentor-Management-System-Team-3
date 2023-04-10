import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ForgotPassword from './views/forgot-password/forgot-password';
import ForgotPasswordForm from './views/forgot-password/forgot-password-submit';
import ForgotPasswordSuccess from './views/forgot-password/forgot-password-success';

const App = () => {
	return (
		<Routes>
			<Route path="/forgotpassword" element={<ForgotPassword />} />
			<Route path="/forgotpassword/submit" element={<ForgotPasswordForm />} />
			<Route path="/forgotpassword/success" element={<ForgotPasswordSuccess />} />
		</Routes>
	);
};

export default App;
