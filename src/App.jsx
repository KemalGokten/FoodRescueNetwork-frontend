import NotFoundPage from "./pages/NotFoundPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <h1>LoggedIn</h1> : <LoginPage />}
        />
        <Route path="/accounts/emailsignup/" element={<SignupPage />} />
        <Route path="/forgot_my_password" element={<ForgotPasswordPage/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
