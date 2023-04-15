import React, { useState } from "react";
import logo from "../../assets/images/mms_logo.svg";
// import Button, { BUTTON_TYPE } from "../../components/shared/button";
import { logInWithEmailAndPassword, signInWithGoogle } from "../../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";


// interface LoginFormProps{
//     onSubmit:(email:string, password:string) => void;
// }

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const handleSignInWithGoogle = async () => {
      try {
          await signInWithGoogle();
          navigate("/dashboard");
      } catch (error) {
          console.error("Error signing in with Google", error);
      }
  };
    const handleLoginInWithEmailAndPassword = async (email: string, password: string) => {
      try {
        await logInWithEmailAndPassword(email, password);
        navigate("/dashboard");
      } catch (error) {
        console.error("Your email or password is wrong", error);
      }
  };
      // modify the handlesubmit function to call the handleloginwithemailand password function
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleLoginInWithEmailAndPassword(email, password);
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
              <form onSubmit={handleSubmit} className="mt-[35%] m-10">
                <h1 className="mb-2 text-4xl m-2 text-customBlack-one">Welcome!</h1>
                <p className="mb-6 font-normal m-2 text-lightGray-one">Login to continue</p>
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
                <button type="submit" className="bg-green-three text-white shadow appearance-none border rounded w-full py-2 px-3 m-2 leading-tight focus:outline-none focus:shadow-outline">Login</button>
                <div className="flex flex-col">
                  <a href="/forgotpassword" className="text-sm text-customBlack-one text-end w-full py-2 px-3 m-2">Forgot password?</a>        
                  <button type="button" onClick={handleSignInWithGoogle} className=" flex flex-row justify-center items-center bg-white text-green-two shadow appearance-none border rounded w-full py-2 px-3 m-2 leading-tight focus:outline-none focus:shadow-outline">
                    <img className="h-5 w-5 mx-2" src="/images/google.png" alt="Google"/>
                    <span className="mx-2">Sign in with Google</span>
                  </button>
                  <span className="text-customBlack-three text-center text-sm w-full py-2 px-3">New user? <a href="/register" className="text-customBlack-one">Sign up</a></span>
                </div>                
              </form>
            </div>          
          </div>            
        );
}
export default LoginForm;
  