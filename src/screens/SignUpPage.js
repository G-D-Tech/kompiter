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
  const [disabledButton, setDisabledButton] = useState(true); //Ubrukt, ettersom den ikke har blitt lagt inn enn

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
            setPasswordError("Passordet m?? v??re minst 6 tegn");
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

  function acceptTerms() {
    let checkBox = document.getElementById("termsCheckbox");
    /* let createUserButton = document.getElementById("createUserButton"); */
    if (checkBox.checked) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }

  /* useEffect(() => {
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
  }, []); */

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
            <img src="/fullLogoKompit.png" height="50px" alt="" />
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
                  <input type="checkbox" id="termsCheckbox"></input>
                  <span
                    className="checkmark marginLeft"
                    onClick={() => acceptTerms()}
                  ></span>
                </label>
                <label>
                  En opprettelse av konto inneb??rer at du godtar{" "}
                  <label
                    className="termsAndConditions"
                    onClick={() => setModalIsOpen(true)}
                  >
                    f??lgende vilk??r
                  </label>
                </label>
              </div>
              <Modal
                isOpen={modalIsOpen}
                className="terms-modal"
                ariaHideApp={false}
              >
                <div className="terms">
                  <div className="d-flex justify-content-between">
                    <h1>Vilk??r</h1>
                    <div onClick={() => setModalIsOpen(false)}>
                      <IoClose size={35}></IoClose>
                    </div>
                  </div>

                  <h5>1. Innledning</h5>
                  <p>
                    F??lgende brukervilk??r regulerer bruk av Kompit. Du
                    forplikter deg til ?? f??lge disse idet du tar i bruk
                    applikasjonen.{" "}
                  </p>
                  <h5>2. Opprettelse av konto</h5>
                  <p>
                    Du m?? opprette en brukerkonto f??r du f??r tatt i bruk
                    funksjonaliteten i appen. All informasjonen du lagrer i
                    appen vil bli behandlet konfidensielt og vil ikke bli delt
                    med tredjeparter. Alt av informasjon i appen lagres i Google
                    sin tjeneste Firebase, hvordan denne informasjonen blir
                    lagret kan du lese mer om{" "}
                    <a href="https://firebase.google.com/support/privacy">
                      her
                    </a>
                    . Brukerkontoen er personlig, og du er ansvarlig for all
                    aktivitet som skjer gjennom bruk av kontoen.{" "}
                  </p>
                  <h5>3. Bruk av applikasjonen</h5>
                  <p>
                    Du er ansvarlig for ?? f??lge gjeldende regler, disse
                    brukervilk??rene og allment akseptert praksis ved bruk av
                    applikasjonen. Det er nulltolleranse for ?? legge til
                    utfordringer som oppfordrer til ufrivillige seksuelle
                    handlinger, vold eller annet som kan oppfattes som
                    ubehagelig av andre brukere eller utenforst??ende. I tillegg
                    skal alle utfordringer v??re frivillige, Kompit skal v??re en
                    g??y app uten press p?? at man m?? gj??re noe man ikke ??nsker
                    selv. Ved mistanke om at disse retningslinjene brytes,
                    forbeholder Kompit seg retten til ?? slette disse
                    utfordringene samt stenge eller sperre kontoen uten
                    forvarsel.{" "}
                  </p>
                  <h5>4. Lovvalg og tvistl??sning </h5>
                  <p>
                    Brukervilk??rene reguleres av norsk lov. Tvister l??ses ved de
                    alminnelige domstolene hvis ikke annet f??lger av ufravikelig
                    lovgivning.
                  </p>
                  <h5>5. Endring av vilk??rene </h5>
                  <p>
                    Kompit forbeholder seg retten til ?? gj??re endringer i
                    vilk??rene. De til enhver tid gjeldende vilk??rene vil v??re
                    tilgjengelig i appen under "Din profil". St??rre endringer
                    vil bli varslet p?? e-post.
                  </p>
                </div>
              </Modal>
              <button
                id="createUserButton"
                className="opprettButtonStyle"
                onClick={handleSignUp}
                disabled={disabledButton}
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
