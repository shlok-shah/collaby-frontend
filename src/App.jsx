import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Project from "./components/Project";
// import Chat from "./components/Chat/Chat";
import { SocketProvider } from "./socketContext";
import { MainProvider } from "./mainContext";
import "./App.css";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { UsersProvider } from "./usersContext";
// import DefaultPage from "./components/DefaultPage";

function App() {
	return (
		<ChakraProvider>
			<MainProvider>
				<UsersProvider>
					<SocketProvider>
						<Flex className="App">
							<BrowserRouter>
								<Routes>
									<Route path="/" element={<Login />} />
									<Route path="/project" element={<Project />} />
									{/* <Route component={DefaultPage} /> */}
								</Routes>
							</BrowserRouter>
						</Flex>
					</SocketProvider>
				</UsersProvider>
			</MainProvider>
		</ChakraProvider>
	);
}

export default App;
