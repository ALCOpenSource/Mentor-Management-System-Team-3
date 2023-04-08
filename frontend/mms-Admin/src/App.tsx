import React from 'react';
// import logo from './logo.svg';
import './App.css';
import LoginForm from './Components/Auth/LoginForm';


const App: React.FC = () => {
  const handleLogin = (username: string, password: string) => {
    // Handle login logic here
  };

  return (
    <div className="container mx-auto">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};


export default App;
