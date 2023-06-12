// React component that manages many child components
// It manages few state and pass these states to its children components
// States:
//   - selectedToUserEmail: the email of the user that the current user is chatting with
//                          it can be updated by Contacts and FineNewContat components
//   - messages: the messages between the current user and the selected user
//               it can be updated by selectedToUserEmail state and MessageControl component
//               selectedToUserEmail will load completely different messagew
//               while MessageControl will append new messages as user input
import React from "react";
import Contacts from "./Contacts";
import Chat from "./Chat";
import MessageControl from "./MessageControl";
import { SocketContext, SocketProvider } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";
import FindNewContact from "./FIndNewContact";
import axios from "axios";
import Message from "../types/Message";

const ChatHomePage: React.FC = () => {
  const { user } = React.useContext(UserContext);
  const { socket } = React.useContext(SocketContext);

  const [selectedToUserEmail, setSelectedToUserEmail] =
    React.useState<string>("");
  const [messages, setMessages] = React.useState<Message[]>([]);

  // socket to register private_message event
  React.useEffect(() => {
    console.log("Chat component subscribing private_message event");

    const privateMessageHandler = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket?.on("private_message", privateMessageHandler);

    // Cleanup
    return () => {
      socket?.off("private_message", privateMessageHandler);
    };
  }, [socket]); // 'socket' as dependency to re-register the handler if 'socket' changes

  // fetch messages when selectedToUserEmail is updated
  React.useEffect(() => {
    console.log(
      `selectedToUserEmail is updated: ${selectedToUserEmail}, fetching messages...`
    );
    fetchAndSetMessage();
  }, [selectedToUserEmail]);

  const fetchAndSetMessage = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/historicalMessage`,
      {
        params: {
          fromUserEmail: user?.email,
          toUserEmail: selectedToUserEmail,
          timestamp: new Date(
            new Date().setDate(new Date().getDate() - 7)
          ).getTime(),
        },
      }
    );
    if (response.status === 200) {
      setMessages(response.data);
    } else {
      alert(
        `failed fetching message for fromUserEmail: ${
          user?.email
        }, toUserEmail: ${selectedToUserEmail}, timestamp: ${new Date(
          new Date().setDate(new Date().getDate() - 7)
        ).getTime()}. Setting messages to an empty array.`
      );
      setMessages([]);
    }
  };

  return (
    <>
      <div id="ChatControlPanel">
        <Contacts setSelectedToUserEmail={setSelectedToUserEmail} />
        <FindNewContact
          setSelectedToUserEmail={setSelectedToUserEmail}
        ></FindNewContact>
      </div>

      {/* todo: not render this div where there is no selectedToUserEmail*/}
      <div id="Chat">
        <Chat messages={messages}></Chat>
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
