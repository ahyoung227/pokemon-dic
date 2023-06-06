import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { authSignIn } from "../../features/auth/authSlice";

function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    // const userInput = {
    //   email: email,
    //   password: password
    // };
    const res = await dispatch(authSignIn());
    if (res.hasOwnProperty("error")) {
      console.log("login failed");
    } else {
      localStorage.setItem("access-token", res.payload.token);
      navigate("/pokemon");
    }
  };

  useEffect(() => {}, []);

  return (
    <div>
      <h2>Sign in</h2>
      <form action="submit" method="post">
        <div>
          <label htmlFor="email">Username </label>
          <input
            type="email"
            placeholder="Any email would work"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="type random password"
            required
          />
        </div>
        <div>
          <input type="submit" onClick={handleSignIn} />
        </div>
      </form>
    </div>
  );
}

export default SignIn;
