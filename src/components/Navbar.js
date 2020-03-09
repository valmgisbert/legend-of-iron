import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../lib/Auth";
import SettingsIcon from "./../images/SettingsIcon.png"

class Navbar extends Component {
  render() {
    const { user, logout, isLoggedIn } = this.props;

    return (
      <nav className="navbar">
        <Link to={"/"} id="home-btn">
          <h4>Home</h4>
        </Link>
        {isLoggedIn ? (
          <>
            <p>username: {user.username}</p>
            <button onClick={logout}>Logout</button>
            <Link to='/settings'>
              <img src={SettingsIcon} width='45' height='45'/>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              {" "}
              <button className="navbar-button">Login</button>{" "}
            </Link>
            <br />
            <Link to="/signup">
              {" "}
              <button className="navbar-button">Sign Up</button>{" "}
            </Link>
          </>
        )}
      </nav>
    );
  }
}

export default withAuth(Navbar);
