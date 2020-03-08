import React, { Component } from "react";
import { withAuth } from "../lib/Auth";
import { Link } from "react-router-dom";
import SettingsIcon from "./../images/SettingsIcon.png"

class Main extends Component {
  render() {
    return (
      <div>
        <h1>Main Page</h1>
        <h1>Welcome {this.props.user.username}</h1>
        <br />
        <br />
        <button>New Game</button>
        <button>Load Game</button>
          <Link to='/settings'>
            <img src={SettingsIcon} width='45' height='45'/>
          </Link>
      </div>
    );
  }
}

export default withAuth(Main);
