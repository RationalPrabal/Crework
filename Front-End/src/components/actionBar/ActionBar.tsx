"use client";

import React, { useState } from "react";
import { Dropdown, Menu, Modal, Button } from "antd";
import "./ActionBar.css";
import CreateTaskBtn from "../buttons/CreateTaskBtn";
import AddTaskDrawer from "../drawer/AddTaskDrawer";
import TaskCalendar from "../taskCalender/taskCalender";
interface ActionBarProps {
  setSearchQuery: (query: string) => void;
  setFilter: (filter: { priority?: string; deadline?: string }) => void;
}

const ActionBar: React.FC<ActionBarProps> = ({ setSearchQuery, setFilter }) => {
  const [open, setOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
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
      <Menu.ItemGroup title="Priority">
        <Menu.Item key="Low-">Low</Menu.Item>
        <Menu.Item key="Medium-">Medium</Menu.Item>
        <Menu.Item key="Urgent-">Urgent</Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup title="Deadline">
        <Menu.Item key="-today">Ending today</Menu.Item>
        <Menu.Item key="-missed">Ended already</Menu.Item>
      </Menu.ItemGroup>
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
        <div className="actionBtn" onClick={() => setCalendarOpen(true)}>
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
      <Modal
        title="Calendar"
        visible={calendarOpen}
        onCancel={() => setCalendarOpen(false)}
        footer={[
          <Button key="close" onClick={() => setCalendarOpen(false)}>
            Close
          </Button>,
        ]}
      >
        <TaskCalendar />
      </Modal>
    </div>
  );
};

export default ActionBar;
