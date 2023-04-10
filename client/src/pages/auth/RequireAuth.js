import { Navigate, useLocation  } from "react-router-dom";
import { useToken } from "~/store";
import LoginPage from "./LoginPage";
export function RequireAuth({ children }) {
  const { token, setToken } = useToken();
    const location = useLocation();
    return token ? children : <LoginPage setToken={setToken}/>;
  }