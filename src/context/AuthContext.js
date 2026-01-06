import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login, logOut, loadUser } from "../action/Login";
import { GetAccessHeadComponent } from "../action/Common";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["auth-key"] = token;
      dispatch(loadUser());
      setIsAuthenticated(true);
      dispatch(GetAccessHeadComponent());
    }
  }, [token, dispatch]);

  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);
    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  const handleLogin = async (serviceNo, password) => {
    try {
      await dispatch(login(serviceNo, password, navigate));
    } catch {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    logOut(navigate);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        handleLogin,
        handleLogout,
        isOnline,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
