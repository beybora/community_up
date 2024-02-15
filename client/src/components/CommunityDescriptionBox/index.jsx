import { React, useState, useContext, useEffect } from "react";
import { Box, Text } from "@chakra-ui/layout";
import { AuthContext } from "../../context/Auth";
import ScrollableFeed from "react-scrollable-feed";
import { ArrowBackIcon } from "@chakra-ui/icons";
import parse from "html-react-parser";
import { Heading, IconButton } from "@chakra-ui/react";
import EditCommunityModal from "../EditCommunityModal";
import { AppDataContext } from "../../context/AppDataContext";

const CommunityDescriptionBox = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useContext(AuthContext);
  const { selectedCommunity, fetchCommunities, setSelectedCommunity } =
    useContext(AppDataContext);

  useEffect(() => {
    if (selectedCommunity && user) {
      setIsAdmin(user.admin?.includes(selectedCommunity._id));
    }
  }, [selectedCommunity, user, fetchCommunities]);

  return (
    <Box
      display={{ base: selectedCommunity ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      width={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      {selectedCommunity ? (
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box display="flex" gap="0.5rem">
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => {
                setSelectedCommunity(null);
              }}
            />
            {isAdmin ? (
              <EditCommunityModal community={selectedCommunity} />
            ) : (
              <div> </div>
            )}
          </Box>
          <Heading size="lg"> {selectedCommunity.name}</Heading>{" "}
        </Box>
      ) : (
        <Heading size="md">Select a community to view its description</Heading>
      )}
      <ScrollableFeed>
        <Box>
          <Text>
            {selectedCommunity ? parse(selectedCommunity.description) : <></>}
          </Text>

          <Text></Text>
        </Box>
      </ScrollableFeed>
    </Box>
  );
};

export default CommunityDescriptionBox;
