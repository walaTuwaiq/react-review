import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import "./SignUp.css"


export default function SignUp() {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [message, setMessage] = useState("")
  const history = useHistory();

  const changeName = (e) => {
    setNameInput(e.target.value);
  };

  const changeEmail = (e) => {
    setEmailInput(e.target.value);
  };

  const changePass = (e) => {
    setPassInput(e.target.value);
  };

  const createUser = async () => {
    try {
      if(!nameInput || !emailInput || !passInput){
        alert("please enter data!")
        return
      }
      const response = await axios.post("http://localhost:5000/add-user", {
        name: nameInput,
        email: emailInput,
        password: passInput,
      });
      console.log(response.data);
      if(typeof(response.data) == "string"){
        setMessage(response.data)
        return
      }
      if (response.status === 201) {
        history.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-form">
      <h3>Sign up</h3>
      <input
        onChange={(e) => {
          changeName(e);
        }}
        type="text"
        placeholder="Enter name"
      />
      <input
        onChange={(e) => {
          changeEmail(e);
        }}
        type="text"
        placeholder="Enter email"
      />
      <input
        onChange={(e) => {
          changePass(e);
        }}
        type="password"
        placeholder="Enter password"
      />
      <button
        onClick={() => {
          createUser();
        }}
      >
        Sign up
      </button>
      <h3 style={{color:"red"}}>{message}</h3>
      <p>You already have account? <Link to="/login">Log in now</Link></p>
    </div>
  );
}
