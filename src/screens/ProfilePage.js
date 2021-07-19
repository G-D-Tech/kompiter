import React, { useState, useEffect } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "../styles/Homepage.css";
import "../styles/CreateGroup.css";
import "../styles/LoginPage.css";
import "react-datepicker/dist/react-datepicker.css";
import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";
import "firebase/auth";
import "firebase/firestore";

const SignUpOrInPage = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [renameIsOpen, setRenameIsOpen] = useState(false);
  const [rename, setRename] = useState("");
  const [feedbackBool, setFeedbackBool] = useState(false);
  const [feedback, setFeedback] = useState("");

  function addFeedback(newFeedback) {
    firebase
      .firestore()
      .collection("feedback")
      .doc(newFeedback.id)
      .set(newFeedback)
      .catch((err) => {
        console.error(err);
      });
    setFeedback("");
    setFeedbackBool(false);
  }

  const handleLogOut = () => {
    firebase.auth().signOut();
    setCurrentUser("");
  };

  const renameUser = () => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        currentUser.updateProfile({
          displayName: rename,
        });
      }
    });
  };

  useEffect(() => {
    const authListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser("");
        console.log("Logget ut");
      }
    });
    return () => {
      authListener();
    };
  }, []);

  return (
    <div>
      <div>
        <div className="container">
          <Link to="/">
            <IoIosArrowBack className="IoIosArrowBack"></IoIosArrowBack>
          </Link>
        </div>
        <div className="container-centerProfile ">
          <BsFillPersonFill color="black" size={70} />
          <label className="displayNameHeader">{currentUser.displayName}</label>
          {renameIsOpen ? (
            <div className="renameBox">
              <input
                className="form-control"
                placeholder={currentUser.displayName}
                value={rename}
                onChange={(e) => setRename(e.target.value)}
              />
              <div
                className="saveButtonStyle"
                onClick={
                  (renameUser(),
                  () => {
                    setRenameIsOpen(!renameIsOpen);
                  })
                }
              >
                Lagre
              </div>
            </div>
          ) : null}
          <button
            className="signInButtonStyle"
            onClick={() => {
              setRenameIsOpen(!renameIsOpen);
            }}
          >
            Endre navn
          </button>

          <Link to="/">
            <button className="signInButtonStyle" onClick={handleLogOut}>
              Logg ut
            </button>
          </Link>
        </div>
        <div className="container-center">
          <button
            className="tilbakemeldingButtonStyle"
            onClick={() => {
              setFeedbackBool(!feedbackBool);
            }}
          >
            Gi oss tilbakemelding
          </button>
        </div>
        {feedbackBool ? (
          <div>
            <div>
              <label className="feedbackText" line-height="20">
                Denne tilbakemeldingen er anonym. Vi setter pris på konstruktiv
                tilbakemelding, ideer og tips. Det vil bli brukt for å forbedre
                appen.
              </label>
            </div>
            <textarea
              className="form-control feedbackBox"
              name="Text1"
              cols="40"
              rows="5"
              placeholder="Skriv her.."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <div className="container-center">
              <button
                className="sendInnButtonStyle"
                onClick={() => {
                  addFeedback({
                    feedback: feedback,
                    id: uuidv4(),
                  });
                }}
              >
                Send inn
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SignUpOrInPage;
