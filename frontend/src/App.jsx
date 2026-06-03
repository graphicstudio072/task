import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import StudyLoginPage from "./StudyLoginPage";
import StudyNavbar from "./StudyNavbar";
import TaskCard from "./TaskCard";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [tasks, setTasks] = useState([
    {
      title: "React Assignment",
      description: "Complete Study Planner UI",
      dueDate: "2026-06-05",
    },
    {
      title: "Database Project",
      description: "Connect MongoDB Backend",
      dueDate: "2026-06-07",
    },
  ]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const addTask = () => {
    const newTask = {
      title,
      description,
      dueDate
    };

    setTasks([
      ...tasks,newTask
    ]);

    setTitle("");
    setDescription("");
    setDueDate("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  if (!isLoggedIn) {
    return <StudyLoginPage setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div
      className={
        isDarkMode
          ? "bg-dark text-light min-vh-100"
          : "bg-light min-vh-100"
      }
    >
      <StudyNavbar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        setIsLoggedIn={setIsLoggedIn}
      />

      <div className="container py-4">
        <div className="card shadow p-4 mb-4">
          <h3 className="mb-3">Add New Task</h3>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="form-control mb-3"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="date"
            className="form-control mb-3"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <button className="btn btn-primary" onClick={addTask}>
            Add Task
          </button>
        </div>

        <div className="row">
          {tasks.map((task, index) => (
            <div className="col-md-4" key={index}>
              <TaskCard
                task={task}
                isDarkMode={isDarkMode}
                deleteTask={() => deleteTask(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;