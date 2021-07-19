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
  const [totalChallenges, setTotalChallenges] = useState("0");

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
          items.push(doc.data());
        });
        setGroupMembers(items);
      });
    //Gets total number of challenges for each group
    const unsubscribe2 = firebase
      .firestore()
      .collection("groups")
      .doc(group.id)
      .onSnapshot((snapshot) =>
        setTotalChallenges(snapshot.data().numberOfChallenges)
      );
    return () => {
      unsubscribe();
      unsubscribe2();
      console.log("UseEffect1 GroupPage");
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
                Score: {groupMember.score} / {totalChallenges}
              </label>
            </div>
          </div>
        ))}
    </div>
  );
}

export default GroupPage;
