"use client";
import React, { useState } from "react";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./ActionBar.css";
import CreateTaskBtn from "../buttons/CreateTaskBtn";
import AddTaskDrawer from "../drawer/AddTaskDrawer";

interface ActionBarProps {
  setSearchQuery: (query: string) => void;
  setFilter: (filter: { priority?: string; deadline?: string }) => void;
}

const ActionBar: React.FC<ActionBarProps> = ({ setSearchQuery, setFilter }) => {
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleCreateTaskClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    setSearchQuery(value);
  };

  const handleMenuClick = (e: any) => {
    const { key } = e;
    if (key === "all-") {
      setFilter({});
    } else {
      const [priority, deadline] = key.split("-");
      setFilter({ priority, deadline });
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Low-">Low</Menu.Item>
      <Menu.Item key="Medium-">Medium</Menu.Item>
      <Menu.Item key="Urgent-">Urgent</Menu.Item>
      <Menu.Item key="-today">Deadline Today</Menu.Item>
      <Menu.Item key="-missed">Deadline Missed</Menu.Item>
      <Menu.Item key="-no-deadline">No Deadline</Menu.Item>
      <Menu.Item key="all-">All</Menu.Item>
    </Menu>
  );

  return (
    <div className="actionBar">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={handleSearch}
        />
        <img src="./search.svg" />
      </div>
      <div className="otherActions">
        <div className="actionBtn">
          <p>Calendar</p>
          <img src="./calender.svg" />
        </div>
        <div className="actionBtn">
          <p>Automation</p>
          <img src="./stars.svg" />
        </div>
        <div className="actionBtn">
          <Dropdown overlay={menu} trigger={["hover"]}>
            <a onClick={(e) => e.preventDefault()}>
              <p>Filter</p> <img src="./filter.svg" />
            </a>
          </Dropdown>
        </div>
        <div className="actionBtn">
          <p>Share</p>
          <img src="./share.svg" />
        </div>
        <CreateTaskBtn
          title="Create task"
          iconPath="./plus.svg"
          onClick={handleCreateTaskClick}
          style={{ height: "40px" }}
        />
        <AddTaskDrawer open={open} onClose={handleClose} />
      </div>
    </div>
  );
};

export default ActionBar;
