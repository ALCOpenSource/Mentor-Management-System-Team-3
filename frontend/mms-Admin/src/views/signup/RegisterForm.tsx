import React, { useState } from "react";
import logo from "../../assets/images/mms_logo.svg";
import { useNavigate } from "react-router-dom";
import { registerWithEmailAndPassword, signUpWithGoogle } from "../../firebase";


function RegisterForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUpWithGoogle = async () => {
      try {
        await signUpWithGoogle();
        navigate("/");
      } catch (error) {
        console.error("Something went wrong", error);
      }
    };

    const handleSignUpWithEmailAndPassword = async () => {
        try {
            await registerWithEmailAndPassword();
            navigate("/");
        } catch (error) {
            console.error("Something went wrong", error);
        }
    };
        return (
          <div className="flex w-full h-screen ">
          <div className="flex-col flex-auto w-6/12 bg-green-three">
            <figure className="flex flex-col items-center jusfify-center bg-green-three w-full mt-[40%]">
              <img className="w-60 h-50 mb-5" src={logo} alt="MMS Logo"/>
              <figcaption className="text-white text-sm font-bold">Mentor Management System</figcaption>
            </figure>  
          </div>
          <div className="flex-col flex-auto w-6/12">
            <form onSubmit={handleSignUpWithEmailAndPassword} className="mt-[35%] m-10">
              <h1 className="mb-2 text-4xl m-2 text-customBlack-one">Welcome!</h1>
              <p className="mb-6 font-normal m-2 text-lightGray-one">Register to continue</p>
              <div className="my-4">
              <input 
                type="text"
                id="text"
                value={username}
                placeholder="Username"
                onChange={(event) => setUsername(event.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 m-2 text-gray-one leading-tight focus:outline-none focus:shadow-outline"
              />
              </div> 
              <div className="my-4">
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 m-2 text-gray-one leading-tight focus:outline-none focus:shadow-outline"
              />
              </div>
              <div className="relative my-4">
                <input type="password"
                id="password"
                value={password}
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 m-2 text-gray-one leading-tight focus:outline-none focus:shadow-outline"
                />
                <img className="h-10 w-10 absolute inset-y-0 right-0 flex items-center pr-3" src="/images/eye-password.png" alt="Password"/>             
              </div>  
              <button type="submit" className="bg-green-three text-white shadow appearance-none border rounded w-full py-2 px-3 m-2 leading-tight focus:outline-none focus:shadow-outline">Signup</button>
              <div className="flex flex-col m-2">     
                <button type="button" onClick={handleSignUpWithGoogle} className=" flex flex-row justify-center items-center bg-white text-green-two shadow appearance-none border rounded w-full py-2 px-3 m-2 leading-tight focus:outline-none focus:shadow-outline">
                  <img className="h-5 w-5 mx-2" src="/images/google.png" alt="Google"/>
                  <span className="mx-2">Sign up with Google</span>
                </button>
                <span className="text-customBlack-three text-center text-sm w-full py-2 px-3">Already a user? <a href="/" className="text-customBlack-one">Sign in</a></span>
              </div>                
            </form>
          </div>          
        </div> 

        );
}

export default RegisterForm;

