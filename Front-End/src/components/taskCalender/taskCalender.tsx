"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./taskCalender.css";
import { useSelector } from "react-redux";
import moment from "moment";

// Define Task interface
interface Task {
  _id: string;
  title: string;
  deadline: number;
}

// Type definition for ValuePiece, assuming it is a Date or null
type ValuePiece = Date | null;

// Define the type for the Value parameter
type Value = Date | [ValuePiece, ValuePiece] | null;

const TaskCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const tasks = useSelector((state: any) => state.task.tasks);

  // Correctly handle the onChange value type, including ranges
  const handleDateChange = (value: Value) => {
    if (Array.isArray(value)) {
      // Handle date range
      setSelectedDate(value[0] || null); // Use the start date of the range
    } else {
      // Handle single date or null
      setSelectedDate(value);
    }
  };

  // Filter tasks based on the selected date
  const tasksForSelectedDate = selectedDate
    ? tasks.filter((task: Task) =>
        moment(task.deadline).isSame(selectedDate, "day")
      )
    : [];

  return (
    <div className="taskCalendar">
      <Calendar onChange={handleDateChange} value={selectedDate} />
      <div className="taskList">
        <h3>
          Tasks for {selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : "Select a date"}
        </h3>
        {tasksForSelectedDate.length ? (
          tasksForSelectedDate.map((task: Task) => (
            <div key={task._id} className="taskItem">
              <p>{task.title}</p>
            </div>
          ))
        ) : (
          <p>No tasks for this date.</p>
        )}
      </div>
    </div>
  );
};

export default TaskCalendar;
