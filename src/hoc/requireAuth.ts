import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectLoginSuccess } from "../features/auth/authSlice";

export const RequireAuth = (children: JSX.Element) => {
  const location = useLocation();
  const navigate = useNavigate();
  const loginSuccess = useAppSelector(selectLoginSuccess);

  useEffect(() => {
    if (!loginSuccess) {
      navigate("/sign-in", { state: { path: location.pathname } });
      return;
    }
  }, [loginSuccess, navigate]);

  return children;
};
