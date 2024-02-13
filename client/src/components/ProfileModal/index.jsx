// ProfileModal.js

import { React, useContext } from "react";
import { AuthContext } from "../../context/Auth";
import { CheckCircleIcon } from "@chakra-ui/icons";
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
  useDisclosure,
  UnorderedList,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";

const ProfileModal = ({ isOpen, onClose }) => {
  const { user } = useContext(AuthContext);
  console.log("user", user);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding="2rem">
        <ModalHeader>User Profile</ModalHeader>
        <ModalBody>
          <Text mb=".5rem">Username: {user.username}</Text>
          <Text mb=".5rem">Location: {user.location}</Text>
          <Text mb=".5rem">Registration Date: {user.registrationDate}</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
