import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "../styles/Homepage.css";
import "../styles/CreateGroup.css";
import "../styles/LoginPage.css";
import "react-datepicker/dist/react-datepicker.css";

import firebase from "../firebase";
import React, { useState, useEffect } from "react";

const SignUpOrInPage = () => {
  return (
    <div>
      <div className="container">
        <Link to="/">
          <IoIosArrowBack className="IoIosArrowBack"></IoIosArrowBack>
        </Link>
      </div>
      <div className="container-center ">
        <Link to="/LoginPage">
          <button className="signInButtonStyle">Log in</button>
        </Link>
        <Link to="/SignUpPage">
          <button className="signInButtonStyle">Sign up</button>
        </Link>
      </div>
    </div>
  );
};

export default SignUpOrInPage;
