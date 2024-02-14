import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon, BellIcon } from "@chakra-ui/icons";
import ProfileModal from "../ProfileModal";
import Logo from "../../assets/logo.png";
import { AuthContext } from "../../context/Auth";

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

function NavBar() {
  const { user, logout } = useContext(AuthContext);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const logoutHandler = () => {
    logout();
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
      <Box>
        <img src={Logo} alt="Logo" style={{ height: "50px", width: "auto" }} />
      </Box>
      <Box display="flex" gap="10px">
        {/* <Menu>
          <MenuButton>
            <BellIcon fontSize="2xl" m={1} />
          </MenuButton>
        </Menu> */}
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
