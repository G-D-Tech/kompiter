import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
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

  return (
    <div>
      {user ? (
        <Redirect to="/" />
      ) : (
        <div>
          <div className="container">
            <Link to="/SignUpOrInPage">
              <IoIosArrowBack className="IoIosArrowBack"></IoIosArrowBack>
            </Link>
          </div>
          <div className="container-center ">
            <section className="container-center">
              <label className="loginTextSmall">
                Login to your existing account
              </label>
              <div>
                <input
                  className="usernameBox"
                  placeholder="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="container-centerError">
                  <p className="errorMsg">{emailError}</p>
                </div>
              </div>
              <div>
                <input
                  className="usernameBox"
                  placeholder="password"
                  required
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="container-centerError">
                  <p className="errorMsg">{passwordError}</p>
                </div>
              </div>

              <label className="loginTextSmall">forgot password?</label>
              <button className="loginButtonStyle" onClick={handleSignIn}>
                Login
              </button>
            </section>

            <label className="loginTextSmall">or login with</label>
            <div className="icon-spacebetween">
              <div>
                <IoLogoFacebook
                  className="icon-spacebetween"
                  color="#4267b2"
                  size={54}
                />
                <AiFillGoogleCircle
                  className="icon-spacebetween"
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
