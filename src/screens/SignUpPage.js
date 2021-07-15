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
  const [userUid, setUserUid] = useState("");

  const clearInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  function addUser(user) {
    firebase.firestore().collection("users").doc(user).set({ userId: user });
    console.log("User added");
  }

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
        setUserUid(userCredentials.user.uid);
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

  useEffect(() => {
    const authListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
    return () => {
      authListener();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
      });
    return () => {
      unsubscribe();
      console.log("Unsubscribe");
    };
  }, []);

  return (
    <div>
      {user ? (
        <div>
          {addUser(userUid)}
          {console.log(userUid)}
          <Redirect to="/" />
        </div>
      ) : (
        <div>
          <div className="container">
            <Link to="/SignUpOrInPage">
              <IoIosArrowBack className="IoIosArrowBack"></IoIosArrowBack>
            </Link>
          </div>
          <div className="container-center">
            <section className="container-center">
              <label className="loginTextSmall">Create a new acount</label>
              <input
                className="usernameBox"
                placeholder="full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="usernameBox"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="errorMsg">{emailError}</p>
              <input
                className="usernameBox"
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="errorMsg">{passwordError}</p>
              <label className="loginTextSmall">forgot password?</label>
              <button className="loginButtonStyle" onClick={handleSignUp}>
                Create
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
