import { createContext, useEffect } from "react";
import { socket } from "../socket";

export const SocketContext = createContext(socket);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};