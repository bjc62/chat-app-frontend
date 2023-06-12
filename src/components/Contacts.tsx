// An React component that displays a list of contacts
// Upon clicking on a contact, the Chat component will be displayed
// Other than this component itself, FindNewContact component can also be selecting a contact
// and cause a re-render to this component
import React from "react";
import axios from "axios";
import ChatHistory from "../types/ChatHistory";
import User from "../types/User";
import { UserContext } from "../context/UserContext";

interface ContactsProps {
  setSelectedToUserEmail: React.Dispatch<React.SetStateAction<string>>;
}

const Contacts: React.FC<ContactsProps> = ({ setSelectedToUserEmail }) => {
  const [chatHistories, setChatHistories] = React.useState<ChatHistory[]>();
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    const makeAPICall = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/chatHistory`,
        {
          params: { userEmail: user?.email },
        }
      );
      console.log(`fetched chatHistory: ${JSON.stringify(response.data)}`);
      setChatHistories(response.data);
    };
    makeAPICall();
  }, []);

  const handleClick = (selectedToUserEmail: string) => {
    setSelectedToUserEmail(selectedToUserEmail);
  };

  return (
    <>
      <header>Chat History</header>
      <ul>
        {chatHistories?.map((chatHistory) => (
          <li key={chatHistory.theOtherReceipient}>
            <a
              href="#"
              onClick={() => handleClick(chatHistory.theOtherReceipient)}
            >
              {chatHistory.theOtherReceipient}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Contacts;
