// A React component that connects to the web socket server
// Provide an input field for the user to type in a message
// Send the message to the web socket server with a button
import React from "react";
import { UserContext } from "../context/UserContext";
import { SocketContext } from "../context/SocketContext";

interface MessageControlProps {
  selectedToUserEmail: string;
}

const MessageControl: React.FC<MessageControlProps> = ({
  selectedToUserEmail,
}) => {
  const { user } = React.useContext(UserContext);
  const { socket } = React.useContext(SocketContext);
  const [input, setInput] = React.useState<string>("");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (socket) {
      socket.emit("private_message", {
        fromUserEmail: user?.email,
        toUserEmail: selectedToUserEmail,
        content: input,
        timestamp: Date.now(),
      });
    } else alert("MessageControl component: socket instance is null");
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
      />
      <button onClick={handleClick}>Send</button>
    </div>
  );
};

export default MessageControl;
