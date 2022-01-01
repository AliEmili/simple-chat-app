import React, { Component } from "react";
import { connect } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import * as AuthActions from "../../Store/Actions/authActions";
import Login from "../Partials/Login";
import Signup from "../Partials/Signup";

function Auth() {
  const location = useLocation();
  return (
    <div className="auth-wrapper">
      {location.pathname === "/signup" ? <Signup /> : <Login />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
