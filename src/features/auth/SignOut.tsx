import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { authSignOut } from "../../features/auth/authSlice";

function SignOut() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSignout = () => {
    localStorage.removeItem("access-token");
    dispatch(authSignOut);
    navigate("/sign-in");
    window.location.reload();
  };

  return (
    <button
      onClick={handleSignout}
      style={{ height: "20px", marginLeft: "10px" }}
    >
      Sign out
    </button>
  );
}

export default SignOut;
