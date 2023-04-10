import { Navigate, useLocation  } from "react-router-dom";
import { useAuth, useStore } from "~/store";

export function RequireAuth({ children }) {
    const [state, dispatch] = useStore()
    console.log(state.user._id);
    const location = useLocation();
    return state.user._id ? children : <Navigate to="/login" replace state={{ path: location.pathname }}/>;
  }