import { Outlet } from "react-router";
import LoginForm from "../views/login/LoginForm";

const ProtectedRoutes = () : JSX.Element => {
    const token=true;
    return token?Outlet:<LoginForm/>;
}

export default ProtectedRoutes;