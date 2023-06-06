// an React component that provide input to have user enter email of new contact
// and a button to submit the email
// submitted email will be used by the Contacts component to display it in the list

import React, { ChangeEvent } from "react";
import User from "../types/User";

interface FindNewContactProps {
  setSelectedToUserEmail: React.Dispatch<React.SetStateAction<string>>;
}

const FindNewContact: React.FC<FindNewContactProps> = ({
  setSelectedToUserEmail,
}) => {
  const [toUserEmailInput, setToUserEmailInput] = React.useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setToUserEmailInput(event.target.value);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedToUserEmail(toUserEmailInput);
  };

  return (
    <div id="FindNewContact">
      <input
        type="text"
        onChange={handleInputChange}
        value={toUserEmailInput}
      ></input>
      <button onClick={handleButtonClick}>Create Chat</button>
    </div>
  );
};

export default FindNewContact;
