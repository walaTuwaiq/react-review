// import logo from './logo.svg';
// import './App.css';
import { Route } from "react-router";
import React, { useState, useEffect } from "react";
import Courses from "./components/Courses";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";

function App() {
  const [token, setToken] = useState("");
  const [currentName, setCurrentName] = useState("");

  // if(JSON.parse(localStorage.getItem("token"))){
  //   setToken(JSON.parse(localStorage.getItem("token")))
  // }

  // console.log(token);
  useEffect(() => {
    // console.log(token, "token");
    // console.log(currentName, "currentName");
    if (!token) {
      const localStorageToken = JSON.parse(localStorage.getItem("token"));
      setToken(localStorageToken);
    }

    if (!currentName) {
      const localStorageCurrentName = JSON.parse(
        localStorage.getItem("currentName")
      );
      setCurrentName(localStorageCurrentName);
    }
    // console.log(token, "tokentoken");
    // console.log(currentName, "currentNamecurrentName");
  }, []);

  return (
    <div>
      <NavBar token={token} setToken={setToken} />
      <Route
        path="/courses"
        render={() => {
          return <Courses token={token} currentName={currentName} />;
        }}
      />
      <Route
        path="/login"
        render={() => {
          return (
            <LogIn
              setToken={setToken}
              setCurrentName={setCurrentName}
              token={token}
            />
          );
        }}
      />
      <Route path="/signup" component={SignUp} />
    </div>
  );
}

export default App;
