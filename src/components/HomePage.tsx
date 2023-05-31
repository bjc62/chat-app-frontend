import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import ChatHomePage from "./ChatHomePage";
import LoginForm from "./LoginForm";

function HomePage() {
  const { user } = useContext(UserContext);
  return <>{user ? <ChatHomePage></ChatHomePage> : <LoginForm></LoginForm>}</>;
}

export default HomePage;
