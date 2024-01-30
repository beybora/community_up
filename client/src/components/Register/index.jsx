import { useState } from "react";
import "./index.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = () => {

  }

  return (
    <>
      <div className="login">
        <h2>Register</h2>
        <div>
          <form className="login-form">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label>E-Mail</label>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button onSubmit={submitHandler}>Register</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
