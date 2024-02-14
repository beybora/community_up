import { React, useState, useContext, useEffect } from "react";
import { Box, Text } from "@chakra-ui/layout";
import { AuthContext } from "../../context/Auth";
import ScrollableFeed from "react-scrollable-feed";
import ReactHtmlParser from "react-html-parser";
import { Heading } from "@chakra-ui/react";
import EditCommunityModal from "../EditCommunityModal";
import { AppDataContext } from "../../context/AppDataContext";

const CommunityDescriptionBox = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const { user } = useContext(AuthContext);
  const { selectedCommunity, fetchCommunities } = useContext(AppDataContext);

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
          {isAdmin ? (
            <EditCommunityModal community={selectedCommunity} />
          ) : (
            <div> </div>
          )}
          <Heading size="lg"> {selectedCommunity.name}</Heading>{" "}
        </Box>
      ) : (
        <Heading size="md">Select a community to view its description</Heading>
      )}
      <ScrollableFeed>
        <Box>
          <Text>
            {selectedCommunity ? (
              ReactHtmlParser(selectedCommunity.description)
            ) : (
              <></>
            )}
          </Text>

          <Text></Text>
        </Box>
      </ScrollableFeed>
    </Box>
  );
};

export default CommunityDescriptionBox;
