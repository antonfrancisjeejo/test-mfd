import React, { useEffect, useState } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import { InfoOutlined, StarBorderOutlined } from "@mui/icons-material";
import ChatInput from "../../components/ChatInput/ChatInput";
import Message from "../../components/Message/Message";

const Chat = () => {
  const { roomId } = useParams();

  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    const q = query(doc(db, "rooms", roomId));
    onSnapshot(q, (snapShot) => {
      setRoomDetails(snapShot.data());
    });

    const messageQuery = query(
      collection(db, "rooms", roomId, "messages"),
      orderBy("timestamp", "asc")
    );

    onSnapshot(messageQuery, (snapShot) => {
      setRoomMessages(snapShot.docs.map((doc) => doc.data()));
    });
  }, [roomId]);

  console.log(roomMessages);

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          {roomDetails ? (
            <h4 className="chat__channelName">
              <strong># {roomDetails.name}</strong>
              <StarBorderOutlined />
            </h4>
          ) : (
            <h4>Loading ....</h4>
          )}
        </div>
        <div className="chat__headerRight">
          <p>
            <InfoOutlined /> Details
          </p>
        </div>
      </div>
      <div className="chat__messages">
        {roomMessages.map((data, index) => {
          return <Message key={index} {...data} />;
        })}
      </div>
      <ChatInput channelId={roomId} channelName={roomDetails?.name} />
    </div>
  );
};

export default Chat;
