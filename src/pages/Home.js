import React from 'react';
import Logo from "./../images/Logo.png";

function Home() {
  return (
    <div> 
      <div id="logo">
        <img src={Logo} alt="logo"/>
      </div>
      <br />
      <button>Log in</button>
      <button>Sign up</button>
    </div>
  )
}

export default Home;