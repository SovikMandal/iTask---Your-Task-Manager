import React, { useState, useEffect } from "react";
import Model from "./ui/model"; // Ensure you have a modal component
import { format, isToday, isBefore, isAfter, startOfToday } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [showModel, setShowModel] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [deadline, setDeadline] = useState(null);
  const [comments, setComments] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("Today");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleOpenModel = () => {
    setIsEditing(false);
    setTitle("");
    setPriority("Low");
    setDeadline(null);
    setComments("");
    setShowModel(true);
  };

  const handleEditTask = (index) => {
    const task = tasks[index];
    setTitle(task.title);
    setPriority(task.priority);
    setDeadline(task.deadline);
    setComments(task.comments);
    setEditIndex(index);
    setIsEditing(true);
    setShowModel(true);
  };

  const handleCloseModel = () => setShowModel(false);

  const handleSaveTask = () => {
    if (title.trim() !== "" && deadline) {
      const newTask = { title, priority, deadline, comments, completed: false };
      let updatedTasks = [...tasks];

      if (isEditing) {
        updatedTasks[editIndex] = newTask;
        toast.success("Task updated successfully! ✅");
      } else {
        updatedTasks.push(newTask);
        toast.success("Task added successfully! 🎉");
      }

      setTasks(updatedTasks);
      setShowModel(false);
    } else {
      toast.error("Please enter all fields! ⚠️");
    }
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    toast.info("Task deleted 🗑️");
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], completed: !updatedTasks[index].completed };
    setTasks(updatedTasks);
    toast.success(updatedTasks[index].completed ? "Task completed! ✅" : "Task marked as incomplete ❌");
  };

  const filteredTasks = tasks.filter((task) => {
    const taskDate = new Date(task.deadline);
    if (activeTab === "Today") return isToday(taskDate) && !task.completed;
    if (activeTab === "Pending") return (isAfter(taskDate, startOfToday()) || isToday(taskDate)) && !task.completed;
    if (activeTab === "Overdue") return isBefore(taskDate, startOfToday()) && !task.completed;
    return !task.completed;
  });

  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="p-4 flex flex-col items-center w-full max-w-full">
      {/* Tabs */}
      <div className="flex gap-0.5 flex-wrap justify-center items-center p-4 w-full max-w-3xl">
        {["Today", "Pending", "Overdue"].map((tab, index) => (
          <div
            key={tab}
            className={`p-2 flex-1 text-center cursor-pointer transition-all text-sm sm:text-base md:text-md w-1/3 sm:w-[120px] ${
              activeTab === tab ? "bg-green-800 text-white" : "bg-slate-300"
            } ${index === 0 ? "rounded-l-lg" : ""} ${index === 2 ? "rounded-r-lg" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-3xl space-y-3 sm:space-y-0">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Tasks List</h2>
        <button 
          className="bg-green-700 w-full sm:w-40 px-4 py-2 rounded-md hover:bg-green-800 text-white transition"
          onClick={handleOpenModel}
        >
          + Add Task
        </button>
      </div>

      {/* Active Tasks */}
      <div className="mt-4 bg-gray-100 p-4 rounded-md shadow-md w-full max-w-3xl">
        <h2 className="text-xl font-semibold  mb-2">{activeTab} Tasks</h2>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <div key={index} className="bg-white p-3 rounded-md shadow-sm flex flex-row justify-between items-center">
              {/* Task Details */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(tasks.indexOf(task))}
                  className="h-5 w-5 cursor-pointer accent-green-700"
                />
                <div>
                  <span className="block sm:text-base md:text-lg lg:text-lg font-semibold">{task.title}</span>
                  <span className="text-sm text-gray-500">{task.priority} Priority | Due: {format(task.deadline, "MMMM d, yyyy")}</span>
                </div>
              </div>
              {/* Icons - Always in Right Corner */}
              <div className="flex gap-1 ml-auto sm:ml-0">
                <button onClick={() => handleEditTask(tasks.indexOf(task))}><EditIcon /></button>
                <button onClick={() => handleDeleteTask(tasks.indexOf(task))}><DeleteOutlineIcon/></button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No active tasks.</p>
        )}
      </div>

      {/* Completed Tasks */}
      <div className="mt-4 bg-gray-100 p-4 rounded-md shadow-md w-full max-w-3xl">
        <h2 className="text-lg font-semibold mb-2">Completed Tasks</h2>
        {completedTasks.length > 0 ? (
          completedTasks.map((task, index) => (
            <div key={index} className="bg-white p-3 rounded-md shadow-sm flex flex-row justify-between items-center opacity-60">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(tasks.indexOf(task))}
                  className="h-5 w-5 cursor-pointer accent-green-700"
                />
                <span className="block font-semibold sm:text-base md:text-lg lg:text-lg line-through text-gray-500">{task.title}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No completed tasks.</p>
        )}
      </div>

      {showModel && <Model {...{ setShowModel, handleCloseModel, title, setTitle, priority, setPriority, deadline, setDeadline, comments, setComments, handleSaveTask, isEditing }} />}
    </div>
  );
};

export default Main;
