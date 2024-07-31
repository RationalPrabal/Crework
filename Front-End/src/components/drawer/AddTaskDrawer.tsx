"use client";

import React, { useState, useEffect } from "react";
import { Drawer } from "antd";
import "./drawer.css";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { createTask } from "@/redux/task/action";

interface DrawerComponentProps {
  open: boolean;
  onClose: () => void;
  status?: string | null;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({
  open,
  onClose,
  status,
}) => {
  const [formValues, setFormValues] = useState({
    description: "",
    priority: "",
    deadline: 0,
    status: status || "",
  });
  const [title, setTitle] = useState("");
  const dispatch: Dispatch<any> = useDispatch();
  useEffect(() => {
    if (status) {
      setFormValues((prevValues) => ({ ...prevValues, status }));
    }
  }, [status]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      deadline: new Date(e.target.value).getTime(),
    }));
  };

  const handleSubmit = () => {
    let data = { ...formValues, title };
    console.log(data);
    dispatch(createTask(data));
    onClose();
  };

  return (
    <Drawer width={650} title="Basic Drawer" onClose={onClose} open={open}>
      <div className="drawerHeader">
        <div>
          <img src="./close.svg" alt="close icon" onClick={onClose} />
          <img src="./maximize.svg" alt="maximize icon" />
        </div>
        <div>
          <div>
            <p>Share</p>
            <img src="./share.svg" alt="share icon" />
          </div>
          <div>
            <p>Favorite</p>
            <img src="./fav.svg" alt="favorite icon" />
          </div>
        </div>
      </div>
      <div className="drawerBody">
        <div className="drawerBodyTitle">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="drawerBodyForm">
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <div>
                <img src="./status.svg" />
                <label htmlFor="status">Status</label>
              </div>
              <select
                name="status"
                value={formValues.status}
                onChange={handleChange}
              >
                <option value="">Not selected</option>
                <option value="toDo">To do</option>
                <option value="inProgress">In progress</option>
                <option value="underReview">Under review</option>
                <option value="finished">Finished</option>
              </select>
            </div>
            <div>
              <div>
                <img src="./priority.svg" />
                <label htmlFor="priority">Priority</label>
              </div>
              <select
                name="priority"
                value={formValues.priority}
                onChange={handleChange}
              >
                <option value="">Not selected</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            <div>
              <div>
                <img src="./calender.svg" />
                <label htmlFor="deadline">Deadline</label>
              </div>
              <input
                type="date"
                name="deadline"
                value={formValues.deadline}
                onChange={handleDateChange}
              />
            </div>
            <div>
              <div>
                <img src="./pencil.svg" />
                <label htmlFor="description">Description</label>
              </div>
              <input
                placeholder="Not added"
                name="description"
                value={formValues.description}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="drawerFooter">
        <button type="button" onClick={handleSubmit} className="addTaskBtn">
          Save
        </button>
      </div>
    </Drawer>
  );
};

export default DrawerComponent;