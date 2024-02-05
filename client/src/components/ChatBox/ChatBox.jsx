import { React, useState, useContext } from "react";
import { Box } from "@chakra-ui/layout";
import { AuthContext } from "../../context/Auth";
import SingleChat from "../SingleChat";

const ChatBox = () => {
  const { user, selectedChat, setSelectedChat, chats, setChat, fetch  } =
    useContext(AuthContext);
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      width={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
     <SingleChat />
    </Box>
  );
};

export default ChatBox;
