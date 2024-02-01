import "./index.css";
import axios from "../../axiosinstance";
import React, { useState } from "react";
import Login from "../../components/LogIn";
import Register from "../../components/Register";

const Authentication = () => {
  const [isLoginTab, setLoginTab] = useState(true);
    
  const handleTabChange = () => {
    setLoginTab(!isLoginTab);
  };

  return (
    <>
      <div className="tab-container">
        <button onClick={handleTabChange}>
          {isLoginTab ? "Switch to Register" : "Switch to Login"}
        </button>
      </div>

      {isLoginTab ? <Login /> : <Register />}
    </>
  );
};

export default Authentication;