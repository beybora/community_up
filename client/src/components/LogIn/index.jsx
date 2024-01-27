import "./index.css";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = () => {
    
  }

  return (
    <>
      <div className="login">
        <h2>Login</h2>
        <div>
          <form className="login-form">
            <label>E-Mail</label>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label>Passwort</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button onSubmit={submitHandler}>LogIn</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
