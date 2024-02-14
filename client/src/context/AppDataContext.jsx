import { createContext, useEffect, useState } from "react";
import axios from "../axiosinstance";

export const AppDataContext = createContext();

function AppDataProvider({ children }) {
  const [places, setPlaces] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [communities, setCommunities] = useState([]);
  const [fetchCommunities, setFetchCommunities] = useState(false);
  const [fetchGroups, setFetchGroups] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [joinGroupChat, setJoinGroupChat] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/places/places");
        setPlaces(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching places:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AppDataContext.Provider
      value={{
        places,
        loading,
        selectedChat,
        setSelectedChat,
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
    </AppDataContext.Provider>
  );
}

export default AppDataProvider;
