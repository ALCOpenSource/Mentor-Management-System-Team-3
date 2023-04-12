import React from "react";
import LoginForm from "./views/login/LoginForm";
// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./views/dashboard/dashboard";


function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
