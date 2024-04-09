import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute: React.FC<any> = ({ children }) => {
  const protect = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!protect) {
      navigate("/"); // Redirect to login on unauthenticated access
    }
  }, [protect, navigate]);

  return protect ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
