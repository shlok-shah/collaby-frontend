import React from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

const SocketProvider = ({ children }) => {
	const ENDPOINT =
		process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://collaby-backend.onrender.com";

	console.log(process.env.NODE_ENV);

	const socket = io(ENDPOINT, { transports: ["websocket", "polling"] });
	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export { SocketContext, SocketProvider };
