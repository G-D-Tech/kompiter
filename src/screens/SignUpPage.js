import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";

import "../styles/Homepage.css";
import "../styles/CreateGroup.css";
import "../styles/ModalGroup.css";
import "../styles/LoginPage.css";
import "../styles/SignUpPage.css";
import "react-datepicker/dist/react-datepicker.css";
//import { IoLogoFacebook } from "react-icons/io5";
//import { AiFillGoogleCircle } from "react-icons/ai";
import firebase from "../firebase";
import "firebase/auth";
import "firebase/firestore";
import Modal from "react-modal";

const SignUpPage = () => {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userUid, setUserUid] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  function setAcitveCreateUser() {
    var checkBox = document.getElementById("termsCheckbox");
    var createUserButton = document.getElementById("createUserButton");
    if (checkBox.checked) {
      createUserButton.disabled = false;
    } else {
      createUserButton.disabled = true;
    }
  }

  /*  window.onload = function () {
    if (document.getElementById(termsCheckbox).checked) {
      document.getElementById(createUser).disabled = true;
    } else {
      document.getElementById(createUser).disabled = false;
    }
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

              <div className="d-flex justify-content-center termsDiv">
                <label className="checkboxContainer">
                  <input
                    type="checkbox"
                    id="termsCheckbox"
                    onClick={() => setAcitveCreateUser()}
                  ></input>
                  <span className="checkmark"></span>
                </label>
                <label>
                  For å ta i bruk applikasjonen må du godta{" "}
                  <a
                    className="termsAndConditions"
                    onClick={() => setModalIsOpen(true)}
                  >
                    følgende vilkår
                  </a>
                </label>
              </div>
              <Modal
                isOpen={modalIsOpen}
                className="terms-modal"
                ariaHideApp={false}
              >
                <div className="terms">
                  <div className="d-flex justify-content-between">
                    <h1>Vilkår</h1>
                    <button
                      className="backFromTermsButton"
                      onClick={() => setModalIsOpen(false)}
                    >
                      <IoClose size={30}></IoClose>
                    </button>
                  </div>

                  <h5>1. Innledning</h5>
                  <p>
                    Følgende brukervilkår regulerer bruk av Kompit. Du
                    forplikter deg til å følge disse idet du tar i bruk
                    applikasjonen.{" "}
                  </p>
                  <h5>2. Opprettelse av konto</h5>
                  <p>
                    Du må opprette en brukerkonto før du får tatt i bruk
                    funksjonaliteten i appen. All informasjonen du lagrer i
                    appen vil bli behandlet konfidensielt og vil ikke bli delt
                    med tredjeparter. Brukerkontoen er personlig, og du er
                    ansvarlig for all aktivitet som skjer gjennom bruk av
                    kontoen.{" "}
                  </p>
                  <h5>3. Bruk av applikasjonen</h5>
                  <p>
                    Du er ansvarlig for å følge gjeldende regler, disse
                    brukervilkårene og allment akseptert praksis ved bruk av
                    applikasjonen. Det er nulltolleranse for å legge til
                    utfordringer som oppfordrer til ufrivillige seksuelle
                    handlinger, vold eller annet som kan oppfattes som
                    ubehagelig av andre brukere eller utenforstående. I tillegg
                    skal alle utfordringer være frivillige, Kompit skal være en
                    gøy app uten press på at man må gjøre noe man ikke ønsker
                    selv. Ved mistanke om at disse retningslinjene brytes,
                    forbeholder Kompit seg retten til å slette disse
                    utfordringene samt stenge eller sperre kontoen uten
                    forvarsel.{" "}
                  </p>
                  <h5>4. Lovvalg og tvistløsning </h5>
                  <p>
                    Brukervilkårene reguleres av norsk lov. Tvister løses ved de
                    alminnelige domstolene hvis ikke annet følger av ufravikelig
                    lovgivning.
                  </p>
                  <h5>5. Endring av vilkårene </h5>
                  <p>
                    Kompit forbeholder seg retten til å gjøre endringer i
                    vilkårene. De til enhver tid gjeldende vilkårene vil være
                    tilgjengelig i appen under "Din profil". Større endringer
                    vil bli varslet på e-post.
                  </p>
                </div>
              </Modal>
              <button
                id="createUserButton"
                className="opprettButtonStyle"
                onClick={handleSignUp}
                disabled
              >
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
