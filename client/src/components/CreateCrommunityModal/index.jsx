import { React, useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "../../axiosinstance";
import { AuthContext } from "../../context/Auth";
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
  Textarea,
} from "@chakra-ui/react";

const CreateCommunityModal = ({ children }) => {
  const [newCommunityName, setNewCommunityName] = useState("");
  const [newCommunityDescription, setNewCommunityDescription] = useState("");
  const [newCommunityPrivate, setNewCommunityPrivate] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { user } = useContext(AuthContext);

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
    axios
      .post(`/community/create`, {
        name: newCommunityName,
        description: newCommunityDescription,
        private: newCommunityPrivate,
      })
      .then((response) => {
        setNewCommunityDescription("");
        setNewCommunityName("");
        toast({
          title: "New Community Created!",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((error) => {
        setNewCommunityDescription("");
        setNewCommunityName("");
        onClose();
        console.error("Error creating new community", error);
      });
  };

  const handleTextEditorChange = (value) => {
    setNewCommunityDescription(value);
  };

  return (
    <>
      <Button onClick={onOpen}>Create a Community</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding="2rem">
          <ModalHeader padding="0px" mb={5}>
            Create Community{" "}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="0px" mb={5}>
            Describe your community's purpose, values, target audience, and
            unique selling points. Set clear rules for behavior, content, and
            moderation, including dos and not to dos. Once complete, you'll be
            ready to launch your community and invite others to join in building
            a vibrant and inclusive space.
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
                height: "5rem",
                marginBottom: "5rem",
              }}
              height
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
