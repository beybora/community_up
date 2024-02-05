import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosinstance";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState({});
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState();
  const [joinedCommunities, setJoinedCommunities] = useState([]);

  useEffect(() => {
    axios
      .get("/users/currentUser")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((error) => {
        navigate("/login");
        setState(null);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        fetch,
        setFetch,
        selectedCommunity,
        setSelectedCommunity,
        communities,
        setCommunities,
        joinedCommunities,
        setJoinedCommunities,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
