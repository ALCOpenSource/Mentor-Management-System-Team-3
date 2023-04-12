import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerWithEmailAndPassword } from "../../firebase";


function RegisterForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUpWithEmailAndPassword = async () => {
        try {
            await registerWithEmailAndPassword();
            navigate("/");
        } catch (error) {
            console.error("Something went wrong", error);
        }
    };
        return (
            <div className="flex flex-row">
            <figure className="flex flex-col items-center jusfify-center bg-teal-700 w-full mx-auto">
              <img className="h-20 w-20 m-40 mb-2" src="/images/mms logo.png" alt="MMS Logo" />
              <figcaption className="mt-2 text-sm text-center text-white">Mentor Management System</figcaption>
            </figure>
            
            <form onSubmit={handleSignUpWithEmailAndPassword} className="w-full mx-auto m-40">
              <h1 className="mb-2 text-4xl m-2 font-extrabold">Welcome!</h1>
              <p className="mb-6 text-lg font-normal m-2 text-gray-500">Register to continue</p>
              <div className="my-4">
              <input 
                type="text"
                id="text"
                value={username}
                placeholder="Username"
                onChange={(event) => setUsername(event.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 m-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              </div>            
              <div className="my-4">
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 m-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              </div>
              <div className="relative my-4">
              <input 
                type="password"
                id="password"
                value={password}
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
                <img className="h-10 w-10 text-white absolute inset-y-0 right-0 flex items-center pr-3" src="/images/eye-password.png" alt="Password"/>             
              </div>  
              <button type="submit" className="bg-teal-700 text-white shadow appearance-none border rounded w-full py-2 px-3 m-2 leading-tight focus:outline-none focus:shadow-outline">Sign Up</button>
              <div className="flex flex-col">        
                <button type="button" className=" flex flex-row justify-center items-center bg-white text-teal-500 shadow appearance-none border rounded w-full m-6 leading-tight focus:outline-none focus:shadow-outline">
                  <img className="h-5 w-5 m-2" src="/images/google.png" alt="Google"/>
                  <span className="m-2">Sign up with Google</span>
                </button>
                <span className="text-gray-600 text-center text-sm w-full py-2 px-3">Already a user? <a href="/" className="text-black">Sign in</a></span>
              </div>                
            </form>
          </div>
        );
};

export default RegisterForm;

