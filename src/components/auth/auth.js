import { useState } from "react";
import "./auth.css";
import axios from "axios";
import cogoToast from "@successtar/cogo-toast";
import { useSelector, useDispatch } from "react-redux";
import { authorise } from "../../redux/auth.slice";

function AuthComponent() {
  const [signUp, setSignUp] = useState(false);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullname] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const authRed = useSelector((state) => state);
  const dispatch = useDispatch();

  async function signUpHandler() {
    console.log("pass ", password, passwordConfirmation);
    if (password !== passwordConfirmation) {
      return cogoToast.error("Password does not match");
    }
    const body = { userName, fullName, password };
    try {
      console.log(`${process.env.REACT_APP_BACKEND_PORT}/auth/signup`);
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_PORT}/auth/signup`,
        body
      );
      console.log(res.data.message);
      cogoToast.success(res.data.message);

      console.log("auth", authRed);
    } catch (err) {
      console.log(err);
    }
  }

  async function loginHandler() {
    const body = { userName, password };
    console.log("body", body);
    try {
      console.log(`${process.env.REACT_APP_BACKEND_PORT}/auth/login`);
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_PORT}/auth/login`,
        body
      );
      console.log(res.data);
      cogoToast.success(res.data.message);
      dispatch(
        authorise({
          userName: res.data.data.userName,
          fullName: res.data.data.fullName,
          userId: res.data.data.userId,
          isAuthenticated: true,
        })
      );
      localStorage.setItem("accessToken", res.data.data.token);
      cogoToast.success(res.data.message);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="auth-Container">
        {!signUp ? (
          <>
            <div className="auth-text">Username</div>
            <input
              className="auth-input"
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="auth-text">Password</div>
            <input
              className="auth-input"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="auth-subtext">
              Not a user? &nbsp;{" "}
              <span
                className="auth-subtextButton"
                onClick={() => setSignUp(true)}
              >
                {" "}
                Signup
              </span>{" "}
            </span>
            <div className="auth-button" onClick={loginHandler}>
              Login
            </div>
          </>
        ) : (
          <>
            <div className="auth-text">Create username</div>
            <input
              className="auth-input"
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="auth-text">Enter full name</div>
            <input
              className="auth-input"
              onChange={(e) => setFullname(e.target.value)}
            />
            <div className="auth-text">Enter password</div>
            <input
              className="auth-input"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="auth-text">Confirm password</div>
            <input
              className="auth-input"
              type="password"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <span className="auth-subtext">
              Already a user? &nbsp;{" "}
              <span
                className="auth-subtextButton"
                onClick={() => setSignUp(false)}
              >
                {" "}
                Login
              </span>{" "}
            </span>
            <div
              className="auth-button"
              onClick={signUpHandler}
              disabled={!userName || !password || !passwordConfirmation}
            >
              Sign up
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default AuthComponent;
