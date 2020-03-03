import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../lib/Auth";

class Signup extends Component {
  state = { username: "", password: "", studentName: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password, studentName } = this.state;

    this.props.signup(username, password, studentName);
    //this will call func.provider 
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <h1>Sign Up</h1>

        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />

          {/* <label>Student Name:</label>
          <input
            type="text"
            name="studentName"
            value={studentName}
            onChange={this.handleChange}
          /> */}

          {/* <label>Choose your cohort:</label>
          <input
            type="radio"
            name="cohort"
            value="ux/ui"> UX/UI </input>
          <input
            type="radio"
            name="cohort"
            value="web"> Web Dev </input>
          <input
            type="radio"
            name="cohort"
            value="data"> Data </input> */}

          <input type="submit" value="Signup" />
        </form>

        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    );
  }
}

export default withAuth(Signup);
//once you wrap in HOC, its values will be in props
