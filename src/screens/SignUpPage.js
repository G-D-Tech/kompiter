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

  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  const googleProvider = new firebase.auth.GoogleAuthProvider();

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

  const handleLogIn = async (provider) => {
    const res = await firebase
      .auth()
      .signInWithPopup(provider)
      .then((userCredentials) => {
        setUserUid(userCredentials.user.uid);
      })
      .catch((er) => {
        return er;
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
          <div class="container">
            <Link to="/SignUpOrInPage">
              <IoIosArrowBack class="IoIosArrowBack"></IoIosArrowBack>
            </Link>
          </div>
          <div class="container-center">
            <section class="container-center">
              <text className="loginTextSmall">Opprett en ny konto</text>
              <input
                class="usernameBox"
                placeholder="Navn"
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
                placeholder="passord"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="errorMsg">{passwordError}</p>
              <button class="opprettButtonStyle" onClick={handleSignUp}>
                Opprett konto
              </button>
            </section>
            <text className="loginTextSmall">eller logg inn med</text>
            <div class="icon-spacebetween">
              <div>
                <IoLogoFacebook
                  class="icon-spacebetween"
                  color="#4267b2"
                  size={54}
                  onClick={() => handleLogIn(facebookProvider)}
                />
                <AiFillGoogleCircle
                  class="icon-spacebetween"
                  color="#DB4437"
                  size={55}
                  onClick={() => handleLogIn(googleProvider)}
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
