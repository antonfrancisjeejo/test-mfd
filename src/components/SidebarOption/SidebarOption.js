import React from "react";
import "./SidebarOption.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const SidebarOption = ({ Icon, title, addChannelOption, id }) => {
  const navigate = useNavigate();

  const selectChannel = () => {
    if (id) {
      navigate(`/room/${id}`);
    } else {
      navigate("/");
    }
  };

  const addChannel = async () => {
    const channelName = prompt("Please enter the channel name");
    if (channelName) {
      await addDoc(collection(db, "rooms"), { name: channelName });
    }
  };

  return (
    <div
      className="sidebarOption"
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <h3 className="sidebarOption__channel">
          <span className="sidebarOption__hash"> # </span> {title}
        </h3>
      )}
    </div>
  );
};

export default SidebarOption;
