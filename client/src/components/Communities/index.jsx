import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosinstance";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { Button, Spinner } from "@chakra-ui/react";
import CreateCommunityModal from "../CreateCrommunityModal";
import { AppDataContext } from "../../context/AppDataContext";

const Communities = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const {
    fetchCommunities,
    setFetchCommunities,
    communities,
    setCommunities,
    selectedCommunity,
    setSelectedCommunity,
    joinedCommunities,
    setJoinedCommunities,
    setGroups,
  } = useContext(AppDataContext);

  useEffect(() => {
    fetchAllCommunitiesByPlace();
    fetchJoinedCommunities();
  }, [fetchCommunities]);

  const fetchAllCommunitiesByPlace = async () => {
    try {
      const response = await axios.get("api/community/place");
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

  const fetchJoinedCommunities = async () => {
    try {
      const response = await axios.get("api/community/get-joined-communities");
      setJoinedCommunities(response.data);
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

  const handleJoinClick = async (community) => {
    setSelectedCommunity(community);
    navigate(`/community/${community._id}`);
    axios
      .post(`api/community/join-community/${community._id}`)
      .then((response) => {
        setFetchCommunities((prev) => !prev);
        toast({
          title: "Joined the Community",
          status: "success",
          duration: 2500,
          isClosable: true,
          position: "bottom",
        });
      })
      .catch((error) => {
        console.log("Error in joining community", error);
        toast({
          title: "Error in joining community",
          description: error.response.data,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      });
  };

  const handleLeaveCommunity = (community) => {
    axios
      .post(`api/community/leave-community/${community._id}`)
      .then((response) => {
        setFetchCommunities((prev) => !prev);
        toast({
          title: "Left the Community",
          status: "success",
          duration: 2500,
          isClosable: true,
          position: "bottom",
        });
      })
      .catch((error) => {
        console.log("Error in leaving community", error);
        toast({
          title: "Error in leaving community",
          description: error.response.data,
          status: "error",
          duration: 2500,
          isClosable: true,
          position: "bottom",
        });
      });
  };

  return (
    <Box
      display={{ base: selectedCommunity ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      padding={3}
      borderRadius="lg"
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
            setGroups={setGroups}
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
        {communities ? (
          <Stack overflowY="scroll">
            {communities.map((community) => (
              <Box
                key={community._id}
                onClick={() => setSelectedCommunity(community)}
                cursor="pointer"
                bg={selectedCommunity === community ? "#38B2AC" : "#E8E8E8"}
                color={selectedCommunity === community ? "white" : "black"}
                px={3}
                py={2}
                display="flex"
                justifyContent="space-between"
              >
                {community.name}
                {joinedCommunities.some((c) => c._id === community._id) ? (
                  <Box display="flex" gap="10px">
                    <Button
                      colorScheme="red"
                      size="xs"
                      onClick={() => handleLeaveCommunity(community)}
                    >
                      Leave
                    </Button>
                    <Button
                      colorScheme="green"
                      size="xs"
                      onClick={() => navigate(`/community/${community._id}`)}
                    >
                      Go
                    </Button>
                  </Box>
                ) : (
                  <Box display="flex" gap="5px">
                    <Button
                      colorScheme="green"
                      size="xs"
                      onClick={() => handleJoinClick(community)}
                    >
                      Join
                    </Button>
                  </Box>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <Spinner color="red.500" />
        )}
      </Box>
    </Box>
  );
};

export default Communities;
