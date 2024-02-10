import { React, useState, useContext, useRef, useEffect } from "react";
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
  FormLabel,
  useDisclosure,
  useToast,
  Input,
  Switch,
} from "@chakra-ui/react";

const CreateCommunityModal = ({ children }) => {
  const [newCommunityName, setNewCommunityName] = useState("");
  const [newCommunityDescription, setNewCommunityDescription] = useState("");
  const [newCommunityPrivate, setNewCommunityPrivate] = useState(false);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const socket = useRef(null);
  const { setFetchCommunities } = useContext(AuthContext);

  useEffect(() => {
    socket.current = io(ENDPOINT, { transports: ["websocket"] });
    socket.current.on("communityReceived", newCommunityReceived);
  }),
    [];

  const handleSubmit = () => {
    if (!newCommunityName || !newCommunityDescription) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    const community = {
      name: newCommunityName,
      description: newCommunityDescription,
      private: newCommunityPrivate,
    };

    axios
      .post(`/community/create`, community)
      .then((response) => {
        setNewCommunityDescription("");
        setNewCommunityName("");
        socket.current.emit("newCommunity", response.data);
        setFetchCommunities((prev) => !prev);
        toast({
          title: "New Community Created!",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        onClose();
      })
      .catch((error) => {
        setNewCommunityDescription("");
        setNewCommunityName("");
        onClose();
        console.error("Error creating new community", error);
      });
  };

  const newCommunityReceived = (community) => {
    setFetchCommunities((prev) => !prev);
  };

  return (
    <>
      <Button onClick={onOpen}>Create a Community</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Community </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            assumenda numquam temporibus vel, quam nobis sint ullam neque
            nostrum rem.
          </ModalBody>
          <FormControl>
            <Input
              placeholder="Community Name"
              mb={3}
              onChange={(e) => setNewCommunityName(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <Input
              placeholder="Community Description"
              mb={1}
              onChange={(e) => setNewCommunityDescription(e.target.value)}
            />
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Private</FormLabel>
            <Switch
              id="private-switch"
              onChange={() => setNewCommunityPrivate(!newCommunityPrivate)} // Toggle private status
              isChecked={newCommunityPrivate}
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

export default CreateCommunityModal;
