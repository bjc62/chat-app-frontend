import axios from "axios";
import React from "react";
import Message from "../types/Message";
import { SocketContext } from "../context/SocketContext";

interface ChatProps {
  fromUserEmail: string;
  toUserEmail: string;
  timestamp: number;
}

const fetchChatMessage = async (
  fromUserEmail: string,
  toUserEmail: string,
  timestamp: number
): Promise<Message[]> => {
  const response = await axios.get("http://localhost:3001/chatHistory", {
    params: {
      fromUserEmail,
      toUserEmail,
      timestamp,
    },
  });
  return response.data;
};

const Chat: React.FC<ChatProps> = (props: ChatProps) => {
  const [messages, setMessages] = React.useState<Message[]>([]);

  const { socket } = React.useContext(SocketContext);

  React.useEffect(() => {}, []);

  // fetch historical messages
  React.useEffect(() => {
    console.log("Chat component fetching message");
    const makeAPIcall = async () => {
      const response = await fetchChatMessage(
        props.fromUserEmail,
        props.toUserEmail,
        props.timestamp
      );
      setMessages(response);
    };
    makeAPIcall();
  }, []);

  // socket to register private_message event
  React.useEffect(() => {
    console.log("Chat component registering private_message event");
    const privateMessageHandler = (message: Message) => {
      console.log(`received private_message: ${JSON.stringify(message)}}`);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket?.on("private_message", privateMessageHandler);

    // Cleanup
    return () => {
      socket?.off("private_message", privateMessageHandler);
    };
  }, [socket]); // 'socket' as dependency to re-register the handler if 'socket' changes

  return (
    <ul>
      {messages.map((message) => {
        return (
          <li
            key={`${message.fromUserEmail}:${message.toUserEmail}:${message.timestamp}`}
          >
            {message.content}
          </li>
        );
      })}
    </ul>
  );
};

export default Chat;
