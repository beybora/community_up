import { React, useState, useContext } from "react";
import { Box } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import SingleChat from "../SingleChat";
import { AppDataContext } from "../../context/AppDataContext";

const ChatBox = () => {
  const { joinGroupChat, setJoinGroupChat, selectedGroup } =
    useContext(AppDataContext);

  return (
    <Box
      display={{ base: selectedGroup ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      width={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box display="flex" justifyContent="space-between" width="100%">
        {" "}
        {joinGroupChat && (
          <IconButton
            mb=".5rem"
            icon={<ArrowBackIcon />}
            aria-label="Leave the Groupchat"
            bg="#E8E8E8"
            size="md"
            onClick={() => setJoinGroupChat(false)}
          />
        )}
      </Box>

      <SingleChat />
    </Box>
  );
};

export default ChatBox;
