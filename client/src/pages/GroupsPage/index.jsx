import { React, useContext, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import GroupDescriptionBox from "../../components/GroupDescriptionBox";
import Groups from "../../components/Groups/Groups";
import { AuthContext } from "../../context/Auth";
import ChatBox from "../../components/ChatBox/ChatBox";
import { AppDataContext } from "../../context/AppDataContext";

const GroupsPage = () => {
  const { joinGroupChat, setJoinGroupChat } = useContext(AppDataContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    return () => {
      setJoinGroupChat(false);
    };
  }, [setJoinGroupChat]);

  return (
    <div style={{ width: "100%" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        h="91.5vh"
        padding="15px"
      >
        {user && <Groups />}
        {user && !joinGroupChat && <GroupDescriptionBox />}
        {joinGroupChat && <ChatBox />}
      </Box>
    </div>
  );
};

export default GroupsPage;
