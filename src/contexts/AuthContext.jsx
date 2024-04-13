import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const storedLoggedInStatus = localStorage.getItem("isLoggedIn");
      if (storedLoggedInStatus === "true") {
        setIsLoggedIn(true);
      }
      setLoading(false); 
    }, []);
  
    const login = (userData) => {
      setIsLoggedIn(true);
      setUser(userData);
      localStorage.setItem("isLoggedIn", "true");
    };
  
    const logout = () => {
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("isLoggedIn");
    };
  
    if (loading) {
      return <h1>Loading...</h1>;
    }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
