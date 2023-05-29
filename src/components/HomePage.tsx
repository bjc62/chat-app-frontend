import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import ChatHistory from "./ChatHistory";
import LoginForm from "./LoginForm";

function HomePage() {
  const { user } = useContext(UserContext);
  return <>{user ? <ChatHistory></ChatHistory> : <LoginForm></LoginForm>}</>;
}

export default HomePage;
