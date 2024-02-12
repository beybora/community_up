import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "../../axiosinstance";
import { io } from "socket.io-client";
import ReactQuill from "react-quill";
import { AuthContext } from "../../context/Auth";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/toast";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  IconButton,
  FormControl,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
const ENDPOINT = import.meta.env.VITE_SERVER_BASE_URL;

const EditCommunityModal = ({ community }) => {
  const [communityName, setCommunityName] = useState(community.name);
  const [communityDescription, setCommunityDescription] = useState(
    community.description
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const socket = useRef(null);

  const { setFetchCommunities } = useContext(AuthContext);

  useEffect(() => {
    socket.current = io(ENDPOINT, { transports: ["websocket"] });
    socket.current.on("communityUpdated", handleCommunityUpdated);
    return () => {
      socket.current.off("communityUpdated", handleCommunityUpdated);
    };
  }, []);

  const handleSubmit = () => {
    if (!communityName || !communityDescription) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    axios
      .put(`/community/${community._id}`, {
        name: communityName,
        description: communityDescription,
      })
      .then((response) => {
        toast({
          title: "Community Updated Successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        onClose();
        handleCommunityUpdated();
        socket.current.emit("newCommunityUpdate", response.data);
      })
      .catch((error) => {
        console.error("Error updating community", error);
        toast({
          title: "Failed to Update Community!",
          description: error.response.data,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      });
  };

  const handleDelete = () => {
    axios
      .delete(`/community/${community._id}`)
      .then(() => {
        toast({
          title: "Community Deleted Successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        onClose();
        handleCommunityUpdated();
      })
      .catch((error) => {
        console.error("Error deleting community", error);
        toast({
          title: "Failed to Delete Community!",
          description: error.response.data,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      });
  };

  const handleTextEditorChange = (value) => {
    setCommunityDescription(value);
  };

  const handleCommunityUpdated = () => {
    setFetchCommunities((prev) => !prev);
  };

  return (
    <>
      <div>
        <IconButton
          icon={<EditIcon />}
          colorScheme="teal"
          aria-label="Edit Community"
          size="md"
          onClick={onOpen}
          mr={2}
        />
        <IconButton
          icon={<DeleteIcon />}
          colorScheme="red"
          aria-label="Delete Community"
          size="md"
          onClick={handleDelete}
        />
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding="2rem">
          <ModalHeader padding="0px" mb={5}>
            Edit Community
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="0px" mb={5}>
            <FormControl>
              <Input
                placeholder="Community Name"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                mb={3}
              />
            </FormControl>
            <FormControl>
              <ReactQuill
                style={{
                  resize: "vertical",
                  height: "10rem",
                  marginBottom: "3rem",
                }}
                theme="snow"
                value={communityDescription}
                onChange={handleTextEditorChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter display="flex" gap="5px">
            <Button colorScheme="gray" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleSubmit}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditCommunityModal;
