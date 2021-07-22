import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Homepage.css";
import "../styles/ModalGroup.css";
import { BsPlus, BsCheck } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import firebase from "../firebase";
import GroupPageNavBar from "../screens/GroupPageNavBar";
import { v4 as uuidv4 } from "uuid";

function GroupPageAdd() {
  const location = useLocation();
  const { group /* , startDate, endDate  */ } = location.state;
  const [currentUser, setCurrentUser] = useState("");
  const [addIsOpen, setAddIsOpen] = useState(false);
  const [challengeName, setChallengeName] = useState("");
  const [challenges, setChallenges] = useState([]);

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

  /*   function checkGroupMember(challenge) {
    var isMember = false;
    {
      challenge.membersCompletedChallenge.map((member) =>
        member === currentUser.uid ? (isMember = true) : null
      );
    }
    return isMember;
  } */

  return (
    <div className="modalGroup-content">
      {GroupPageNavBar(group /* , startDate, endDate */)}
      <div onClick={() => setAddIsOpen(true)} className="crossPlusButtonStyle">
        <BsPlus size={40}></BsPlus>
      </div>
      {addIsOpen ? (
        <div className="addBox">
          <input
            value={challengeName}
            onChange={(e) => setChallengeName(e.target.value)}
            className="form-control"
            placeholder="Ring din nummernabo"
          />
          <div>
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
                        })
                      : setAddIsOpen(false);
                  }}
                  size={40}
                ></BsCheck>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div>
        {challenges.map((challenge) => (
          <div className="display-challenges" key={challenge.id}>
            <label className="uncompletedChallengesText">
              {challenge.challengeName}
            </label>
            <div>
              <IoIosClose
                onClick={() => deleteChallenge(challenge)}
                className="unchecked-circle"
                size={40}
              ></IoIosClose>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupPageAdd;
