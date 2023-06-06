import React from "react";
import Contacts from "./Contacts";
import Chat from "./Chat";
import MessageControl from "./MessageControl";
import { SocketContext, SocketProvider } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";
import User from "../types/User";
import FindNewContact from "./FIndNewContact";

const ChatHomePage: React.FC = () => {
  const [selectedToUserEmail, setSelectedToUserEmail] =
    React.useState<string>("");

  return (
    <>
      <div id="ChatControlPanel">
        <Contacts setSelectedToUserEmail={setSelectedToUserEmail} />
        <FindNewContact
          setSelectedToUserEmail={setSelectedToUserEmail}
        ></FindNewContact>
      </div>

      <div id="Chat">
        <Chat
          fromUserEmail="lpaben62@gmail.com"
          toUserEmail={selectedToUserEmail}
          timestamp={new Date(
            new Date().setDate(new Date().getDate() - 7)
          ).getTime()}
        ></Chat>
        {/* {selectedToUserEmail.length > 0 && (
          <MessageControl
            selectedToUserEmail={selectedToUserEmail}
          ></MessageControl>
        )} */}
        <MessageControl
          selectedToUserEmail={selectedToUserEmail}
        ></MessageControl>
      </div>
    </>
  );
};

export default ChatHomePage;
