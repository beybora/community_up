import { React, useContext, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import GroupDescriptionBox from "../../components/GroupDescriptionBox";
import MyGroups from "../../components/MyGroups/MyGroups";
import NavBar from "../../components/NavBar/NavBar";
import { AuthContext } from "../../context/Auth";
import ChatBox from "../../components/ChatBox/ChatBox";

const ChatPage = () => {
  const { user, joinGroupChat, setJoinGroupChat } = useContext(AuthContext);

  useEffect(() => {
    return () => {
      setJoinGroupChat(false);
    };
  }, [setJoinGroupChat]);

  return (
    <div style={{ width: "100%" }}>
      {user && <NavBar />}
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        h="91.5vh"
        padding="15px"
      >
        {user && <MyGroups />}
        {user && !joinGroupChat && <GroupDescriptionBox />}
        {joinGroupChat && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatPage;
