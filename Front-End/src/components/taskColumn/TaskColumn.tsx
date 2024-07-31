"use client";

import React, { useState } from "react";
import "./TaskColumn.css";
import SingleTask from "../singleTask/SingleTask";
import AddTaskDrawer from "../drawer/AddTaskDrawer";
import AddTask from "../buttons/AddTask";
import DropArea from "../dropArea/DropArea";

interface Task {
  title: string;
  description?: string;
  priority?: string;
  deadline?: number;
  createdAt: number;
  status: string;
  _id: string;
}

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  status: string;
  setActiveCard: (_id: string | null) => void;
  onDrop: (status: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  tasks,
  status,
  setActiveCard,
  onDrop,
}) => {
  const [open, setOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<string | null>(null);

  const handleOpen = (status: string) => {
    setCurrentStatus(status);
    setOpen(true);
    console.log(status);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentStatus(null);
  };

  return (
    <div className="taskColumn">
      <div className="taskColumnHeader">
        <p>{title}</p> <img src="./hamburger.svg" alt={title} />
      </div>
      <DropArea onDrop={() => onDrop(status)} />
      <div className="taskContainer">
        {tasks?.filter((task) => task.status === status)
          .map((task, i) => (
            <React.Fragment key={i}>
              <SingleTask
                title={task.title}
                status={task.status}
                description={task.description }
                priority={task.priority}
                deadline={task.deadline }
                createdAt={task.createdAt}
                _id={task._id}
                setActiveCard={setActiveCard}
              />
              <DropArea onDrop={() => onDrop(status)} />
            </React.Fragment>
          ))}
      </div>
      <AddTask
        title="Add task"
        iconPath="./add.svg"
        onClick={() => handleOpen(status)}
        status={status}
      />
      <AddTaskDrawer open={open} onClose={handleClose} status={currentStatus} />
    </div>
  );
};

export default TaskColumn;
