import { React, useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/Auth";
import { Box, Text } from "@chakra-ui/layout";
import ChatFeed from "../ChatFeed";
import axios from "../../axiosinstance";
import { io } from "socket.io-client";
const ENDPOINT = import.meta.env.VITE_SERVER_BASE_URL;
import {
  FormControl,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { AppDataContext } from "../../context/AppDataContext";

const SingleChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const toast = useToast();
  const socket = useRef(null);

  const { user } = useContext(AuthContext);
  const { selectedGroup } = useContext(AppDataContext);

  useEffect(() => {
    socket.current = io(ENDPOINT, { transports: ["websocket"] });

    socket.current.on("connect", () => {
      //setSocketConnected(true);
      console.log("Connected to socket - frontend - single chat");
    });

    socket.current.on("messageReceived", newMessageReceived);
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    if (!selectedGroup) return;

    try {
      const fetchedMessaged = await axios.get(
        `/messages/${selectedGroup.chat._id}`
      );
      setLoading(false);
      setMessages(fetchedMessaged.data);
      socket.current.emit("joinChat", selectedGroup.chat._id);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast({
        title: "Error",
        description: "Error fetching messages",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedGroup]);

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      setNewMessage("");
      e.preventDefault();

      try {
        const message = await axios.post("messages/send", {
          groupId: selectedGroup._id,
          senderId: user._id,
          content: newMessage,
        });
        setNewMessage("");
        socket.current.emit("newMessage", message.data);
        setMessages([...messages, message.data]);
      } catch (error) {
        toast({
          title: "Error",
          description: "Error sending message",
          status: "error",
          duration: 2500,
          isClosable: true,
          position: "bottom",
        });
        console.error(error);
        setNewMessage("");
      }
    }
  };

  const newMessageReceived = (data) => {
    setMessages((prevMessages) => [...prevMessages, data]);
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        alignItems="flex-end"
        padding={3}
        background="#E8E8E8"
        width="100%"
        height="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {loading ? (
          <Spinner
            size="xl"
            width="20"
            height="20"
            alignSelf="center"
            margin="auto"
          />
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            overflowY="scroll"
            width="100%"
          >
            <ChatFeed messages={messages} />
          </Box>
        )}
        <FormControl onKeyDown={sendMessage}>
          <Input
            variant="filled"
            placeholder="Type a message"
            value={newMessage}
            onChange={handleTyping}
          ></Input>
        </FormControl>
      </Box>
    </>
  );
};

export default SingleChat;
