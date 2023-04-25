import React from "react";
import LoginForm from "./views/login/LoginForm";
// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterForm from "./views/signup/RegisterForm";
import ForgotPassword from "./views/forgot-password/forgot-password";
import ForgotPasswordForm from "./views/forgot-password/forgot-password-submit";
import ForgotPasswordSuccess from "./views/forgot-password/forgot-password-success";
import Navbar from "./components/shared/navbar";
import Sidebar from "./components/shared/sidebar";
import Dashboard from "./views/dashboard/dashboard";
import SignupForm1 from "./views/signup/SignForm1";


function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/signup1" element={<SignupForm1 />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/passwordreset" element={<ForgotPasswordForm />} />
          <Route path="/passwordsucess" element={<ForgotPasswordSuccess />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/sidebar" element={<Sidebar />} />
        </Routes>
      </Router>      
    </div>
  );
}

export default App;
