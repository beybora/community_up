import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "../axiosinstance";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const toast = useToast();

  const setState = (user, loading, errors) => {
    setUser(user);
    setLoading(loading);
    setErrors(errors);
  };

  const [fetchUser, setFetchUser] = useState(false);
  const [selectedChat, setSelectedChat] = useState();
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
        setLoading(false);
        setUser(res.data.user);
      })
      .catch((error) => {
        setUser(null);
        setLoading(false);
        // navigate("/");
      });
  }, [fetchUser]);

  const register = (user) => {
    setLoading(true);
    axios
      .post("/users/register", user)
      .then((res) => {
        toast({
          title: "Successfully Registered!",
          status: "success",
          duration: 2500,
          isClosable: true,
          position: "bottom",
        });
        setState(res.data.user, false, null);
        navigate("/");
      })
      .catch((err) => {
        toast({
          title: "Registration failed!",
          status: "warning",
          duration: 2500,
          isClosable: true,
          position: "bottom",
        });
        setState(null, false, err.response.data.errors);
      });
  };

  const login = (user) => {
    // setLoading(true);
    axios
      .post("/users/login", user)
      .then((res) => {
        toast({
          title: "Successfully Logged In!",
          status: "success",
          duration: 2500,
          isClosable: true,
          position: "bottom",
        });
        setState(res.data.user, false, null);
        navigate("/");
      })
      .catch((err) => {
        toast({
          title: "Invalid credentials!",
          status: "warning",
          duration: 2500,
          isClosable: true,
          position: "bottom",
        });
        setState(null, false, err.response.data);
      });
  };

  const logout = () => {
    axios.post("/users/logout", {}).then((res) => {
      navigate("/");
      window.location.reload();
    });
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        loading,
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
        fetchUser,
        setFetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
