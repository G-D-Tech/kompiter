import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Homepage.css";
import "../styles/ModalGroup.css";
import firebase from "../firebase";
import GroupPageNavBar from "../screens/GroupPageNavBar";
import { BsCircle, BsCheckCircle } from "react-icons/bs";

function GroupPageList() {
  const location = useLocation();
  const { group, startDate, endDate } = location.state;
  const [challenges, setChallenges] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  //Checks if challenge is finnished and updates firestore
  function changeBoolChallenge(challenge) {
    if (checkGroupMember(challenge)) {
      firebase
        .firestore()
        .collection("groups")
        .doc(group.id)
        .collection("challenges")
        .doc(challenge.id)
        .update({
          membersCompletedChallenge: firebase.firestore.FieldValue.arrayRemove(
            currentUser.uid
          ),
        });
      firebase
        .firestore()
        .collection("groups")
        .doc(group.id)
        .collection("groupMembers")
        .doc(currentUser.uid)
        .update({ score: firebase.firestore.FieldValue.increment(-1) });
    } else {
      firebase
        .firestore()
        .collection("groups")
        .doc(group.id)
        .collection("challenges")
        .doc(challenge.id)
        .update({
          membersCompletedChallenge: firebase.firestore.FieldValue.arrayUnion(
            currentUser.uid
          ),
        });
      firebase
        .firestore()
        .collection("groups")
        .doc(group.id)
        .collection("groupMembers")
        .doc(currentUser.uid)
        .update({ score: firebase.firestore.FieldValue.increment(1) });
    }
    console.log("ChangeBoolChallenge GroupPageList");
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

  //Gets current challenges
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

  //Checks if groupmember has accomblished challenge
  function checkGroupMember(challenge) {
    var isMember = false;
    {
      challenge.membersCompletedChallenge.map((member) =>
        member === currentUser.uid ? (isMember = true) : null
      );
    }
    return isMember;
  }

  return (
    <div className="modalGroup-content">
      {GroupPageNavBar(group, startDate, endDate)}
      <div>
        {challenges.map((challenge) => (
          <div key={challenge.id}>
            {console.log(checkGroupMember(challenge))}
            {checkGroupMember(challenge) ? (
              <div
                className="display-challengesDone"
                onClick={() => {
                  changeBoolChallenge(challenge);
                }}
              >
                <label className="display-header">
                  {challenge.challengeName}
                </label>
                <div>
                  <BsCheckCircle
                    className="unchecked-circle"
                    size={39}
                  ></BsCheckCircle>
                </div>
              </div>
            ) : (
              <div
                className="display-challengesUndone"
                onClick={() => {
                  changeBoolChallenge(challenge);
                }}
              >
                <label className="display-header">
                  {challenge.challengeName}
                </label>
                <div>
                  <BsCircle className="unchecked-circle" size={35}></BsCircle>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupPageList;
