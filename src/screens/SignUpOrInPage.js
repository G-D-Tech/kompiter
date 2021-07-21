import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "../styles/Homepage.css";
import "../styles/CreateGroup.css";
import "../styles/LoginPage.css";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import firebase from "../firebase";
import React, { useState, useEffect } from "react";

const SignUpOrInPage = () => {
  const [feedbackBool, setFeedbackBool] = useState(false);
  const [feedback, setFeedback] = useState("");

  //Adds feedback for users not logged in
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
  return (
    <div>
      <div className="container">
        <Link to="/">
          <IoIosArrowBack className="IoIosArrowBack"></IoIosArrowBack>
        </Link>
      </div>
      <div className="container-center">
        <Link to="/LoginPage">
          <button className="LogInButtonStyle">Logg inn</button>
        </Link>
        <Link to="/SignUpPage">
          <button className="SignInButtonStyle">Opprett konto</button>
        </Link>

        <button
          className="tilbakemeldingButtonStyle"
          onClick={() => {
            setFeedbackBool(!feedbackBool);
          }}
        >
          Gi oss tilbakemelding
        </button>
        {feedbackBool ? (
          <div>
            <div>
              <label class="feedbackText" line-height="20">
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
