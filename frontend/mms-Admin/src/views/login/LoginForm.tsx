import React, { useState } from "react";
import logo from "../../assets/images/mms_logo.svg";
// import Button, { BUTTON_TYPE } from "../../components/shared/button";
import { logInWithEmailAndPassword, signInWithGoogle } from "../../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../services/redux/Store";
import { loginCurrentUser } from "../../services/redux/slices/login-slices";
import { error } from "console";

// interface LoginFormProps{
//     onSubmit:(email:string, password:string) => void;
// }

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };
  const handleLoginInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      await dispatch(
        loginCurrentUser({
          username: email,
          password,
          afterSuccessful: () => 
          {
            console.log("mmmmmnd");
            navigate("/dashboard");
          },
          afterUnSuccessful: (tt) => 
          {
            console.log("error", tt);
            navigate("/dashboard");
          },
        })
      );
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
    <div className="flex w-full h-screen flex-wrap">
      <div className="w-6/12 bg-green-three flex flex-col content-center justify-center">
        <figure className="flex flex-col items-center jusfify-center bg-green-three w-full">
          <img className="w-60 h-50 mb-5" src={logo} alt="MMS Logo" />
          <figcaption className="text-white font-bold">
            Mentor Management System
          </figcaption>
        </figure>
      </div>
      <div className="w-6/12 flex flex-col content-center justify-center">
        <form onSubmit={handleSubmit} className="w-3/5 m-auto">
          <h1 className="mb-2 text-4xl m-2 text-customBlack-one">Welcome!</h1>
          <p className="mb-6 font-normal m-2 text-lightGray-one">
            Login to continue
          </p>
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
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 m-2 text-gray-one leading-tight focus:outline-none focus:shadow-outline"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute inset-y-0 right-0 flex items-center pr-3 mt-4"
            >
              <g fill="none">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </g>
            </svg>
          </div>
          <button
            type="submit"
            className="bg-green-three text-white shadow appearance-none border rounded w-full py-2 px-3 m-2 leading-tight focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
          <div className="flex flex-col">
            <a
              href="/forgotpassword"
              className="text-sm text-customBlack-one text-end w-full py-2 px-3 m-2"
            >
              Forgot password?
            </a>
            <button
              type="button"
              onClick={handleSignInWithGoogle}
              className=" flex flex-row justify-center items-center bg-white text-green-two shadow appearance-none border rounded w-full py-2 px-3 m-2 leading-tight focus:outline-none focus:shadow-outline"
            >
              <img
                className="h-5 w-5 mx-2"
                src="/images/google.png"
                alt="Google"
              />
              <span className="mx-2">Sign in with Google</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginForm;
