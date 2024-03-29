import React, { useContext } from "react";
import { AuthContext } from "../../context/Auth";
import useDateFormat from "../../hooks/useDateFormat";
import {
  Text,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

const ProfileModal = ({ isOpen, onClose }) => {
  const { user } = useContext(AuthContext);
  const formattedRegistrationDate = useDateFormat(user.registrationDate);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding="2rem">
        <ModalHeader>User Profile</ModalHeader>
        <ModalBody>
          <Text mb=".5rem">Username: {user.username}</Text>
          <Text mb=".5rem">Location: {user.location}</Text>
          <Text mb=".5rem">Registration Date: {formattedRegistrationDate}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
