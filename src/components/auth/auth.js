import { useState } from "react"
import "./auth.css"

function AuthComponent() {
  const [signUp, setSignUp] = useState(false)
  return (
    <>
      <div className="auth-Container">
        {!signUp ? (
          <>
            <div className="auth-text">Username</div>
            <input className="auth-input" />
            <div className="auth-text">Password</div>
            <input className="auth-input" type="password" />
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
            <div className="auth-button">Login</div>
          </>
        ) : (
          <>
            <div className="auth-text">Create username</div>
            <input className="auth-input" />
            <div className="auth-text">Enter full name</div>
            <input className="auth-input" />
            <div className="auth-text">Enter password</div>
            <input className="auth-input" type="password" />
            <div className="auth-text">Confirm password</div>
            <input className="auth-input" type="password" />
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
            <div className="auth-button">Sign up</div>
          </>
        )}
      </div>
    </>
  )
}

export default AuthComponent
