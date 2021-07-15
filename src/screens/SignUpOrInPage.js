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
          <button class="signInButtonStyle">Logg inn</button>
        </Link>
        <Link to="/SignUpPage">
          <button className="signInButtonStyle">Opprett konto</button>
        </Link>

        <button className="tilbakemeldingButtonStyle">
          Gi oss tilbakemelding
        </button>
      </div>
    </div>
  );
};

export default SignUpOrInPage;
