import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "../styles/Homepage.css";
import "../styles/CreateGroup.css";
import "../styles/LoginPage.css";
import "react-datepicker/dist/react-datepicker.css";

import firebase from "../firebase";

const SignUpOrInPage = () => {
  return (
    <div>
      <div class="container">
        <Link to="/">
          <IoIosArrowBack class="IoIosArrowBack"></IoIosArrowBack>
        </Link>
      </div>
      <div class="container-center ">
        <Link to="/LoginPage">
          <button class="signInButtonStyle">Log in</button>
        </Link>
        <Link to="/SignUpPage">
          <button class="signInButtonStyle">Sign up</button>
        </Link>
      </div>
    </div>
  );
};

export default SignUpOrInPage;
