import "../styles/Homepage.css";
import "../styles/ModalGroup.css";

import GroupPageNavBar from "../screens/GroupPageNavBar";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import firebase from "../firebase";

function GroupPageSetting() {
  const location = useLocation();
  const { group, startDate, endDate } = location.state;
  const [currentUser, setCurrentUser] = useState("");
  const [deleteOrLeave, setDeleteOrLeave] = useState("Forlat");

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
      console.log("UseEffect 2 GroupPagesetting");
    };
  }, [currentUser]);

  useEffect(() => {
    if (group.numberOfGroupMembers == 1) {
      setDeleteOrLeave("Slett");
    }
    console.log("UseEffect 1 GroupPageSetting");
  });

  function deleteGroup(group) {
    if (group.numberOfGroupMembers === 1) {
      firebase
        .firestore()
        .collection("groups")
        .doc(group.id)
        .delete()
        .catch((err) => {
          console.error(err);
        });
    } else {
      firebase
        .firestore()
        .collection("groups")
        .doc(group.id)
        .collection("groupMembers")
        .doc(currentUser.uid)
        .delete()
        .catch((err) => {
          console.error(err);
        });
      firebase
        .firestore()
        .collection("groups")
        .doc(group.id)
        .update({
          numberOfGroupMembers: firebase.firestore.FieldValue.increment(-1),
        });
    }
    firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("groupCodes")
      .doc(group.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="modalGroup-content">
      {GroupPageNavBar(group, startDate, endDate)}
      <div className="display-challenges">
        <label className="uncompletedChallengesText">
          {deleteOrLeave} denne gruppa
        </label>
        <Link to="/">
          <button
            className="DeleteButtonStyle"
            onClick={() => deleteGroup(group)}
          >
            {deleteOrLeave}
          </button>
        </Link>
      </div>
    </div>
  );
}
export default GroupPageSetting;
