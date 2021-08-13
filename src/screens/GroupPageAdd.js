import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Homepage.css";
import "../styles/ModalGroup.css";
import "../styles/groupPageAdd.css";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css"; //Used to display sortingType

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
  const [groupMembers, setGroupMembers] = useState([]);
  const [imageProof, setImageProof] = useState(false);
  /*  const [groupMembers, setGroupMembers] = useState([]); */

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
    if (group.groupType === "ranking") {
      //Sets the results as "" when adding a new challenge
      groupMembers.map((groupmember) => {
        firebase
          .firestore()
          .collection("groups")
          .doc(group.id)
          .collection("challenges")
          .doc(newChallenge.id)
          .collection("results")
          .doc(groupmember.id)
          .set({ id: groupmember.id, challengeResult: "" });
        return groupMembers;
      });
    }

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

  function checkGroupMember(challenge, groupMember) {
    var isMember = false;
    challenge.membersCompletedChallenge.map((member) =>
      member === groupMember ? (isMember = true) : null
    );
    return isMember;
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
    //For deleting results-collection
    /* firebase
      .firestore()
      .collection("groups")
      .doc(group.id)
      .collection("challenges")
      .doc(challenge.id)
      .collection("results")
      .get()
      .then((val) => {
        val.map((val) => {
          val.delete();
        });
      })
      .catch((err) => {
        console.error(err);
      }); */
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
            ? checkGroupMember(challenge, i.id)
              ? firebase
                  .firestore()
                  .collection("groups")
                  .doc(group.id)
                  .collection("groupMembers")
                  .doc(i.id)
                  .update({
                    score: firebase.firestore.FieldValue.increment(-1),
                  })
              : firebase
                  .firestore()
                  .collection("groups")
                  .doc(group.id)
                  .collection("groupMembers")
                  .doc(i.id)
                  .update({
                    score: firebase.firestore.FieldValue.increment(0),
                  })
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
      .doc(challenge.id)
      .update({ challengeName: rename });
      
  }

  /* //Runs the first time the challenges is displayed
  function settingIsOpen(challenge) {
    challenge.settingIsOpen = false;
  } */

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
  }, []);

  //For updating total score
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
        if (doc.data() !== undefined) {
          setIsAdmin(doc.data().isAdmin);
        }
      });

    return isAdmin;
  }

  useEffect(() => {
    //Gets groupmembers
    const unsubscribe = firebase
      .firestore()
      .collection("groups")
      .doc(group.id)
      .collection("groupMembers")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({
            id: doc.data().id,
            name: doc.data().name,
            score: doc.data().score,
            isAdmin: doc.data().isAdmin,
          });
        });
        setGroupMembers(items);
      });
    return () => {
      unsubscribe();
    };
  }, [group.id]);

  //Må fikses på et senere tidspunkt, men fungerer ikke nå da Modal displayes i bakgrunnen grunnet posisjon til foreldre
  /* function modalIsOpen2(challenge) {
    setDeleteModalIsOpen(true);
    console.log(deleteModalIsOpen);
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
    <div>
      <div className="modalGroup-content">
        {GroupPageNavBar(group /* , startDate, endDate */)}
      </div>
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
          {group.groupType === "ranking" ? (
            <div className="d-flex flex-column container">
              <label className="sortingText">Ranger score etter:</label>
              <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                <ToggleButton
                  id="tbg-radio-1"
                  value={1}
                  onClick={() => setSortingType("høy")}
                >
                  Høyest
                </ToggleButton>
                <ToggleButton
                  id="tbg-radio-2"
                  value={2}
                  onClick={() => setSortingType("lav")}
                >
                  Lavest
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          ) : (
            <div className="d-flex flex-column container form-controlAdd">
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
          )}

          <div className="addAndCheckBox">
            <div className="crossButtonStyle">
              <IoIosClose
                onClick={() => setAddIsOpen(false)}
                size={40}
              ></IoIosClose>
            </div>
            <div>
              {group.groupType === "ranking" ? (
                <BsCheck
                  onClick={() => {
                    challengeName
                      ? addChallenge({
                          challengeName: challengeName,
                          id: uuidv4(),
                          membersCompletedChallenge: [],
                          sortingType: sortingType,
                        })
                      : setAddIsOpen(false);
                  }}
                  className="checkButtonStyle"
                  size={40}
                ></BsCheck>
              ) : (
                <BsCheck
                  onClick={() => {
                    challengeName
                      ? addChallenge({
                          challengeName: challengeName,
                          id: uuidv4(),
                          membersCompletedChallenge: [],

                          imageProof: imageProof,
                        })
                      : setAddIsOpen(false);
                  }}
                  className="checkButtonStyle"
                  size={40}
                ></BsCheck>
              )}
            </div>
          </div>
        </div>
      ) : null}
      <div>
        {challenges.map((challenge) => (
          <div key={challenge.id}>
            {/* {challenge.length === 3 ? settingIsOpen(challenge) : null} */}
            {!currentUserIsAdmin() ? (
              <div className="display-challenges">
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
                      <div className="settings1">
                        <div>
                          <input
                            className=" form-control form-control3"
                            defaultValue={challenge.challengeName}
                            value={rename}
                            onChange={(e) => setRename(e.target.value)}
                          />
                        </div>

                        <div>
                          <BsThreeDots
                            className="threeDots"
                            size={40}
                            onClick={() => {
                              updateSettingIsOpen(challenge);
                              setRenameIsOpen(!renameIsOpen);
                            }}
                          ></BsThreeDots>
                        </div>
                      </div>
                      <div
                        className="renameSaveButtonStyle"
                        onClick={() => {
                          renameChallenge(challenge);
                          setRenameIsOpen(!renameIsOpen);
                        }}
                      >
                        Lagre
                      </div>

                      <div className="settings1">
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
                      <div className="settings1">
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
                      <div className="settings1">
                        <label className="uncompletedChallengesText">
                          {challenge.challengeName}
                        </label>
                        <div>
                          <BsThreeDots
                            className="threeDots"
                            size={40}
                            onClick={() => updateSettingIsOpen(challenge)}
                          ></BsThreeDots>
                        </div>
                      </div>

                      <div className="settings1">
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
                      <div className="settings1">
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
                        className="threeDots"
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
