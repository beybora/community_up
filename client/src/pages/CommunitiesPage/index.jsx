import React, { useContext } from "react";
import { Box } from "@chakra-ui/react";
import ChatBox from "../../components/ChatBox/ChatBox";
import MyGroups from "../../components/MyGroups/MyGroups";
import NavBar from "../../components/NavBar/NavBar";
import { AuthContext } from "../../context/Auth";
import Communities from "../../components/Communities";
import CommunityDescriptionBox from "../../components/CommunityDescriptionBox";

const CommunitiesPage = () => {
  const context = useContext(AuthContext);

  return (
    <div style={{ width: "100%" }}>
      {context.user && <NavBar />}
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        h="91.5vh"
        padding="15px"
      >
        {context.user && <Communities />}

        {context.user && <CommunityDescriptionBox />}
      </Box>
    </div>
  );
};

export default CommunitiesPage;
