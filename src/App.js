import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Chat from "./Pages/Chat/Chat";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { setUser } from "./slices/userSlice";
import "./App.css";

const App = () => {
  const user = useSelector((state) => state.userInfo.user);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(setUser(JSON.stringify(user)));
    });
  }, []);

  return (
    <BrowserRouter>
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <div className="app">
            <Sidebar />
            <Routes>
              <Route path="/room/:roomId" element={<Chat />} />
              <Route path="/" element={<h1>Welcome to Slack</h1>} />
            </Routes>
          </div>
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
