import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { useSelector } from "react-redux";
import {
  Add,
  Apps,
  BookmarkBorder,
  Create,
  Drafts,
  ExpandLess,
  ExpandMore,
  FiberManualRecord,
  FileCopy,
  Inbox,
  InsertComment,
  PeopleAlt,
} from "@mui/icons-material";

import SidebarOption from "../SidebarOption/SidebarOption";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";

const Sidebar = () => {
  const user = useSelector((state) => state.userInfo.user);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "rooms"));
    onSnapshot(q, (snapShot) => {
      setChannels(
        snapShot.docs.map((doc) => {
          return {
            id: doc.id,
            name: doc.data().name,
          };
        })
      );
    });
  }, []);

  console.log(channels);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__info">
          <h2>MFD Training</h2>
          <h3>
            <FiberManualRecord /> {user.displayName}
          </h3>
        </div>
        <Create />
      </div>
      <SidebarOption Icon={InsertComment} title="Threads" />
      <SidebarOption Icon={Inbox} title="Mentions & Reactions" />
      <SidebarOption Icon={Drafts} title="Saved items" />
      <SidebarOption Icon={BookmarkBorder} title="Channel browser" />
      <SidebarOption Icon={PeopleAlt} title="People & user groups" />
      <SidebarOption Icon={Apps} title="Apps" />
      <SidebarOption Icon={FileCopy} title="File Browser" />
      <SidebarOption Icon={ExpandLess} title="Show less" />
      <hr />
      <SidebarOption Icon={ExpandMore} title="Channels" />
      <hr />
      <SidebarOption Icon={Add} addChannelOption title="Add Channel" />
      {channels.map((channel) => (
        <SidebarOption key={channel.id} title={channel.name} id={channel.id} />
      ))}
    </div>
  );
};

export default Sidebar;
