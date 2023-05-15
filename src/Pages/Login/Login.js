import React from "react";
import "./Login.css";
import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch(setUser(JSON.stringify(result.user)));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
          alt=""
        />
        <h1>Sign in to Slack</h1>
        <p>mfd.slack.com</p>
        <Button onClick={login}>Sign In with Google</Button>
      </div>
    </div>
  );
};

export default Login;
