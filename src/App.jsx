import NotFoundPage from "./pages/NotFoundPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return(<>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/successLogin" element={<h1>Login is succesful</h1>} />
      <Route path="/accounts/emailsignup/" element={<SignupPage />} />
      <Route path="*" element={<NotFoundPage/>} />
    </Routes>  
      
    </>);
}

export default App
