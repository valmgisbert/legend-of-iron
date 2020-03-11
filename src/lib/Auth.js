//	lib/Auth.js

import React, { Component } from "react";
import authService from "./auth-service"; // IMPORT functions for axios requests to API
import { withRouter } from 'react-router-dom';
const { Consumer, Provider } = React.createContext();

// HOC (withAuth) to create a Consumer
const withAuth = WrappedComponent => {
  return class extends Component {
    render() {
      return (
        <Consumer>
          {({ login, signup, logout, user, isLoggedIn, currentGameIndex, setCurrentGameIndex }) => {
            return (
              <WrappedComponent
                user={user}
                isLoggedIn={isLoggedIn}
                login={login}
                signup={signup}
                logout={logout}
                currentGameIndex={currentGameIndex}
                setCurrentGameIndex={setCurrentGameIndex}
                {...this.props}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

/* 
// HOC - function component example of the same functionality
function withAuthFunc(WrappedComponent) {
  return function(props) {
    // props will belong to the WrappedComponent
    return (
      <Consumer> //the value is the one coming from the provider
        {value => <WrappedComponent {...value} {...props} />}
      </Consumer>
    );
  };
}
 */

// Provider
class AuthProvider extends React.Component { 
  state = { //contain data about Auth
    isLoggedIn: false,
    user: null, //bc when you're not logged in, there's no info
    isLoading: true, //useful for when the app starts and no data has bbeen pulled
    currentGameIndex: 0 //the index of the game to call in the save 
  };

  //this makes a req to the backend '/me' and gets data from the user by promise
  componentDidMount() {
    authService
      .me()
      .then(user => //this will work only if you have a cookie
        //you update the state with the data pulled from the backend
        this.setState({ isLoggedIn: true, user: user, isLoading: false })
      )
      .catch(err =>
        this.setState({ isLoggedIn: false, user: null, isLoading: true })
      );
  }

  signup = (username, password, studentName, cohort) => {
    authService
      .signup({ username, password, studentName, cohort })
      .then(user => this.setState({ isLoggedIn: true, user }))
      .catch(err => console.log(err));
  };

  login = (username, password) => {
    authService
      .login({ username, password })
      .then(user => this.setState({ isLoggedIn: true, user }))
      .catch(err => console.log(err));
  };

  logout = () => {
    authService
      .logout()
      .then(() => this.setState({ isLoggedIn: false, user: null , currentGameIndex: 0}))
      .catch(err => console.log(err));
  };

  //every time you advance in the game you set that index in the provider
  setCurrentGameIndex = (index, shouldGoToStory) => {
    this.setState({currentGameIndex: index}, () => {
      if (shouldGoToStory) {
        this.props.history.push('/story')
      }
    })
  }

  render() {
    //since we call them by this.func, we can desconstruct to make it shorter
    const { isLoading, isLoggedIn, user, currentGameIndex } = this.state;
    const { login, logout, signup, setCurrentGameIndex } = this;

    return (
      <Provider value={{ isLoading, isLoggedIn, user, login, logout, signup, currentGameIndex, setCurrentGameIndex}}>
        {this.props.children}
      </Provider>
    );
    /*
      <Provider> `value={}` data will be available to all <Consumer> components 
    */
  }


}
const AuthProviderWRouter= withRouter(AuthProvider)

export { withAuth, AuthProviderWRouter };

//      Consumer ,  Provider
