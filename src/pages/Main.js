import React from "react";
import { withAuth } from "../lib/Auth";
import Logo from "./../images/Logo.png"
import {Link} from "react-router-dom";

function Main(props) {
  const setNewGame = () => {
    const redirectToStory = true
    props.setCurrentGameIndex(0, redirectToStory);
  }

  return (
    <div className="main-page">
      <div id="logo">
        <img src={Logo} alt="logo"/>
      </div>
      <ul id="menu">
        <li>
          <Link to='/story'>
            <button className="main-btn" onClick={setNewGame}>New Game</button>
          </Link>
        </li>
        <li>
          <button className="main-btn">Load Game</button>
        </li>
      </ul>
    </div>
  )
}

export default withAuth(Main);
