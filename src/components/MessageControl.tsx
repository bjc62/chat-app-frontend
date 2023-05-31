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
    newSocket.on("server_message", ({ message }) => {
      console.log(`message from server: ${message}`);
    });
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
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
        timestamp: new Date().getTime(),
      });
    } else alert("socket instance is null");
  };

  // socket here should be moved to Chat component
  // so that when socket receives message, it can append new message
  // maybe socket needs to be saved to context
  if (socket) {
    socket.on("private_message", (obj) => {
      console.log(`received private_message: ${JSON.stringify(obj)}}`);
    });
  }

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
