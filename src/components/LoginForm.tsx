import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { UserContext } from "../context/UserContext";
import User from "../types/User";

const LoginForm: React.FunctionComponent = () => {
  const [email, setEmail] = useState("");
  // const [user, setUser] = useState({});
  const { user, setUser } = React.useContext(UserContext);

  const fetchUser = async (email: string): Promise<User> => {
    const user = await axios.get("http://localhost:3001/user", {
      params: {
        email: email,
      },
    });
    return user.data;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const fetchedUser = await fetchUser(email);
      setUser(fetchedUser);
    } catch (exception) {
      alert(`exception during making user get request: ${exception}`);
    }
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        ></input>
        <button type="submit">Submit</button>
      </form>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

export default LoginForm;
