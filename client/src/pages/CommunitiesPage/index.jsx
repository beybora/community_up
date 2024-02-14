import React, { useContext } from "react";
import { Box } from "@chakra-ui/react";
import NavBar from "../../components/NavBar/NavBar";
import { AuthContext } from "../../context/Auth";
import Communities from "../../components/Communities";
import CommunityDescriptionBox from "../../components/CommunityDescriptionBox";

const CommunitiesPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ width: "100%" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        h="91.5vh"
        padding="15px"
      >
        {user && <Communities />}

        {user && <CommunityDescriptionBox />}
      </Box>
    </div>
  );
};

export default CommunitiesPage;
