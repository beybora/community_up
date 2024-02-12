import "./index.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import Login from "../../components/LogIn";
import Register from "../../components/Register";
import { AuthContext } from "../../context/Auth";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

const Authentication = () => {
  const { user } = useContext(AuthContext);
  const [isLoginTab, setLoginTab] = useState(true);
  const navigate = useNavigate();


  const handleTabChange = () => {
    setLoginTab(!isLoginTab);
  };

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          fontSize="4xl"
          justifyContent="center"
          display="flex"
          fontFamily="fantasy"
        >
          COMMUNITY UP
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Authentication;
