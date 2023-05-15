import React from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { AccessTime, HelpOutline, Search } from "@mui/icons-material";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { logout } from "../../slices/userSlice";

const Header = () => {
  const user = useSelector((state) => state.userInfo.user);
  const dispatch = useDispatch();

  const handleClick = async () => {
    await signOut(auth);
    dispatch(logout());
  };

  return (
    <div className="header">
      <div className="header__left">
        <div onClick={handleClick}>
          <Avatar className="header__avatar" src={user.photoURL} />
        </div>
        <AccessTime />
      </div>
      <div className="header__search">
        <Search />
        <input type="text" placeholder="Search in MFD" />
      </div>
      <div className="header__right">
        <HelpOutline />
      </div>
    </div>
  );
};

export default Header;
