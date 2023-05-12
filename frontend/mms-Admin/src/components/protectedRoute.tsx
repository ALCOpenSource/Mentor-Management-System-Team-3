import { Navigate, Outlet } from "react-router-dom"
import {
    selectCurrentUser
} from "../services/redux/slices/current-user-slice";
import {
    useAppSelector
} from "../services/redux/Store";
import PermissionDenied from "../views/permissionDenied";


const ProtectedRoutes = () => {
    const useAuth = (): { auth: boolean, role: string | undefined } => {
        const user = useAppSelector(selectCurrentUser);
        if (user) {
            return {
                auth: true,
                role: user.userRole,
            }
        } else {
            return {
                auth: false,
                role: undefined,
            }
        }
    }

    const { auth, role } = useAuth();
    console.log(auth, role);

    if (auth && role?.toLowerCase().includes("admin"))
        return (<Outlet />);
    return auth ? <PermissionDenied /> : <Navigate to="/login" />
}

export default ProtectedRoutes

