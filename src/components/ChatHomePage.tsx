import React from "react";
import Contacts from "./Contacts";
import Chat from "./Chat";
import MessageControl from "./MessageControl";
import { SocketProvider } from "../context/SocketContext";

const ChatHomePage: React.FC = () => {
  console.log("rendering chat history");

  return (
    <SocketProvider>
      <Contacts contacts={[{ email: "1" }, { email: "2" }]} />
      <div>
        <Chat
          fromUserEmail="lpaben62@gmail.com"
          toUserEmail="lpaben63@gmail.com"
          timestamp={new Date(
            new Date().setDate(new Date().getDate() - 7)
          ).getTime()}
        ></Chat>
        <MessageControl></MessageControl>
      </div>
    </SocketProvider>
  );
};

export default ChatHomePage;
