import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgotPassword from "./views/forgot-password/forgot-password";
import ForgotPasswordForm from "./views/forgot-password/forgot-password-submit";
import ForgotPasswordSuccess from "./views/forgot-password/forgot-password-success";
import Dashboard from "./views/dashboard/dashboard";
import SignupForm1 from "./views/signup/SignForm1";
import Profile from "./views/dashboard/SwitchComponents/profile";
import Messages from "./views/dashboard/SwitchComponents/messages";
import Certificates from "./views/dashboard/SwitchComponents/certificates";
import Programs from "./views/dashboard/SwitchComponents/programs";
import Reports from "./views/dashboard/SwitchComponents/reports";
import Settings from "./views/dashboard/SwitchComponents/settings";
import Tasks from "./views/dashboard/SwitchComponents/tasks";
import AdminDashboard from "./views/dashboard/SwitchComponents/admindashboard";
import Forums from "./views/dashboard/SwitchComponents/forums";
import SettingsGeneral from "./views/dashboard/SwitchComponents/SettingsComponents/edit-profile";
import SettingsPassword from "./views/dashboard/SwitchComponents/SettingsComponents/password";
import SettingsNotifications from "./views/dashboard/SwitchComponents/SettingsComponents/notifications";
import SettingsPrivacy from "./views/dashboard/SwitchComponents/SettingsComponents/privacy";
import SettingsArchive from "./views/dashboard/SwitchComponents/SettingsComponents/archive";
import SettingsSupport from "./views/dashboard/SwitchComponents/SettingsComponents/support";
import SettingsFAQ from "./views/dashboard/SwitchComponents/SettingsComponents/faq";
import LoginForm from './views/login/LoginForm';
import Mentors from "./views/dashboard/SwitchComponents/mentor/mentor";
import ProtectedRoutes from "./components/protectedRoute";
import ApprovalRequests from './views/dashboard/SwitchComponents/approval-requests';
import MentorManagers from './views/dashboard/SwitchComponents/mentor-managers';

function AppRoutes(){
    return (
        <Router>
            <Routes>
              <Route path="/" element={<ProtectedRoutes />}>
                <Route path="/" element={<LoginForm />} />
                <Route path="dashboard" element={<Dashboard />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="settings" element={<Settings />}>
                    <Route index element={<SettingsGeneral />} />
                    <Route path="general" element={<SettingsGeneral />} />
                    <Route path="password" element={<SettingsPassword />} />
                    <Route
                      path="notifications"
                      element={<SettingsNotifications />}
                    />
                    <Route path="privacy" element={<SettingsPrivacy />} />
                    <Route path="archive" element={<SettingsArchive />} />
                    <Route path="support" element={<SettingsSupport />} />
                    <Route path="faq" element={<SettingsFAQ />} />
                    <Route path="*" element={<SettingsGeneral />} />
                  </Route>
                  <Route path="certificates" element={<Certificates />} />
                  <Route path="programs" element={<Programs />} />
                  <Route path="approval-requests" element={<ApprovalRequests />} />
                  <Route path="mentor-managers" element={<MentorManagers />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="tasks" element={<Tasks />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="forum" element={<Forums />} />
                  <Route path="mentors" element={<Mentors />} />
                  <Route path="*" element={<AdminDashboard />} />
                </Route>
              </Route>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup1" element={<SignupForm1 />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/passwordreset" element={<ForgotPasswordForm />} />
              <Route
                path="/passwordsucess"
                element={<ForgotPasswordSuccess />}
              />
            </Routes>
          </Router>
    )
}

export default AppRoutes;


