const express = require("express");
const cors = require("cors");
// const mongoose = require('mongoose');
const Task = require("./Taks");
const connectDB = require("./dbConnecter");
const app = express();

app.use(express.json());
app.use(cors());

// connect wiht mongodb
connectDB();

app.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();

    res.status(201).json({ message: "Task Added Successfully" });
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).json({ message: "Server error" });
  }
});



app.get("/alltasks", async (req, res) => {
    try {
      const tasks = await Task.find();
      console.log(tasks); // Log tasks to the server console
      res.json(tasks);
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).send("Server Error");
    }
  });
  
 
  app.delete("/delete/:id", async (req, res) => {
    const taskId = req.params.id;
    console.log(taskId)
  
    try {
      // Assuming Task is your Mongoose model
      const deletedTask = await Task.findByIdAndDelete(taskId);
  
      if (deletedTask) {
        console.log(`Task with ID ${taskId} deleted successfully.`);
        res.status(200).send({ message: "Task deleted successfully" });
      } else {
        console.log(`Task with ID ${taskId} not found.`);
        res.status(404).send({ message: "Task not found" });
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).send({ message: "Internal server error" });
    }
  });
  
  app.put("/update/:id", async (req, res) => {
    const taskId = req.params.id;
    const { Title, Description } = req.body;
  
    try {
      // Assuming Task is your Mongoose model
      const updatedTask = await Task.findByIdAndUpdate(taskId, {
        Title,
        Description,
      });
  
      if (updatedTask) {
        console.log(`Task with ID ${taskId} updated successfully.`);
        res.status(200).send({ message: "Task updated successfully" });
      } else {
        console.log(`Task with ID ${taskId} not found.`);
        res.status(404).send({ message: "Task not found" });
      }
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).send({ message: "Internal server error" });
    }
  });

app.listen(3001, () => {
  console.log("app running on port 3001");
});
