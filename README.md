Task Manager
A clean and responsive full-stack Task Manager application built with
React, Node.js, Express, MongoDB, and Mongoose.
The application allows users to create, view, edit, complete, and delete
tasks. It demonstrates how a React frontend communicates with a REST API
and stores persistent data in MongoDB.
Features
- Add new tasks
- View all tasks
- Mark tasks as completed or incomplete
- Edit existing tasks
- Delete tasks
- Prevent empty task submission
- Press Enter to add a task
- Press Enter to save an edited task
- Press Escape to cancel editing
- Persistent task storage using MongoDB
- RESTful backend API
- Responsive and clean user interface
- Frontend and backend separated into independent applications
Tech Stack
Frontend
- React
- Vite
- JavaScript
- HTML
- CSS
Backend
- Node.js
- Express.js
- REST API
- CORS
- dotenv
Database
- MongoDB Atlas
- Mongoose
Development & Deployment
- Git
- GitHub
- Postman
- Vercel --- frontend deployment
- Render --- backend deployment
How It Works
User
  |
  v
React Frontend
  |
  | HTTP Requests
  v
Express REST API
  |
  | Mongoose
  v
MongoDB Atlas
The React frontend sends HTTP requests to the Express backend. The
backend processes those requests and uses Mongoose to create, read,
update, and delete task documents in MongoDB.
Project Structure
todo-fullstack/
│
├── backend/
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── public/
    ├── package.json
    └── package-lock.json
.env files contain private configuration and should never be
committed to GitHub.

REST API
The backend exposes the following endpoints:
  Method   Endpoint           Description
  GET      /api/tasks       Get all tasks
  POST     /api/tasks       Create a new task
  PATCH    /api/tasks/:id   Update a task
  DELETE   /api/tasks/:id   Delete a task
Example Task
{
  "title": "Learn Express",
  "completed": false
}
Getting Started
1. Clone the Repository
git clone https://github.com/Rajivdevx/todo-fullstack.git
cd todo-fullstack
2. Backend Setup
Open a terminal:
cd backend
npm install
Create a .env file inside the backend folder:
MONGO_URI=your_mongodb_connection_string
PORT=5000
Start the backend:
node server.js
The API will run locally at:
http://localhost:5000
3. Frontend Setup
Open another terminal:
cd frontend
npm install
Create a frontend environment file:
VITE_API_URL=http://127.0.0.1:5000
Start the React development server:
npm run dev
The frontend will normally be available at:
http://localhost:5173
Environment Variables
Backend
MONGO_URI=your_mongodb_connection_string
PORT=5000
Frontend
VITE_API_URL=http://127.0.0.1:5000
For production, replace the local API URL with the deployed backend URL.
Never upload your MongoDB connection string, database password, or
other secrets to GitHub.
MongoDB
This project uses MongoDB Atlas as the cloud database.
Mongoose is used on the backend to:
- Connect to MongoDB
- Define the Task schema
- Create task documents
- Read tasks
- Update tasks
- Delete tasks
The Task model contains:
title       → String
completed   → Boolean
createdAt   → Date
updatedAt   → Date
Deployment
The project is designed to use:
- Vercel for the React frontend
- Render for the Express backend
- MongoDB Atlas for the database
Production architecture:
React / Vercel
      |
      | HTTPS API Requests
      v
Node.js + Express / Render
      |
      | Mongoose
      v
MongoDB Atlas
Deployment Notes
Before deploying the backend, make sure the Express server listens on
the host provided by the hosting platform:
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
The frontend should use the deployed backend URL through VITE_API_URL
rather than a hardcoded localhost address.
Testing
The REST API was tested during development using Postman.
The following operations were tested:
- Create task
- Get tasks
- Update task
- Mark task as completed
- Mark task as incomplete
- Delete task
What I Learned
This project helped me practice:
- React components and state management
- React useState and useEffect
- Handling forms and user input
- Calling REST APIs using fetch()
- CRUD operations
- Express routing
- Middleware
- MongoDB and Mongoose
- REST API design
- Environment variables
- Frontend/backend communication
- Git and GitHub workflow
- API testing with Postman
- Full-stack application deployment
Future Improvements
Possible improvements for future versions:
- User authentication and authorization
- User-specific task lists
- Task categories
- Task priorities
- Due dates and reminders
- Search and filtering
- Dark mode
- Drag-and-drop task ordering
- Better error notifications
- Loading states
- Pagination for large task lists
Screenshots
Add screenshots of the application here after deployment.
Example:
screenshots/
├── task-manager-home.png
├── add-task.png
└── edit-task.png
You can then display them in this section using Markdown:
![Task Manager](screenshots/task-manager-home.png)
Author
Rajiv Ram Das
BTech Information Technology Student | Full-Stack Development Learner
- GitHub: [Rajivdevx](https://github.com/Rajivdevx)
- LinkedIn: [Rajiv Ram Das](https://www.linkedin.com/in/rajiv-ram-das-4513b6425/)

⭐ If you found this project useful, consider giving it a star!