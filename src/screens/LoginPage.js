import React, { useEffect, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { Link, NavLink, Redirect } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "../styles/Homepage.css";
import "../styles/CreateGroup.css";
import "../styles/LoginPage.css";
import "react-datepicker/dist/react-datepicker.css";
import { IoLogoFacebook } from "react-icons/io5";
import { AiFillGoogleCircle } from "react-icons/ai";
import firebase from "../firebase";
import "firebase/auth";
import "firebase/firestore";
import Homepage from "./Homepage";

const LoginPage = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleSignIn = () => {
    clearErrors();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError("Wrong email");
            break;
          case "auth/wrong-password":
            setPasswordError("Wrong password");
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
          <div class="container-center ">
            <section class="container-center">
              <label className="loginTextSmall">
                Login to your existing account
              </label>
              <div>
                <input
                  class="usernameBox"
                  placeholder="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div class="container-centerError">
                  <p className="errorMsg">{emailError}</p>
                </div>
              </div>
              <div>
                <input
                  class="usernameBox"
                  placeholder="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div class="container-centerError">
                  <p className="errorMsg">{passwordError}</p>
                </div>
              </div>

              <text className="loginTextSmall">forgot password?</text>
              <button class="loginButtonStyle" onClick={handleSignIn}>
                Login
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
              {/* <text>{user.displayName}</text> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
