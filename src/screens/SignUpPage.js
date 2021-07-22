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

  /*   const facebookProvider = new firebase.auth.FacebookAuthProvider();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
 */
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
            setEmailError("Feil email eller allerede i bruk");
            break;
          case "auth/weak-password":
            setPasswordError("Passordet må være minst 6 tegn");
            break;
          default:
            console.log("Unknown error");
        }
      });
  };

  /*   const handleLogIn = async (provider) => {
    await firebase
      .auth()
      .signInWithPopup(provider)
      .then((userCredentials) => {
        setUserUid(userCredentials.user.uid);
      })
      .catch((er) => {
        return er;
      });
  }; */

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
    };
  }, []);

  return (
    <div>
      {user ? (
        <div>
          {addUser(userUid)}
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
              <label className="loginTextSmall">Opprett en ny konto</label>
              <input
                className="usernameBox"
                placeholder="fullt navn"
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
                placeholder="passord"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="errorMsg">{passwordError}</p>
              <button className="opprettButtonStyle" onClick={handleSignUp}>
                Opprett konto
              </button>
            </section>
            {/*             <label className="loginTextSmall">eller logg inn med</label>
            <div className="icon-spacebetween">
              <div>
                <IoLogoFacebook
                  className="icon-spacebetween"
                  color="#4267b2"
                  size={54}
                  onClick={() => handleLogIn(facebookProvider)}
                />
                <AiFillGoogleCircle
                  className="icon-spacebetween"
                  color="#DB4437"
                  size={55}
                  onClick={() => handleLogIn(googleProvider)}
                />
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
