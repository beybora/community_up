import { React, useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/Auth";
import axios from "../../axiosinstance";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { Button, IconButton } from "@chakra-ui/react";
import CreateGroupModal from "../CreateGroupModal";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const MyChats = ({}) => {
  const {
    user,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    fetch,
    selectedCommunity,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroupsByCommunity = async () => {
      if (selectedCommunity) {
        try {
          const response = await axios.get(
            `group/groups-by-community/${selectedCommunity._id}`
          );
          setChats(response.data);
        } catch (error) {
          console.log("Error fetching groups by community", error);
        }
      }
    };
    fetchGroupsByCommunity();
  }, [fetch]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      padding={3}
      bg="white"
      width={{ base: "100%", md: "31%" }}
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton
          d={{ base: "flex", md: "none" }}
          icon={<ArrowBackIcon />}
          onClick={() => {
            navigate(-1);
            setChats([])
          }}
        />

        <CreateGroupModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
            borderRadius="2"
            setChats={setChats}
          >
            New Group Chat
          </Button>
        </CreateGroupModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        padding={3}
        bg="#F8F8F8"
        width="100%"
        height="100%"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                key={chat._id}
              >
                {chat.name}
                {/* <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text> */}
                {/* {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )} */}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
