require("dotenv").config();

const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const cors = require ("cors");
const connectDB = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/tasks",taskRoutes);

app.get("/",(req,res)=>{
    res.send("Task Manager API is running!");
});

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});
