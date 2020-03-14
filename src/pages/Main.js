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
      <div id="menu">
        
          <Link to='/story'>
            <button className="btn main-btn" onClick={setNewGame}>New Game</button>
          </Link>
        
        <Link to='/settings/saveload'>
          <button className="btn main-btn">Load Game</button>
        </Link>
        
      </div>
    </div>
  )
}

export default withAuth(Main);
