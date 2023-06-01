import React, { useEffect } from "react";
import io, { Socket } from "socket.io-client";

interface SocketContextProps {
  socket: Socket | null;
}

export const SocketContext = React.createContext<SocketContextProps>({
  socket: null,
});

export const SocketProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = React.useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io("http://localhost:3002");
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
