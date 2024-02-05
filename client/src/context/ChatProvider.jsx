import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosinstance";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("users/currentUser");
        const userData = response.data.user;
        if (userData) {
          setUser(userData);
          navigate("/");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
        navigate("/login");
        setUser(null);
      }
    };

    fetchCurrentUser();
  }, []);
  return (
    <ChatContext.Provider value={(user, setUser)}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
