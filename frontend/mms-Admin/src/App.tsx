import { Provider } from "react-redux";
import { persistor, store } from "./services/redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppRoutes from "./app-routes";
import clientDetails from "./assets/client_secret.json";

function App() {
  return (
    <GoogleOAuthProvider clientId={clientDetails?.web?.client_id}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App w-[100vw] h-[100vh]">
            <AppRoutes />
          </div>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
