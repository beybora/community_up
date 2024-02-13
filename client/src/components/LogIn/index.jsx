import { useState, useContext } from "react";
import { Button } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { AuthContext } from "../../context/Auth";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const { login } = useContext(AuthContext);

  const submitHandler = (e) => {
    // setLoading(true);
    if (!email || !password) {
      toast({
        title: "Fill out both fields",
        status: "warning",
        duration: 2500,
        isClosable: true,
        position: "bottom",
      });
      // setLoading(false);
      return;
    }
    const credentials = {
      email: email,
      password: password,
    };

    e.preventDefault();
    console.log(login(credentials));
  };

  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
        type="submit"
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
