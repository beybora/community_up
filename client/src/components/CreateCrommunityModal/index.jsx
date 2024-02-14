import { React, useState, useContext, useRef, useEffect } from "react";
import axios from "../../axiosinstance";
import io from "socket.io-client";
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
  FormLabel,
  useDisclosure,
  useToast,
  Input,
  Switch,
} from "@chakra-ui/react";
import { AppDataContext } from "../../context/AppDataContext";
import { AuthContext } from "../../context/Auth";

const CreateCommunityModal = ({ children }) => {
  const [newCommunityName, setNewCommunityName] = useState("");
  const [newCommunityDescription, setNewCommunityDescription] = useState("");
  const [newCommunityPrivate, setNewCommunityPrivate] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { setFetchCommunities } = useContext(AppDataContext);
  const { setFetchUser } = useContext(AuthContext);
  
  const socket = useRef(null);

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
        position: "bottom",
      });
      return;
    }

    const community = {
      name: newCommunityName,
      description: newCommunityDescription,
      private: newCommunityPrivate,
    };

    axios
      .post(`/api/community/create`, community)
      .then((response) => {
        setNewCommunityDescription("");
        setNewCommunityName("");
        socket.current.emit("newCommunity", response.data);
        setFetchUser((prev) => !prev);
        setFetchCommunities((prev) => !prev);
        toast({
          title: "New Community Created!",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottomtom",
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

  const handleTextEditorChange = (value) => {
    setNewCommunityDescription(value);
  };

  return (
    <>
      <Button bg="#E8E8E8" onClick={onOpen}>Create a Community</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding="2rem">
          <ModalHeader padding="0px" mb={5}>
            Create a Community{" "}
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
              placeholder="Name your community"
              mb={3}
              onChange={(e) => setNewCommunityName(e.target.value)}
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
              value={newCommunityDescription} // bind the content state to the value of the editor
              onChange={handleTextEditorChange}
            />
          </FormControl>
          <FormControl display="flex" alignItems="center" mb={3}>
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
