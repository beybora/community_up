import { useState, useContext } from "react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { Select } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { AppDataContext } from "../../context/AppDataContext";
import { AuthContext } from "../../context/Auth";

const Register = () => {
  const [show, setShow] = useState(false);
  const toast = useToast();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    selectedPlace: "", // Store the ObjectId of the selected place
  });

  const { places } = useContext(AppDataContext);
  const { register, loading, user } = useContext(AuthContext);

  const handleClick = () => setShow(!show);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceChange = (e) => {
    const selectedPlaceId = e.target.value; 
    console.log(selectedPlaceId);
    setFormData({ ...formData, selectedPlace: selectedPlaceId }); 
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password and Confirm Password should be the same",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    toast({
      title: "Successfully Registered!",
      status: "success",
      duration: 2500,
      isClosable: true,
      position: "bottom",
    });
    console.log(formData);
    register(formData);
  };

  if (!loading && user) {
    return <Navigate to="/" />;
  }

  if (!loading && !user) {
    return (
      <VStack spacing="5px">
        <FormControl id="first-name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter Your Name"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            placeholder="Enter Your Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={show ? "text" : "password"}
              placeholder="Confirm password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="place" isRequired>
          <FormLabel>Select Your Place</FormLabel>
          <Select
            placeholder="Select your place"
            value={formData.selectedPlace}
            onChange={handlePlaceChange} 
          >
            {places &&
              places.map((place) => (
                <option key={place._id} value={place._id}>
                  {place.name}
                </option>
              ))}
          </Select>
        </FormControl>
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
        >
          Sign Up
        </Button>
      </VStack>
    );
  }
};

export default Register;
