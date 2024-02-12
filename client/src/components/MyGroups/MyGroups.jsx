import { React, useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/Auth";
import axios from "../../axiosinstance";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { IconButton } from "@chakra-ui/react";
import CreateGroupModal from "../CreateGroupModal";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import EditGroupModal from "../EditGroupModal";

const MyGroups = ({}) => {
  const {
    setSelectedGroup,
    fetchGroups,
    selectedCommunity,
    groups,
    setGroups,
    selectedGroup,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroupsByCommunity = async () => {
      if (selectedCommunity) {
        try {
          const response = await axios.get(
            `group/groups-by-community/${selectedCommunity._id}`
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
            setGroups([]);
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
                  <EditGroupModal
                    group={group}
                  >
                  </EditGroupModal>
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

export default MyGroups;
