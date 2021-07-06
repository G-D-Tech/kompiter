import React, { useState, useEffect } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "../styles/Homepage.css";
import "../styles/CreateGroup.css";
import "../styles/LoginPage.css";
import "react-datepicker/dist/react-datepicker.css";
import firebase from "../firebase";
import "firebase/auth";
import "firebase/firestore";

const SignUpOrInPage = () => {
  const [currentUser, setCurrentUser] = useState("");

  const ref = firebase.firestore().collection("groups");

  const handleLogOut = () => {
    firebase.auth().signOut();
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser("");
      }
    });
  }, []);

  return (
    <div>
      <div class="container">
        <Link to="/">
          <IoIosArrowBack class="IoIosArrowBack"></IoIosArrowBack>
        </Link>
      </div>
      <div class="container-centerProfile ">
        <BsFillPersonFill color="black" size={70} />
        <label class="displayNameHeader">{currentUser.displayName}</label>
      </div>
    </div>
  );
};

export default SignUpOrInPage;
