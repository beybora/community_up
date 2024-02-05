import { React, useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosinstance";
import { AddIcon, ViewIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { Button } from "@chakra-ui/react";

import CreateGroupModal from "../CreateGroupModal";
import CreateCommunityModal from "../CreateCrommunityModal";

const Communities = () => {
  const {
    user,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    fetch,
    communities,
    setCommunities,
    selectedCommunity,
    setSelectedCommunity,
    setJoinedCommunities
  } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCommunitiesByPlace = async () => {
      try {
        const response = await axios.get("community/place");
        setCommunities(response.data);
      } catch (error) {
        console.log("Error fetching joined communities", error);
        toast({
          title: "Error fetching joined communities",
          description: error.response.data,
          status: "error",
          duration: 2500,
          isClosable: true,
          position: "bottom",
        });
      }
    };
    fetchAllCommunitiesByPlace();
  }, []);

  useEffect(() => {
    const fetchJoinedCommunites = async () => {
      axios
        .get("community/get-joined-communities")
        .then((response) => {
          setJoinedCommunities(response.data);
        })
        .catch((error) => {
          console.log("Error catching joined communities", error);
        });
    };
    fetchJoinedCommunites();
  }, []);

  const handleJoinClick = async (community) => {
    setSelectedCommunity(community);
    axios
      .post(`/community/join-community/${community._id}`)
      .then((response) => {
        setCommunities([...communities, community]);
        toast({
          title: "Joined the Community",
          status: "success",
          duration: 2500,
          isClosable: true,
          position: "bottom",
        });
      })
      .catch((error) => {
        console.log("Error in joing community", error);
        toast({
          title: "Error in joing community",
          description: error.response.data,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      });
  };

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
        <CreateCommunityModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
            borderRadius="2"
            setChats={setChats}
          >
            Create New Community
          </Button>
        </CreateCommunityModal>
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
            {communities.map((community) => (
              <Box
                onClick={() => setSelectedCommunity(community)}
                cursor="pointer"
                bg={selectedCommunity === community ? "#38B2AC" : "#E8E8E8"}
                color={selectedCommunity === community ? "white" : "black"}
                px={3}
                py={2}
                key={community._id}
                display="flex"
                justifyContent="space-between"
              >
                {community.name}
                {communities.includes(community._id) ? (
                  <Button
                    colorScheme="green"
                    size="xs"
                    onClick={() => handleJoinClick(community)}
                  >
                    Join
                  </Button>
                ) : (
                  <>
                    <Box display="flex" gap="5px">
                      {" "}
                      <Button colorScheme="red" size="xs" onClick={() => {}}>
                        Leave
                      </Button>
                      <Button
                        colorScheme="green"
                        size="xs"
                        onClick={() => {
                          navigate(`/community/${community._id}`);
                          setSelectedCommunity(community._id);
                        }}
                      >
                        Open
                      </Button>
                    </Box>
                  </>
                )}
                {}
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

export default Communities;
