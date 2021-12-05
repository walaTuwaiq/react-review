import axios from "axios";
import React, {useState} from "react";
import { Link, useHistory } from 'react-router-dom'
import "./LogIn.css"

export default function LogIn(props) {
  const [errorMessage, setErrorMessage] = useState("")
  const [pass, setPass] = useState("")
  const [email, setEmail] = useState("")
  const history = useHistory()

  const changeEmail = (e)=>{
    setEmail(e.target.value)
  }

  const changePass = (e)=>{
    setPass( e.target.value)
  }

  const logIn= async()=>{
    // console.log(pass);
    // console.log(email);
    
    try {
      if(!email || !pass){
        alert("please enter data!")
        return
      }
      const response = await axios.post("http://localhost:5000/login",{
        email: email,
        password:pass
      })
      if(response.data){
        // console.log(response.data);
        props.setToken(response.data.token)
        
        props.setCurrentName(response.data.payload.userName)
        // console.log(response.data.payload.userName);
        // console.log(errorMessage);
        setErrorMessage("")
        // console.log(errorMessage);
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("currentName", JSON.stringify(response.data.payload.userName))

        history.push("/courses")
      }
    } catch (error) {
      // console.log(error.response);
      setErrorMessage(error.response.data)
    }
  }

  return (
    <div className="login-form">
      <h3>Log in</h3>
      <input placeholder="Enter name" type="text" onChange={changeEmail} />
      <input placeholder="Enter password" type="password" onChange={changePass} />
      <button onClick={()=>{logIn()}} type="submit">Log In</button>
      {/* {errorMessage? <h3 style={{color:"red"}}>{errorMessage}</h3> : ""} */}
      <h3 style={{color:"red"}}>{errorMessage}</h3>
      <p>You don't have account? <Link to="/signup">Sign up now</Link></p>
      
    </div>
  );
}
