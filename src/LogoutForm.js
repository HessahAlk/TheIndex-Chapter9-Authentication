import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as actionCreators  from './store/actions'
import { connect } from 'react-redux'


const Logout = props => {
  return (
    <button className="btn btn-danger" onClick={props.logout}>
      Logout {props.user.username}
    </button>
  );
};

const mapStateToProps = state => ({
  user: state.rootAuth.user
});
const mapDispatchToProps = dispatch => ({
logout: () => dispatch(actionCreators.logout())
});
export default connect(mapStateToProps,mapDispatchToProps)(Logout);
