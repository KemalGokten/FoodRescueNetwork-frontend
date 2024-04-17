import NotFoundPage from "./pages/NotFoundPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { Route, Routes } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./contexts/AuthContext.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import RestaurantsPage from "./pages/RestaurantsPage.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import AccountDetails from "./pages/AccountDetails.jsx";
import PreviousOrdersPage from "./pages/PreviousOrdersPage.jsx";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const [searchBar, setSearchBar] = useState("");

  return (
    <>
      {isLoggedIn && <Navbar setSearchBar= {setSearchBar} />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <HomePage /> : <LoginPage />} />
        <Route path="/accounts/emailsignup/" element={<SignupPage />} />
        <Route path="/forgot_my_password" element={<ForgotPasswordPage />} />
        {isLoggedIn && (
        <Route path="/restaurants" element={<RestaurantsPage searchBar= {searchBar} />} />
      )}
        <Route path= "/account_details" element = {<AccountDetails/>}/>
        <Route path= "/previous_orders" element = {<PreviousOrdersPage/>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
