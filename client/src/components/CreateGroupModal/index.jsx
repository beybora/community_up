import { React, useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosinstance";
import { AuthContext } from "../../context/Auth";
import { io } from "socket.io-client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
  FormControl,
  useDisclosure,
  useToast,
  Input,
} from "@chakra-ui/react";

const CreateGroupModal = () => {
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const socket = useRef(null);

  const { groups, setGroups, selectedCommunity, setFetchGroups } =
    useContext(AuthContext);

  useEffect(() => {
    if (!selectedCommunity) {
      navigate("/communities");
      return;
    }
    socket.current = io(ENDPOINT, { transports: ["websocket"] });
    socket.current.on("groupReceived", newGroupReceived);
  }, [selectedCommunity]);

  const handleSubmit = () => {
    if (!newGroupName || !newGroupDescription) {
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
      .post(`/group/groups/${selectedCommunity._id}`, {
        name: newGroupName,
        description: newGroupDescription,
      })
      .then((response) => {
        setNewGroupDescription("");
        setNewGroupName("");
        toast({
          title: "New Group Chat Created!",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        setGroups([response.data, ...groups]);
        socket.current.emit("newGroup", response.data);
        setFetchGroups((prev) => !prev);
        axios
          .get(`/group/groups-by-community/${selectedCommunity._id}`)
          .then((response) => {
            onClose();
          })
          .catch((error) => {
            onClose();
            console.error("Error fetching updated groups", error);
            toast({
              title: "Failed to Create the Chat!",
              description: error.response.data,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
          });
      })
      .catch((error) => {
        setNewGroupDescription("");
        setNewGroupName("");
        onClose();
        console.error("Error creating new group", error);
      });
  };

  const newGroupReceived = () => {
    setFetchGroups((prev) => !prev);
  };

  const handleTextEditorChange = (value) => {
    setNewGroupDescription(value);
  };

  return (
    <>
      <Button onClick={onOpen}>Create a Group</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding="2rem">
          <ModalHeader padding="0px" mb={5}>
            Create Groupe
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="0px" mb={5}>
            Define your group's purpose, values, and target audience. Establish
            clear guidelines for behavior, content, and moderation. With a solid
            foundation in place, your group will be poised to attract
            like-minded individuals and cultivate a vibrant community within the
            larger community space.
          </ModalBody>
          <FormControl>
            <Input
              placeholder="Name your Group"
              mb={3}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <ReactQuill
              style={{
                resize: "vertical",
                height: "10rem",
                marginBottom: "5rem",
              }}
              theme="snow" // specify the theme (snow is a clean theme)
              value={newGroupDescription} // bind the content state to the value of the editor
              onChange={handleTextEditorChange}
            />
          </FormControl>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" mr={3} onClick={handleSubmit}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateGroupModal;
