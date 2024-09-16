# Collaby - Frontend

Collaby is a collaborative application that allows users to create and join rooms, assign and manage tasks, chat with others in the room, and collaborate on a word editor in real-time. The front-end of this application is built using React, Chakra UI, and Socket.io.

## Features

1. **Room Creation & Joining:** Users can create or join rooms to interact with others in a shared space.
2. **Task Assignment & Management:** Users can assign tasks to each other and mark them complete.
3. **Chat Functionality:** Real-time chat for users in the same room using Socket.io.
4. **Collaborative Word Editor:** A text editor using React-Quill for real-time editing by multiple users.

## Tech Stack

-   **React.js**: For building the user interface.
-   **Socket.io**: For real-time communication between users in chat and collaborative editing.
-   **Chakra UI**: A component library to design the interface with reusable, responsive components.

## Contribution

This project was solely developed by me (Shlok), responsible for:

-   Setting up the entire React environment.
-   Integrating Socket.io for real-time chat and word editing.
-   Implementing the task assignment and management features.
-   Designing and styling the UI using Chakra UI.

## Running it locally

Frontend
- Clone this repository
- npm i
- npm run dev (Running it on development)
- Should be visible at http://localhost:5173

Backend
- Clone https://github.com/shlok-shah/collaby-backend
- npm i
- Run your local mongodb server (mongodb://localhost:27017) OR If you want to connect to mongodb atlas instead of local instance create a new .env file in the root of the directory. Add MONGO_URL={your atlas url} to the file
- if running mongodb server locally, use "npm start"
- If using mongodb atlas instead, run "npm run prod"

The backend should be running at http://localhost:5000

## Deployed at

- The fully functional website is deployed at https://collaby-frontend.vercel.app/

