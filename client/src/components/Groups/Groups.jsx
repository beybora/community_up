import { React, useContext, useEffect } from "react";
import axios from "../../axiosinstance";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import CreateGroupModal from "../CreateGroupModal";
import { ArrowBackIcon } from "@chakra-ui/icons";
import EditGroupModal from "../EditGroupModal";
import { AppDataContext } from "../../context/AppDataContext";

const Groups = () => {
  const {
    setSelectedGroup,
    setSelectedCommunity,
    fetchGroups,
    selectedCommunity,
    groups,
    setGroups,
    selectedGroup,
  } = useContext(AppDataContext);

  useEffect(() => {
    const fetchGroupsByCommunity = async () => {
      if (selectedCommunity) {
        try {
          const response = await axios.get(
            `/api/group/groups-by-community/${selectedCommunity._id}`
          );
          setGroups(response.data);
        } catch (error) {
          console.log("Error fetching groups by community", error);
        }
      }
    };
    fetchGroupsByCommunity();
  }, [fetchGroups]);

  return (
    <Box
      display={{ base: selectedGroup ? "none" : "flex", md: "flex" }}
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
        <IconButton
          d={{ base: "flex", md: "none" }}
          icon={<ArrowBackIcon />}
          onClick={() => {
            setSelectedGroup(null);
            setSelectedCommunity(null);
            
          }}
        />
        <CreateGroupModal />
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
        {groups ? (
          <Stack overflowY="scroll">
            {groups.map((group) => (
              <Box
                onClick={() => {
                  setSelectedGroup(group);
                }}
                cursor="pointer"
                bg={selectedGroup === group ? "#38B2AC" : "#E8E8E8"}
                color={selectedGroup === group ? "white" : "black"}
                px={3}
                py={2}
                key={group._id}
              >
                <Box display="flex" justifyContent="space-between">
                  {group.name}
                  <EditGroupModal group={group}></EditGroupModal>
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <Text>No groups</Text>
        )}
      </Box>
    </Box>
  );
};

export default Groups;
