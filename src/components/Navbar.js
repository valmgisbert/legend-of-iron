import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../lib/Auth";
import SettingsIcon from "./../images/SettingsIcon.png"
import HomeIcon from "./../images/HomeIcon.png"
import LogOut from "./../images/LogOut.png"

class Navbar extends Component {
  render() {
    const { user, logout, isLoggedIn } = this.props;

    return (
      <nav className="navbar">
        <Link to={"/"} id="home-btn">
          <img src={HomeIcon} alt='home' width='45' height='45'/>
        </Link>
        {isLoggedIn ? (
          <>
            <div className="logged-items">
              <p>username: {user.username}</p>
              <button className='fake-btn' onClick={logout}>
                <img src={LogOut} alt='logout' width='45' height='45'/>
              </button>
              <Link to='/settings'>
                <img src={SettingsIcon} alt='settings' width='45' height='45'/>
              </Link>
            </div>
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
