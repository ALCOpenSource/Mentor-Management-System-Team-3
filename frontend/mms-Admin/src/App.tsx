import React from "react";
import LoginForm from "./views/login/LoginForm";
// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./views/dashboard/dashboard";
import RegisterForm from "./views/signup/RegisterForm";
import ForgotPassword from "./views/forgot-password/forgot-password";
import ForgotPasswordForm from "./views/forgot-password/forgot-password-submit";
import ForgotPasswordSuccess from "./views/forgot-password/forgot-password-success";
import Navbar from "./components/shared/navbar";


function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/forgotpassword/submit" element={<ForgotPasswordForm />} />
          <Route path="/forgotpassword/sucess" element={<ForgotPasswordSuccess />} />
          <Route path="/navbar" element={<Navbar />} />
        </Routes>
      </Router>      
    </div>
  );
}

export default App;
