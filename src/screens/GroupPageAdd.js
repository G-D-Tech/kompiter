import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Homepage.css";
import "../styles/ModalGroup.css";
import "../styles/groupPageAdd.css";

// Importing the Bootstrap CSS
import radio from "bootstrap/dist/css/bootstrap.min.css"; //Used to display sortingType

import { BsPlus, BsCheck, BsThreeDots } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import firebase from "../firebase";
import GroupPageNavBar from "../screens/GroupPageNavBar";
import { v4 as uuidv4 } from "uuid";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
/* import Modal from "react-modal"; */

function GroupPageAdd() {
  const location = useLocation();
  const { group /* , startDate, endDate  */ } = location.state;
  const [currentUser, setCurrentUser] = useState("");
  const [addIsOpen, setAddIsOpen] = useState(false);
  const [challengeName, setChallengeName] = useState("");
  const [challenges, setChallenges] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [rename, setRename] = useState();
  const [renameIsOpen, setRenameIsOpen] = useState(false);
  const [sortingType, setSortingType] = useState("høy");
  const [imageProof, setImageProof] = useState(false);

  //Adds challenge to current group
  function addChallenge(newChallenge) {
    firebase
      .firestore()
      .collection("groups")
      .doc(group.id)
      .collection("challenges")
      .doc(newChallenge.id)
      .set(newChallenge)
      .catch((err) => {
        console.error(err);
      });
    //MÅ UNMOUNTE
    firebase
      .firestore()
      .collection("groups")
      .doc(group.id)
      .update({
        numberOfChallenges: firebase.firestore.FieldValue.increment(1),
      });
    setChallengeName("");
    setAddIsOpen(false);
  }

  function updateSettingIsOpen(challenge) {
    challenge.settingIsOpen = !challenge.settingIsOpen;
    setRenameIsOpen(false);
    setModalIsOpen(!modalIsOpen);
  }

  //Deletes challenge from group
  function deleteChallenge(challenge) {
    firebase
      .firestore()
      .collection("groups")
      .doc(group.id)
      .collection("challenges")
      .doc(challenge.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
    firebase
      .firestore()
      .collection("groups")
      .doc(group.id)
      .update({
        numberOfChallenges: firebase.firestore.FieldValue.increment(-1),
      });
    firebase
      .firestore()
      .collection("groups")
      .doc(group.id)
      .collection("groupMembers")
      .get()
      .then((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        items.map((i) =>
          i.score > 0
            ? firebase
                .firestore()
                .collection("groups")
                .doc(group.id)
                .collection("groupMembers")
                .doc(i.id)
                .update({ score: firebase.firestore.FieldValue.increment(-1) })
            : null
        );
      });

    /* firebase
      .firestore()
      .collection("groups")
      .update({
        numberOfChallenges: firebase.firestore.FieldValue.increment(-1),
      }); */

    //Checks if current user has accomplished the challenge. If yes, delete current user from challenge
    /* if (checkGroupMember(currentUser)) {  //MÅ FIKSES
      firebase
        .firestore()
        .collection("groups")
        .doc(group.id)
        .collection("groupMembers")
        .doc(currentUser.uid)
        .update({ score: firebase.firestore.FieldValue.increment(-1) });
    } */
    setChallengeName("");
  }

  function renameChallenge(challenge) {
    firebase
      .firestore()
      .collection("groups")
      .doc(group.id)
      .collection("challenges")
      .doc(challenge)
      .update({ challengeName: rename });
  }

  /* //Runs the first time the challenges is displayed
  function settingIsOpen(challenge) {
    challenge.settingIsOpen = false;
  } */

  function updateSettingIsOpen(challenge) {
    challenge.settingIsOpen = !challenge.settingIsOpen;
    setModalIsOpen(!modalIsOpen);
    console.log(challenge);
  }

  //Gets all challenges belonging to current group
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("groups")
      .doc(group.id)
      .collection("challenges")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setChallenges(items);
      });
    return () => {
      unsubscribe();
    };
  }, [group.id]);

  //For updateing total score
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

  function currentUserIsAdmin() {
    firebase
      .firestore()
      .collection("groups")
      .doc(group.id)
      .collection("groupMembers")
      .doc(currentUser.uid)
      .onSnapshot((doc) => {
        setIsAdmin(doc.data().isAdmin);
      });
    return isAdmin;
  }

  /*   function modalIsOpen2(challenge) {
    setModalIsOpen(true);
    console.log(modalIsOpen);
    return (
      <div>
        <Modal
          isOpen={modalIsOpen}
          className="modal-content"
          //onRequestClose={() => setModalIsOpen(false)}
          ariaHideApp={false}
        >
          <IoIosClose
            onClick={() => setModalIsOpen(false)}
            className="modalClose"
            size={40}
          ></IoIosClose>
          <div className="input-container">
            <label className="textGruppe">
              Vil du slette denne utfordringen?
            </label>
          </div>
          <div className="button-container">
            <button
              className="RedButtonStyle"
              onClick={() => {
                deleteChallenge(challenge);
                setModalIsOpen(false);
              }}
            >
              slett
            </button>
          </div>
        </Modal>
      </div>
    );
  }
 */
  return (
    <div className="modalGroup-content">
      {GroupPageNavBar(group /* , startDate, endDate */)}
      <div
        onClick={() => {
          currentUserIsAdmin() ? setAddIsOpen(true) : setAddIsOpen(false);
        }}
        className="crossPlusButtonStyle"
      >
        <BsPlus size={40}></BsPlus>
      </div>

      {addIsOpen ? (
        <div className="addBox">
          <input
            value={challengeName}
            onChange={(e) => setChallengeName(e.target.value)}
            className="form-control"
            placeholder="Skriv inn utfordring..."
          />
          <div className="d-flex flex-column container">
            <label className="sortingText">Krever bildebevis:</label>
            <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
              <ToggleButton
                id="tbg-radio-1"
                value={1}
                onClick={() => setImageProof(false)}
              >
                Nei
              </ToggleButton>
              <ToggleButton
                id="tbg-radio-2"
                value={2}
                onClick={() => setImageProof(true)}
              >
                Ja
              </ToggleButton>
            </ToggleButtonGroup>
          </div>

          <div className="addAndCheckBox">
            <div className="crossButtonStyle">
              <IoIosClose
                onClick={() => setAddIsOpen(false)}
                size={40}
              ></IoIosClose>
            </div>
            <div className="checkButtonStyle">
              <BsCheck
                onClick={() => {
                  challengeName
                    ? addChallenge({
                        challengeName: challengeName,
                        id: uuidv4(),
                        membersCompletedChallenge: [],
                        sortingType: sortingType,
                        imageProof: imageProof,
                      })
                    : setAddIsOpen(false);
                }}
                size={40}
              ></BsCheck>
            </div>
          </div>
        </div>
      ) : null}
      <div>
        {challenges.map((challenge) => (
          <div>
            {/* {challenge.length === 3 ? settingIsOpen(challenge) : null} */}
            {!currentUserIsAdmin() ? (
              <div className="display-challenges" key={challenge.id}>
                <label className="uncompletedChallengesText">
                  {challenge.challengeName}
                </label>
              </div>
            ) : (
              <div>
                {challenge.settingIsOpen ? (
                  renameIsOpen ? (
                    <div
                      className="display-challengesSettings"
                      key={challenge.id}
                    >
                      <div className="settings">
                        <input
                          className="form-control"
                          defaultValue={challenge.challengeName}
                          value={rename}
                          onChange={(e) => setRename(e.target.value)}
                        />

                        <div>
                          <BsThreeDots
                            className="unchecked-circle"
                            size={40}
                            onClick={() => updateSettingIsOpen(challenge)}
                          ></BsThreeDots>
                        </div>
                      </div>
                      <div
                        className="renameSaveButtonStyle"
                        onClick={() => {
                          renameChallenge(challenge.id);
                          setRenameIsOpen(!renameIsOpen);
                        }}
                      >
                        Lagre
                      </div>

                      <div className="settings">
                        <label className="settingsText">Rediger navn</label>
                        <button
                          className="settingChangeButtonStyle"
                          onClick={() => {
                            setRenameIsOpen(!renameIsOpen);
                          }}
                        >
                          Rediger
                        </button>
                      </div>
                      <div className="settings">
                        <label className="settingsText">
                          Slette utfordring
                        </label>
                        <button
                          className="settingDeleteButtonStyle"
                          onClick={() => deleteChallenge(challenge)}
                        >
                          Slett
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="display-challengesSettings"
                      key={challenge.id}
                    >
                      <div className="settings">
                        <label className="uncompletedChallengesText">
                          {challenge.challengeName}
                        </label>
                        <div>
                          <BsThreeDots
                            className="unchecked-circle"
                            size={40}
                            onClick={() => updateSettingIsOpen(challenge)}
                          ></BsThreeDots>
                        </div>
                      </div>

                      <div className="settings">
                        <label className="settingsText">Rediger navn</label>
                        <button
                          className="settingChangeButtonStyle"
                          onClick={() => {
                            setRenameIsOpen(!renameIsOpen);
                          }}
                        >
                          Rediger
                        </button>
                      </div>
                      <div className="settings">
                        <label className="settingsText">
                          Slette utfordring
                        </label>
                        <button
                          className="settingDeleteButtonStyle"
                          onClick={() => deleteChallenge(challenge)}
                        >
                          Slett
                        </button>
                      </div>
                    </div>
                  )
                ) : (
                  <div
                    className="display-challenges"
                    key={challenge.id}
                    onClick={() => updateSettingIsOpen(challenge)}
                  >
                    <label className="uncompletedChallengesText">
                      {challenge.challengeName}
                    </label>
                    <div>
                      <BsThreeDots
                        className="unchecked-circle"
                        size={40}
                      ></BsThreeDots>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupPageAdd;
