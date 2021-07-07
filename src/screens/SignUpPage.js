import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "../styles/Homepage.css";
import "../styles/CreateGroup.css";
import "../styles/ModalGroup.css";
import "../styles/LoginPage.css";
import "react-datepicker/dist/react-datepicker.css";
import { IoLogoFacebook } from "react-icons/io5";
import { AiFillGoogleCircle } from "react-icons/ai";
import firebase from "../firebase";
import "firebase/auth";
import "firebase/firestore";

const SignUpPage = () => {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const clearInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleSignUp = () => {
    clearErrors();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        if (userCredentials.user) {
          userCredentials.user.updateProfile({
            displayName: name,
          });
        }
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <div>
      {user ? (
        <Redirect to="/" />
      ) : (
        <div>
          <div class="container">
            <Link to="/SignUpOrInPage">
              <IoIosArrowBack class="IoIosArrowBack"></IoIosArrowBack>
            </Link>
          </div>
          <div class="container-center">
            <section class="container-center">
              <text className="loginTextSmall">Create a new acount</text>
              <input
                class="usernameBox"
                placeholder="full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                class="usernameBox"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="errorMsg">{emailError}</p>
              <input
                class="usernameBox"
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="errorMsg">{passwordError}</p>
              <text className="loginTextSmall">forgot password?</text>
              <button class="loginButtonStyle" onClick={handleSignUp}>
                Create
              </button>
            </section>
            <text className="loginTextSmall">or login with</text>
            <div class="icon-spacebetween">
              <div>
                <IoLogoFacebook
                  class="icon-spacebetween"
                  color="#4267b2"
                  size={54}
                />
                <AiFillGoogleCircle
                  class="icon-spacebetween"
                  color="#DB4437"
                  size={55}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
