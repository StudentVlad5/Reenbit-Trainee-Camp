# Reenbit Trainee Chat Application

This is a chat application built with the MERN stack (MongoDB, Express.js, React, and Node.js) that allows registered users to communicate with each other. It features user authentication, profile management, and automatic chat responses with random quotes from the backend. The app also supports notifications, search functionality, and real-time chat interactions.

## Project Features

- **User Authentication**: Users can sign up, log in, and log out using email and password.
- **Profile Management**: Users can add, edit, or delete personal information, including their profile picture.
- **User Status**: Track the online/offline status of each registered user.
- **Real-time Messaging**: Create new chats, send, edit, and delete messages in real-time.
- **Automatic Responses**: Upon starting a chat, the backend automatically responds with a random quote within 2 seconds.
- **Notifications**: Users receive notifications for new messages.
- **Search Functionality**: Users can search for a specific user by name or surname to initiate a chat.

## Technologies Used

- **Frontend**:
  - React.js (JS/TS preferred)
  - HTML, CSS
- **Backend**:
  - Express.js
  - MongoDB (Atlas)
  - Node.js

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

- Node.js
- npm or yarn
- MongoDB Atlas account (for cloud database storage)

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/StudentVlad5/Reenbit-Trainee-Camp.git
   cd Reenbit-Trainee-Camp
   ```

2. Install the required dependencies for both frontend and backend:

   - Backend:
     ```bash
     cd backend
     npm install
     ```

   - Frontend:
     ```bash
     cd frontend
     npm install
     ```

3. Set up your MongoDB Atlas database and configure your connection string in the backend.

4. Start both the backend and frontend servers:

   - Backend:
     ```bash
     cd backend
     npm start
     ```

   - Frontend:
     ```bash
     cd frontend
     npm start
     ```

5. Open the application in your browser by navigating to `http://localhost:3000` for the frontend.

### Features Walkthrough

1. **Authentication**: 
   - Register a new account by providing an email and password.
   - Log in with your credentials.
   - Passwords are hashed and stored securely in MongoDB.

2. **User Profile**: 
   - After logging in, users can view and edit their personal information and profile picture.
   - You can update your name, bio, and profile photo.

3. **Chat**:
   - Create new chats by selecting users from the registered users list.
   - Send messages, edit, or delete them.
   - For each new chat, you will receive an automatic response from the backend with a random quote.

4. **Notifications**:
   - Whenever a new message is sent, you will receive a notification in the application.

5. **Search**:
   - Use the search bar to find specific users by their first or last name.

6. **User Status**: 
   - The online/offline status of users is visible in the chat interface.

### Technologies in Detail

- **MERN Stack**:
  - MongoDB for database management.
  - Express.js for creating backend API.
  - React.js for building the frontend UI.
  - Node.js for the server-side runtime environment.
  
- **Socket**: Used for real-time messaging and updates when a new message is received or when a user changes their status.

- **JWT Authentication**: JSON Web Tokens (JWT) are used to authenticate users and maintain their session.

### Backend API Endpoints

- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/login**: Login with email and password.
- **GET /api/users**: Get a list of all registered users.
- **GET /api/users/:id**: Get a user’s profile information.
- **PUT /api/users/:id**: Update a user’s profile information.
- **DELETE /api/users/:id**: Delete a user’s account.

### Real-time Chat Endpoints 

- **Connect to socket server**: Establish a WebSocket connection.
- **sendMessage**: Send a new message to a chat.
- **receiveMessage**: Receive a message from another user in real-time.
- **updateStatus**: Update the online/offline status of a user.

### Notes

- This application is built for educational purposes and can be extended to include more advanced features like group chats, media sharing, etc.
- You can enhance the auto-response feature by integrating a more sophisticated response system (e.g., AI-based responses).
- Ensure to secure the application by implementing proper validation, error handling, and securing sensitive data.

### Contributing

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push to your fork and submit a pull request.

### License

This project is licensed under the MIT License.

---

Feel free to contribute or reach out with questions. Happy coding! 🚀