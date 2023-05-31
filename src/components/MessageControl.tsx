import React from "react";
import { UserContext } from "../context/UserContext";
import io, { Socket } from "socket.io-client";

// A React component that connects to the web socket server
// Provide an input field for the user to type in a message
// Send the message to the web socket server with a button
const MessageControl: React.FC = () => {
  const { user } = React.useContext(UserContext);
  const [input, setInput] = React.useState<string>("");
  const [socket, setSocket] = React.useState<Socket | null>(null);

  React.useEffect(() => {
    console.log("MessageControl useEffect, connecting to websocket");
    const newSocket = io("http://localhost:3002");
    console.log(`socket: ${socket}`);
    newSocket.on("server_message", ({ message }) => {
      console.log(`message from server: ${message}`);
    });
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
      console.log("web socket disconnected");
    };
  }, [user]);

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
      />
      <button
        onClick={(event) => {
          console.log(`sending message: ${input}`);
          if (socket) {
            socket.emit("client_message", {
              message: input,
            });
          } else alert("socket instance is null");
        }}
      >
        Send
      </button>
    </div>
  );
};

export default MessageControl;
