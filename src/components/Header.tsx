import SignOut from "../features/auth/SignOut";
import { useAppSelector } from "../app/hooks";
import { selectLoginSuccess, selectUserData } from "../features/auth/authSlice";

function Header() {
  const loginSuccess = useAppSelector(selectLoginSuccess);
  const userData = useAppSelector(selectUserData);
  return (
    <header>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h1>Pokemon Dictionary</h1>
        {loginSuccess && (
          <div style={{ marginLeft: "20px" }}>
            <p>Welcome {userData.firstName}</p>
            <SignOut />
          </div>
        )}
        {!loginSuccess}
      </div>
    </header>
  );
}

export default Header;
