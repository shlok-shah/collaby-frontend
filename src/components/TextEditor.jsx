import ReactQuill, { Quill } from "react-quill";
import "quill/dist/quill.snow.css";
import { MainContext } from "../mainContext";
import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../socketContext";
import { UsersContext } from "../usersContext";
import Delta from "quill-delta";

const TextEditor = () => {
	const { name, room } = useContext(MainContext);
	const socket = useContext(SocketContext);
	const [documentState, setDocumentState] = useState(null);
	const { users } = useContext(UsersContext);
	const quillRef = useRef(null);

	const navigate = useNavigate();

	useEffect(() => {
		if (!quillRef.current) {
			console.error("Quill Editor is not initialized yet.");
			return;
		}
		console.log("2nd useEffect");

		socket.on("initialize-document", (documentState) => {
			console.log("initialized");
			console.log(documentState, typeof documentState);
			const documentStateObj = JSON.parse(documentState);
			const delta = new Delta(documentStateObj);
			console.log(documentStateObj, typeof documentStateObj, documentStateObj !== null);
			if (typeof documentStateObj === "object" && documentStateObj !== null) {
				quillRef.current.getEditor().setContents(delta, "silent");
				setDocumentState(delta);
			} else {
				console.error("Document state is neither a string nor a valid object:", documentStateObj);
				quillRef.current.getEditor().setText("Failed to load document.");
			}
			quillRef.current.getEditor().enable();
		});

		socket.on("text-change", (data) => {
			if (data.name !== name) {
				const delta = new Delta(data.delta);
				quillRef.current.getEditor().updateContents(delta, "silent");
				setDocumentState((prevState) => {
					if (prevState) {
						const newDocumentState = prevState.compose(delta);
						console.log("New document state after compose:", newDocumentState);
						return newDocumentState;
					} else {
						console.error("Previous state is undefined.");
						return new Delta(); // Reset to an empty Delta if undefined
					}
				});
			}
		});

		return () => {
			socket.off("initialize-document");
			socket.off("text-change");
			socket.disconnect();
			if (quillRef.current) quillRef.current.getEditor().off("text-change");
			console.log("Cleaned up on component unmount");
		};
	}, [room, name]);

	useEffect(() => {
		if (!socket || !quillRef.current) return;

		const handleTextChange = (delta, oldDelta, source) => {
			if (source !== "user") return;
			socket.emit("text-change", { room, name, delta: delta });
			saveCurrentDocumentState();
		};

		quillRef.current.getEditor().on("text-change", handleTextChange);
	}, [socket, room, name]);

	const saveCurrentDocumentState = () => {
		if (!quillRef.current) return;
		if (quillRef.current) {
			const currentContents = quillRef.current.getEditor().getContents(); // Get the current state of the editor
			const serializedContent = JSON.stringify(currentContents); // Serialize the state
			socket.emit("save-document", { room, content: serializedContent });
		}
	};

	return <ReactQuill ref={quillRef} theme="snow" placeholder="Start collaborating..." style={{ height: "60vh" }} />;
};

export default TextEditor;
