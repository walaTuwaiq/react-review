import React from 'react'
import { Link } from 'react-router-dom'
import "./NavBar.css"

export default function NavBar(props) {
    return (
        <div>

            {props.token? (
                <ul id="nav-bar">
                <Link to="/courses" className="link-li">
                    <li>
                        Courses
                    </li>
                </Link>
                <Link to="/login">
                    <li onClick={()=>{props.setToken("")
                        localStorage.setItem("token", JSON.stringify(""))}}>
                        Log out
                    </li>
                </Link>
            </ul>
            ) : (
                <ul id="nav-bar">
                <Link to="/login" className="link-li">
                    <li>
                    Log In
                    </li>
                </Link>
                <Link to="/signup" className="link-li">
                    <li>
                    Sign Up
                    </li>
                </Link>
            </ul>
            ) }
            
        </div>
    )
}
