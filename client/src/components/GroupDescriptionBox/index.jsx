import { React, useState, useContext } from "react";
import { Box, Text } from "@chakra-ui/layout";
import { Button, Heading, IconButton } from "@chakra-ui/react";
import { AuthContext } from "../../context/Auth";
import { ChatIcon, EditIcon } from "@chakra-ui/icons";

import ReactHtmlParser from "react-html-parser";
import ScrollableFeed from "react-scrollable-feed";

const GroupDescriptionBox = () => {
  const { selectedGroup, setJoinGroupChat } = useContext(AuthContext);
  return (
    <Box
      display={{ base: selectedGroup ? "flex" : "none", md: "flex" }}
      flexDir="column"
      padding={5}
      bg="white"
      width={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      {selectedGroup ? (
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box display="flex" gap="0.5rem">
            <IconButton
              icon={<ChatIcon />}
              colorScheme="teal"
              aria-label="Join the Chat"
              size="md"
              onClick={() => {
                setJoinGroupChat(true);
              }}
            />
        
          </Box>
          <Heading size="lg"> {selectedGroup.name}</Heading>
        </Box>
      ) : (
        <Heading size="md">Select a group to view its description</Heading>
      )}
      <ScrollableFeed>
        <Box mt="4rem">
          <Text>
            {selectedGroup ? ReactHtmlParser(selectedGroup.description) : <></>}
          </Text>
        </Box>
      </ScrollableFeed>
    </Box>
  );
};

export default GroupDescriptionBox;
