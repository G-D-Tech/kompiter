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

  const rankings = [
    { rank: 1, name: "Henrik", score: "19 / 30" },
    { rank: 2, name: "Haakon Døssland", score: "16 / 30" },
    { rank: 3, name: "Hvem som helst andre", score: "14 / 30" },
    { rank: 4, name: "Hvem som helst andre", score: "11 / 30" },
  ];
  const listRankings = rankings.map((ranking) => (
    <div className="display-scoreChallenges" key={ranking.rank}>
      <label className="display-headerNumber"> {ranking.rank}. </label>
      <div>
        <label className="display-header"> {ranking.name}</label>
        <label className="display-score"> Score: {ranking.score}</label>
      </div>
    </div>
  ));

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
      {groupMembers.map((groupMember) => (
        <div className="display-scoreChallenges" key={groupMember}>
          <label className="display-header">
            {console.log(
              firebase.firestore().collection("users").doc(groupMember.uid)
                .displayName
            )}
          </label>
        </div>
      ))}
    </div>
  );
}

export default GroupPage;
