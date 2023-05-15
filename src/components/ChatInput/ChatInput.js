import React, { useState } from "react";
import "./ChatInput.css";
import { addDoc, collection } from "firebase/firestore";
import { db, timestamp } from "../../firebase";
import { useSelector } from "react-redux";

const ChatInput = ({ channelName, channelId }) => {
  const [input, setInput] = useState("");
  const user = useSelector((state) => state.userInfo.user);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (channelId) {
      await addDoc(collection(db, "rooms", channelId, "messages"), {
        message: input,
        timestamp,
        user: user.displayName,
        userImage: user.photoURL,
      });
    }
    setInput("");
  };

  return (
    <div className="chatInput">
      <form>
        <input
          type="text"
          placeholder={`Message #${channelName?.toLowerCase()}`}
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button type="submit" onClick={sendMessage}></button>
      </form>
    </div>
  );
};

export default ChatInput;
