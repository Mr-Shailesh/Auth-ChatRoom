import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ForgetPassword from "./components/ForgetPassword";
import ChatRoom from "./Chat-Room/ChatRoom";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <UserAuthContextProvider>
      <Routes>
        {
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        }
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatRoom />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;
