import { React, useState, useContext } from "react";
import { Box, Text } from "@chakra-ui/layout";
import { AuthContext } from "../../context/Auth";
import SingleChat from "../SingleChat";

const DescriptionBox = () => {
  const { user, selectedChat, setSelectedChat, chats, setChat, fetch, selectedCommunity } =
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
          <Text>{selectedCommunity ? selectedCommunity.description : "Choose a Community"}</Text>
    </Box>
  );
};

export default DescriptionBox;
