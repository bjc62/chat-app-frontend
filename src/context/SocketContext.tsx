import React, { useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { UserContext } from "./UserContext";

interface SocketContextProps {
  socket: Socket | null;
}

export const SocketContext = React.createContext<SocketContextProps>({
  socket: null,
});

export const SocketProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { user } = React.useContext(UserContext);

  const [socket, setSocket] = React.useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io("http://localhost:3002");
    socketIo.emit("register", { email: user?.email });
    setSocket(socketIo);
    return () => {
      socketIo.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
