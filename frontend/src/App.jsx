import "./App.css";
import { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  // Edit states
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  // Get tasks from backend
  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/tasks`
        );

        if (!response.ok) {
          throw new Error("Failed to load tasks");
        }

        const data = await response.json();

        setTasks(data);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    };

    getTasks();
  }, []);

  // Add task
  const addTask = async () => {
    if (!title.trim()) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: title.trim()
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const data = await response.json();

      setTasks([...tasks, data]);
      setTitle("");
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/api/tasks/${id}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // Complete / uncomplete task
  const toggleTask = async (id, completed) => {
    try {
      const response = await fetch(
        `${API_URL}/api/tasks/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            completed: !completed
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();

      setTasks(
        tasks.map((task) =>
          task._id === id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  // Start editing
  const startEdit = (task) => {
    setEditingId(task._id);
    setEditingTitle(task.title);
  };

  // Save edited task
  const saveEdit = async (id) => {
    if (!editingTitle.trim()) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/tasks/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: editingTitle.trim()
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit task");
      }

      const updatedTask = await response.json();

      setTasks(
        tasks.map((task) =>
          task._id === id ? updatedTask : task
        )
      );

      setEditingId(null);
      setEditingTitle("");
    } catch (error) {
      console.error("Failed to edit task:", error);
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  return (
    <div className="app">
      <div className="task-container">

        <h1>Task Manager</h1>

        <p className="subtitle">
          Stay organized and get things done
        </p>

        {/* Add task */}
        <div className="add-task">
          <input
            type="text"
            placeholder="Enter a task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />

          <button className="add-button" onClick={addTask}>
            + Add Task
          </button>
        </div>

        {/* Task list */}
        <div className="task-list">

          {tasks.map((task) => (
            <div className="task-item" key={task._id}>

              <div className="task-content">

                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    toggleTask(task._id, task.completed)
                  }
                />

                {editingId === task._id ? (
                  <input
                    className="edit-input"
                    type="text"
                    value={editingTitle}
                    onChange={(e) =>
                      setEditingTitle(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveEdit(task._id);
                      }

                      if (e.key === "Escape") {
                        cancelEdit();
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <span
                    className={
                      task.completed ? "completed" : ""
                    }
                  >
                    {task.title}
                  </span>
                )}

              </div>

              <div className="task-actions">

                {editingId === task._id ? (
                  <>
                    <button
                      className="save-button"
                      onClick={() => saveEdit(task._id)}
                    >
                      Save
                    </button>

                    <button
                      className="cancel-button"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-button"
                      onClick={() => startEdit(task)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </>
                )}

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default App;