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
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();
  const [communities, setCommunities] = useState([]);
  const [fetchCommunities, setFetchCommunities] = useState(false);
  const [fetchGroups, setFetchGroups] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState();
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [joinGroupChat, setJoinGroupChat] = useState(false);

  useEffect(() => {
    axios
      .get("/users/currentUser")
      .then((res) => {
        setUser(res.data.user); 
      })
      .catch((error) => {
        navigate("/");
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
        communities,
        setCommunities,
        selectedCommunity,
        setSelectedCommunity,
        fetchCommunities,
        setFetchCommunities,
        joinedCommunities,
        setJoinedCommunities,
        joinGroupChat,
        setJoinGroupChat,
        groups,
        setGroups,
        selectedGroup,
        setSelectedGroup,
        fetchGroups,
        setFetchGroups,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
