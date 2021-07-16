import { useLocation } from "react-router-dom";

import "../styles/Homepage.css";
import "../styles/ModalGroup.css";

import GroupPageNavBar from "../screens/GroupPageNavBar";

import React, { useEffect, useState } from "react";
import firebase from "../firebase";

function GroupPage() {
  const location = useLocation();
  const { group, startDate, endDate } = location.state;
  const [groupMembers, setGroupMembers] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("groups")
      .doc(group.id)
      .collection("groupMembers")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setGroupMembers(items);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="modalGroup-content">
      {GroupPageNavBar(group, startDate, endDate)}
      {groupMembers
        .sort((a, b) => b.score - a.score)
        .map((groupMember, index) => (
          <div className="display-scoreChallenges" key={groupMember}>
            <label className="display-headerNumber"> {index + 1}.</label>
            <div>
              <label className="display-header"> {groupMember.name}</label>
              <label className="display-score">
                {" "}
                Score: {groupMember.score} / {group.numberOfChallenges}
              </label>
            </div>
          </div>
        ))}
    </div>
  );
}

export default GroupPage;
