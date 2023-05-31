import React from "react";
import Contacts from "./Contacts";
import Chat from "./Chat";
import MessageControl from "./MessageControl";

const ChatHomePage: React.FC = () => {
  console.log("rendering chat history");

  return (
    <>
      <Contacts contacts={[{ email: "1" }, { email: "2" }]} />
      <div>
        {/* <Chat></Chat> */}
        <MessageControl></MessageControl>
      </div>
    </>
  );
};

export default ChatHomePage;
