import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import jwt_decode from "jwt-decode";
import LogoutForm from "./LogoutForm";


// Actions
import * as actionCreators from "./store/actions";

import * as setAuthToken from "./store/actions/authentication"
import * as setCurrentUser from "./store/actions/authentication"

// Components
import Sidebar from "./Sidebar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";
import Signup from "./SignupForm";
import Login from "./LoginForm";

class App extends Component {
  componentDidMount() {
    this.props.fetchAllAuthors();
  }

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="content col-10">
            <Switch>
              <Route path="/authors/:authorID" component={AuthorDetail} />
              <Route path="/authors" component={AuthorsList} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Redirect to="/authors" />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllAuthors: () => dispatch(actionCreators.fetchAuthors()),
checkToken: () => dispatch(actionCreators.checkForExpiredToken())
}
}

export const checkForExpiredToken = () => {
  return dispatch => {
    // Check for token expiration
    const token = localStorage.treasureToken;

    if (token) {
       const currentTime = Date.now() / 1000;

      // Decode token and get user info
      const user = jwt_decode(token);

      // Check token expiration
      if (user.exp >= currentTime) {
        // Set auth token header
        setAuthToken(token);
        // Set user
        dispatch(setCurrentUser(user));
      } else {
        dispatch(LogoutForm());
      }
    }
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
