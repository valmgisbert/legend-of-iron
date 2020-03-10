import React from "react";
import { withAuth } from "../lib/Auth";
import Logo from "./../images/Logo.png"

function Main(props) {
  return (
    <div className="main-page">
      <div id="logo">
        <img src={Logo} alt="logo"/>
      </div>
      <ul id="menu">
        <li>
          <button className="main-btn" onClick={props.beginStory}>New Game</button>
        </li>
        <li>
          <button className="main-btn">Load Game</button>
        </li>
      </ul>
    </div>
  )
}

export default withAuth(Main);
