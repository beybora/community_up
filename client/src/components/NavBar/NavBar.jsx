import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Text,
  Box,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { ChevronDownIcon, BellIcon } from "@chakra-ui/icons";
import { AuthContext } from "../../context/Auth";
import axios from "../../axiosinstance";
import ProfileModal from "../ProfileModal";

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const logoutHandler = async () => {
    try {
      await logout(); // Using the logout function from AuthContext
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      width="100%"
      padding="5px 10px 5px 10px"
      borderColor={"darkgreen"}
    >
      <Text fontSize="2xl">Community Up</Text>
      <Box display="flex" gap="10px">
        <Menu>
          <MenuButton>
            <BellIcon fontSize="2xl" m={1} />
          </MenuButton>
        </Menu>
        <Menu>
          <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
            <Avatar
              size="sm"
              cursor="pointer"
              name={user?.username}
              src={user?.pic}
            />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={openProfileModal}>My Profile</MenuItem>
            <MenuDivider />
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      {user && (
        <ProfileModal isOpen={isProfileModalOpen} onClose={closeProfileModal} />
      )}
    </Box>
  );
}

export default NavBar;
