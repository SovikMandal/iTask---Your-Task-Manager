import React from "react";
import Datepicker from "./DatePicker";

const Model = ({ 
  setShowModel, 
  handleCloseModel, 
  title, setTitle, 
  priority, setPriority, 
  deadline, setDeadline, 
  comments, setComments, 
  handleSaveTask, 
  isEditing 
}) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn"
      onClick={handleCloseModel} 
    >
      <div 
        className="bg-white rounded-lg p-6 shadow-lg w-[500px] relative mt-20"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Close Button */}
        <button 
          onClick={handleCloseModel} 
          className="absolute top-3 right-6 text-gray-600 hover:text-red-500 text-2xl"
        >
          ✕
        </button>

        {/* Modal Header */}
        <h3 className="text-3xl text-gray-700 font-semibold border-b pb-2">
          {isEditing ? "Edit Task" : "Task Details"}
        </h3>

        {/* Modal Body */}
        <div className="mt-4 space-y-4">
          {/* Task Title */}
          <div>
            <label className="pb-2 block text-sm font-medium text-gray-600">Task Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              placeholder="Enter task title..."
            />
          </div>

          {/* Priority & Deadline */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-600 pb-2">Priority</label>
              <select
                value={priority} 
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              >
                <option>Select Priority</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-600 pb-2">Deadline</label>
              <Datepicker deadline={deadline} setDeadline={setDeadline} />
            </div>
          </div>

          {/* Comments */}
          <div>
            <label className="block text-sm font-medium text-gray-600 pb-2">Comments</label>
            <textarea 
              value={comments} 
              onChange={(e) => setComments(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              placeholder="Add any notes about this task..."
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button 
              onClick={handleCloseModel} 
              className="bg-white text-green-700 h-10 w-32 border border-green-700 rounded-md hover:bg-green-100 transition"
            >
              Close
            </button>
            <button 
              onClick={handleSaveTask}
              className="bg-green-700 text-white h-10 w-32 rounded-md hover:bg-green-800 transition"
            >
              {isEditing ? "Save Changes" : "Add Task"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
