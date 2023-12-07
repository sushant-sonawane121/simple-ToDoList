import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);


  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/alltasks");
      const data = response.data;

      if (data && data.length > 0) {
        setTasks(data);
      } else {
        console.log("No data received from the server.");
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  // delete task
  const deleteData = async (id) => {
    try {
      // Send a DELETE request with the ID as a parameter
      const response = await axios.delete(`http://localhost:3001/delete/${id}`);
  
      // Check if the deletion was successful
      if (response.status === 200) {
        console.log(`Data with ID ${id} deleted successfully.`);
        fetchData();
        
        // Optionally, you may want to fetch the updated data after deletion
        // fetchData();
      } else {
        console.log(`Failed to delete data with ID ${id}.`);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // update task
  const updateData = async (id, newTitle, newDescription) => {
    try {
      const response = await axios.put(`http://localhost:3001/update/${id}`, {
        Title: newTitle,
        Description: newDescription,
      });

      if (response.status === 200) {
        console.log(`Task with ID ${id} updated successfully.`);
        fetchData();
      } else {
        console.log(`Failed to update task with ID ${id}.`);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  

  useEffect(() => {
   

    console.log("Fetching data...");
    fetchData();
    
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const title = e.target[0].value;
      const description = e.target[1].value;

      const response = await axios.post("http://localhost:3001/", {
        Title: title,
        Description: description,
      });

      console.log("Task added successfully:", response.data);
      // After adding a new task, fetch the updated list of tasks
      fetchData();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateHandler = async (taskId) => {
    // Implement logic to get updated values (e.g., from user input)
    const newTitle = prompt("Enter new title:");
    const newDescription = prompt("Enter new description:");

    // Check if the user clicked "Cancel"
    if (newTitle === null || newDescription === null) {
      console.log("Update canceled by user.");
      return;
    }

    // Call the updateData function
    updateData(taskId, newTitle, newDescription);
    
    
  };

  const deleteHandler = async (taskId) => {
    // Implement delete logic here
    
    deleteData(taskId);
    
    // console.log("Delete task with ID:", taskId);
  };

  return (
    <section className="app-section">
      <div className="section-container">
        <div className="input-container">
          <form onSubmit={submitHandler}>
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="Description" />
            <button type="submit">Add</button>
          </form>
        </div>
        <div className="lists-container">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div className="list" key={task._id}>
                <h2>{task.Title}</h2>
                <p>{task.Description}</p>
                <div className="list-buttons">
                  <button
                    type="button"
                    className="update-btn"
                    onClick={() => updateHandler(task._id)}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => deleteHandler(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No tasks available.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default App;
