import axios from "../../axiosinstance";
import "./index.css";
import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loginSuccess, setLoginSuccess] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("users/login", user)
      .then((response) => {
        setLoginSuccess(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <>
      <div className="login">
        <h2>Login</h2>
        {!loginSuccess && (
          <div>
            <form className="login-form">
              <label>E-Mail</label>
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
              <label>Passwort</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
              <button onClick={submitHandler}>LogIn</button>
            </form>
          </div>
        )}
        {loginSuccess && (
          <div className="success-message">Success! You are now logged in.</div>
        )}
      </div>
    </>
  );
};

export default Login;
