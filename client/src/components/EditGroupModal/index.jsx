import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "../../axiosinstance";
import { io } from "socket.io-client";
import ReactQuill from "react-quill";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import "react-quill/dist/quill.snow.css";
import { useToast } from "@chakra-ui/toast";
const ENDPOINT = import.meta.env.VITE_SERVER_BASE_URL;
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
import { AppDataContext } from "../../context/AppDataContext";

const EditGroupModal = ({ group }) => {
  const [groupName, setGroupName] = useState(group.name);
  const [groupDescription, setGroupDescription] = useState(group.description);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const socket = useRef(null);

  const { setFetchGroups } = useContext(AppDataContext);

  useEffect(() => {
    socket.current = io(ENDPOINT, { transports: ["websocket"] });
    socket.current.on("groupUpdated", handleGroupUpdated);
    return () => {
      socket.current.off("groupUpdated", handleGroupUpdated);
    };
  }, []);

  const handleSubmit = () => {
    if (!groupName || !groupDescription) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    axios
      .put(`/group/groups/${group._id}`, {
        name: groupName,
        description: groupDescription,
      })
      .then((response) => {
        toast({
          title: "Group Updated Successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
        onClose();
        handleGroupUpdated();
        socket.current.emit("newGroupUpdate", response.data);
      })
      .catch((error) => {
        console.error("Error updating group", error);
        toast({
          title: "Failed to Update Group!",
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
      .delete(`api/group/groups/${group._id}`)
      .then(() => {
        toast({
          title: "Group Deleted Successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
        onClose();
        handleGroupUpdated();
      })
      .catch((error) => {
        console.error("Error deleting group", error);
        toast({
          title: "Failed to Delete Group!",
          description: error.response.data,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      });
  };

  const handleTextEditorChange = (value) => {
    setGroupDescription(value);
  };

  const handleGroupUpdated = () => {
    setFetchGroups((prev) => !prev);
  };

  return (
    <>
      <div>
        <IconButton
          icon={<EditIcon />}
          colorScheme="teal"
          aria-label="Edit Group"
          size="sm"
          onClick={onOpen}
          mr={2}
        />
        <IconButton
          icon={<DeleteIcon />}
          colorScheme="red"
          aria-label="Delete Group"
          size="sm"
          onClick={handleDelete}
        />
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding="2rem">
          <ModalHeader padding="0px" mb={5}>
            Edit Group
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="0px" mb={5}>
            <FormControl>
              <Input
                placeholder="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
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
                value={groupDescription}
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

export default EditGroupModal;
