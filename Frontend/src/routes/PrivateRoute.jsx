import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    // Agar user login nahi hai, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // Agar user login hai, children component render karo
  return children;
};

export default PrivateRoute;
