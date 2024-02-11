import { React, useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosinstance";
import { AuthContext } from "../../context/Auth";
import { io } from "socket.io-client";
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

const CreateGroupModal = ({ children }) => {
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

  return (
    <>
      <Button onClick={onOpen}>Create a Group</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Group </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            assumenda numquam temporibus vel, quam nobis sint ullam neque
            nostrum rem.
          </ModalBody>
          <FormControl>
            <Input
              placeholder="Group Name"
              mb={3}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <Input
              placeholder="Group Description"
              mb={1}
              onChange={(e) => setNewGroupDescription(e.target.value)}
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
