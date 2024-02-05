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
import { React, useState, useContext} from "react";
import axios from "../../axiosinstance";
import { AuthContext } from "../../context/Auth";

const CreateGroupModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const toast = useToast();

  const { user, selectedChat, setSelectedChat, chats, setChats, selectedCommunity  } =
    useContext(AuthContext);

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
        setChats([response.data, ...chats]);
        setNewChatAdded((prev) => !prev);

        axios
          .get(`/group/groups-by-community/${selectedCommunity}`)
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
