"use client";

import React, { useEffect, useState } from "react";
import NavElements from "../navElements/navElements";
import CreateTaskBtn from "../buttons/CreateTaskBtn";
import AddTaskDrawer from "../drawer/AddTaskDrawer";
import { navData } from "@/data/data";
import "./Sidebar.css";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getUserDetails, logout } from "@/redux/auth/action";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);
 const { name } = useSelector((store: RootState) => store.auth.user);
 const dispatch:Dispatch<any>= useDispatch()
  const handleCreateTaskClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
dispatch(getUserDetails())
  },[])

  return (
    <div className="sidebar">
      <div className="sidebarTopSection">
        <div className="sidebarUserDetails">
          <div>
            <img src={"./userprofile.jpg"} alt="User Profile" />
          </div>
          <p>{name}</p>
        </div>
        <div className="sidebarLogout">
          <div className="sidebarIcons">
            <div>
              <img src="./notif.svg" alt="Notification" />
            </div>
            <div>
              <img src="./loading.svg" alt="Loading" />
            </div>
            <div>
              <img src="./arrow.svg" alt="Arrow" />
            </div>
          </div>
          <button className="sidebarLogoutBtn" onClick={()=>{dispatch(logout())}}>Logout</button>
        </div>
        <div className="sidebarNav">
          {navData?.map((elem, i) => (
            <NavElements title={elem.title} iconPath={elem.iconPath} key={i} />
          ))}
        </div>
        <CreateTaskBtn
          title="Create new task"
          iconPath="./plus.svg"
          onClick={handleCreateTaskClick}
          style={{ height: "50px" }}
        />
      </div>
      <div className="downBtn">
        <div>
          <img src="./download.svg" />
        </div>
        <div>
          <h1>Download the app</h1>
          <p>Get the full experience </p>
        </div>
      </div>
      <AddTaskDrawer open={open} onClose={handleClose} />
    </div>
  );
};

export default Sidebar;
