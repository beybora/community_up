import { React, useContext,useEffect } from "react";
import { Box, Text } from "@chakra-ui/layout";
import { Heading, IconButton } from "@chakra-ui/react";
import { ChatIcon, ArrowBackIcon } from "@chakra-ui/icons";

import { AppDataContext } from "../../context/AppDataContext";

const GroupDescriptionBox = () => {
  const { selectedGroup, setJoinGroupChat, setSelectedGroup } =
    useContext(AppDataContext);
  useEffect(() => {
    return () => {
      setSelectedGroup(null);
    };
  }, [setSelectedGroup]);
  return (
    <Box
      display={{ base: selectedGroup ? "flex" : "none", md: "flex" }}
      alignItems="start"
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
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => {
                setSelectedGroup(null);
              }}
            />
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
      
        <Box mt="2rem">
          <Text>{selectedGroup ? selectedGroup.description : <></>}</Text>
        </Box>
    
    </Box>
  );
};

export default GroupDescriptionBox;
