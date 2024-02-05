import React, { useContext } from "react";
import { Box } from "@chakra-ui/react";
import ChatBox from "../../components/ChatBox/ChatBox";
import MyChats from "../../components/MyChats/MyChats";
import NavBar from "../../components/NavBar/NavBar";
import { AuthContext } from '../../context/Auth';

const ChatPage = () => {
  const context = useContext(AuthContext);
  
  return (
    <div style={{ width: "100%" }}>
      {context.user && <NavBar />}
      <Box display="flex" justifyContent="space-between" width="100%" h="91.5vh" padding="15px">
        {context.user && <MyChats />}
        {context.user && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatPage;
