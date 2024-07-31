import React from "react";
import "./Header.css";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Header: React.FC = () => {
  const { name } = useSelector((store: RootState) => store.auth.user);
  return (
    <div className="header">
      <p>Good morning,{name?.split(" ")[0]}</p>
      <div>
        <p>Help & feedback</p>
        <img src="./help.svg" alt="Help" />
      </div>
    </div>
  );
};

export default Header;
