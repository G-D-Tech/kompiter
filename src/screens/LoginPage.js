import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "../styles/Homepage.css";
import "../styles/CreateGroup.css";
import "../styles/LoginPage.css";
import "react-datepicker/dist/react-datepicker.css";
/* import { IoLogoFacebook } from "react-icons/io5";
import { AiFillGoogleCircle } from "react-icons/ai"; */
import firebase from "../firebase";
import "firebase/auth";
import "firebase/firestore";
import Modal from "react-modal";

const LoginPage = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  /*   const facebookProvider = new firebase.auth.FacebookAuthProvider();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
 */
  /*   const clearInputs = () => {
    setEmail("");
    setPassword("");
  }; */

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  //Handles sign in using email
  function handleSignIn() {
    clearErrors();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError("Feil email");
            break;
          case "auth/wrong-password":
            setPasswordError("Feil passord");
            break;
          default:
            console.log("Ukjent feil");
        }
      });
  }

  function resetPassord() {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setModalIsOpen(true);
      });
  }

  //Gets current user
  useEffect(() => {
    const authListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser("");
      }
    });
    return () => {
      authListener();
    };
  }, [currentUser]);

  //Used to handle log in with facebook or google accounts
  /*   const handleLogIn = async (provider) => {
    await firebase
      .auth()
      .signInWithPopup(provider)
      .catch((er) => {
        return er;
      });
  }; */

  return (
    <div>
      {currentUser ? (
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
                Logg inn på din eksisterende konto
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
                  placeholder="passord"
                  required
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="container-centerError">
                  <p className="errorMsg">{passwordError}</p>
                </div>
              </div>

              <button className="loginButtonStyle" onClick={handleSignIn}>
                Logg inn
              </button>
              <text
                className="glemtPassordSmall"
                onClick={() => {
                  resetPassord();
                }}
              >
                glemt passord?
              </text>
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
      <Modal isOpen={modalIsOpen} className="modal-content" ariaHideApp={false}>
        <div className="input-container">
          <label className="textGruppe">
            Nytt passord sent til {email} (sjekk søppelpost)
          </label>
        </div>
        <div className="button-container">
          <button
            className="RedButtonStyle"
            onClick={() => {
              setModalIsOpen(false);
            }}
          >
            tilbake
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default LoginPage;
