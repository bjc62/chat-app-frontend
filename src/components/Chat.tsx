// React component to display list of messages
// List of messages is passed to this component as props and controlled by its parent: ChatHomePage
// Whenever socker receive new messages, socket will update the messages and cause re-render to this component
// After user select which use to chat with, MessageControal should update the selectedToUserEmail state
// and when selectedToUserEmail state is updated, it should trigger ChatHomePage to re-fetch the chat history
// between the current user and the selected user, and then update the messages
import axios from "axios";
import React from "react";
import Message from "../types/Message";

interface ChatProps {
  messages: Message[];
}

const Chat: React.FC<ChatProps> = (props: ChatProps) => {
  return (
    <ul>
      {props.messages.map((message) => {
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
