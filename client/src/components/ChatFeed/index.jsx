import { React, useContext } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { AuthContext } from "../../context/Auth";
import { Avatar, Flex, Tooltip } from "@chakra-ui/react";

const ChatFeed = ({ messages }) => {
  const { user } = useContext(AuthContext);

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <Flex
            key={m._id}
            justifyContent={
              m.senderId?._id === user._id ? "flex-end" : "flex-start"
            }
            alignItems="center"
            mb="10px"
            width="100%"
          >
            {m.senderId._id !== user._id && (
              <Tooltip
                label={m.senderId.email}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.senderId.email}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor:
                  m.senderId._id === user._id ? "#BEE3F8" : "#B9F5D0",
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </Flex>
        ))}
    </ScrollableFeed>
  );
};

export default ChatFeed;
