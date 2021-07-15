import React, { useState, useEffect } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "../styles/Homepage.css";
import "../styles/CreateGroup.css";
import "../styles/LoginPage.css";
import "react-datepicker/dist/react-datepicker.css";
import firebase from "../firebase";
import "firebase/auth";
import "firebase/firestore";

const SignUpOrInPage = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [renameIsOpen, setRenameIsOpen] = useState(false);
  const [rename, setRename] = useState("");

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
      </div>
    </div>
  );
};

export default SignUpOrInPage;