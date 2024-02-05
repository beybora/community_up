import { React, useContext } from "react";
import { AuthContext } from "../../context/Auth";
import { Box, Text } from "@chakra-ui/layout";
import { IconButton, useToast } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

const SingleChat = () => {
  const {
    user,
    selectedChat,
    setSelectedChat,
    chats,
    setChat,
    fetch,
    setFetch,
  } = useContext(AuthContext);
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {selectedChat.name.toUpperCase()}
          </Text>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Text fontSize="3x1" pb={3}>
            Click on a Group!
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
