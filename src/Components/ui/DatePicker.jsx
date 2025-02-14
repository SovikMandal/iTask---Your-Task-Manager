import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Datepicker = ({ deadline, setDeadline }) => {
  return (
    <div className="relative w-full">
      <ReactDatePicker
        selected={deadline}
        onChange={(date) => setDeadline(date)}
        dateFormat="MMMM d, yyyy"
        minDate={new Date()} // Prevent past dates
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
        placeholderText="Select deadline"
      />
    </div>
  );
};

export default Datepicker;
