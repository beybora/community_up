import { React, useState, useContext } from "react";
import { Box, Text } from "@chakra-ui/layout";
import { AuthContext } from "../../context/Auth";
import ScrollableFeed from "react-scrollable-feed";
import ReactHtmlParser from "react-html-parser";
import { Heading } from "@chakra-ui/react";

import { Icon } from "@chakra-ui/react";

const CommunityDescriptionBox = () => {
  const { selectedGroup, selectedCommunity } = useContext(AuthContext);
  console.log("selectedCommunity", selectedCommunity);
  return (
    <Box
      display={{ base: selectedGroup ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      width={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <ScrollableFeed>
        <Box>
          {selectedCommunity ? (
            <Heading size="lg"> {selectedCommunity.name}</Heading>
          ) : (
            <Heading size="md">
              Select a community to view its description
            </Heading>
          )}
          <Text>
            {selectedCommunity ? ReactHtmlParser(selectedCommunity.description): <></>}
          </Text>

          <Text></Text>
        </Box>
      </ScrollableFeed>
    </Box>
  );
};

export default CommunityDescriptionBox;
