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
import { ChevronDownIcon, BellIcon, HamburgerIcon } from "@chakra-ui/icons";
import { AuthContext } from "../../context/Auth";
import axios from "../../axiosinstance"; 


function NavBar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    axios 
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
          <MenuButton as={Button} bg="white" p={1}>
            <BellIcon fontSize="2xl" m={1} />
          </MenuButton>
          <MenuButton as={Button} bg="white" p={1}>
            <HamburgerIcon fontSize="2xl" m={1} />
          </MenuButton>
          <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
            <Avatar
              size="sm"
              cursor="pointer"
              name={user?.username}
              src={user?.pic}
            />
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                /* Handle profile click */
              }}
            >
              My Profile
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
}

export default NavBar;
