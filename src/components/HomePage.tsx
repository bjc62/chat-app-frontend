import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import ChatHomePage from "./ChatHomePage";
import LoginForm from "./LoginForm";
import { SocketProvider } from "../context/SocketContext";

function HomePage() {
  const { user } = useContext(UserContext);
  return (
    <>
      {user ? (
        <SocketProvider>
          <ChatHomePage></ChatHomePage>
        </SocketProvider>
      ) : (
        <LoginForm></LoginForm>
      )}
    </>
  );
}

export default HomePage;
