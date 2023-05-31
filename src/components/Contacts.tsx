import User from "../types/User";

interface ContactsProps {
  contacts: User[];
}

const Contacts: React.FC<ContactsProps> = ({ contacts }) => {
  return (
    <>
      <header>Chat History</header>
      <ul>
        {contacts.map((user) => (
          <li key={user.email}>{user.email}</li>
        ))}
      </ul>
    </>
  );
};

export default Contacts;
