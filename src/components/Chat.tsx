import axios from "axios";
import React from "react";
import Message from "../types/Message";

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
