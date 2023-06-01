import React from "react";
import { UserContext } from "../context/UserContext";
import { SocketContext } from "../context/SocketContext";

// A React component that connects to the web socket server
// Provide an input field for the user to type in a message
// Send the message to the web socket server with a button
const MessageControl: React.FC = () => {
  const { user } = React.useContext(UserContext);
  const { socket } = React.useContext(SocketContext);
  const [input, setInput] = React.useState<string>("");

  React.useEffect(() => {
    console.log("MessageControl useEffect, connecting to websocket");
    return () => {
      socket?.disconnect();
      console.log("web socket disconnected");
    };
  }, [user]);

  socket?.emit("register", { email: user?.email });

  const sendMessage = (event: React.MouseEvent<HTMLElement>) => {
    console.log(`sending message: ${input}`);
    if (socket) {
      socket.emit("private_message", {
        fromUserEmail: user?.email,
        toUserEmail: "lpaben63@gmail.com",
        content: input,
        timestamp: Date.now(),
      });
    } else alert("socket instance is null");
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
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageControl;
