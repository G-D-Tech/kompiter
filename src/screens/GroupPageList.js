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

  const changeBoolChallenge = (challenge) => {
    firebase
      .firestore()
      .collection("groups")
      .doc(group.id)
      .collection("challenges")
      .doc(challenge.id)
      .update({ completed: !challenge.completed });
  };

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

  return (
    <div className="modalGroup-content">
      {GroupPageNavBar(group, startDate, endDate)}

      <div>
        {challenges.map((challenge) => (
          <div key={challenge.id}>
            {challenge.completed ? (
              <div>
                {/* <label className="uncompletedChallengesText">
                  Completed challenges
                </label> */}
                <div className="display-challengesDone">
                  <label className="display-header">
                    {challenge.challengeName}
                  </label>
                  <div>
                    <BsCheckCircle
                      className="unchecked-circle"
                      size={39}
                      onClick={() => {
                        changeBoolChallenge(challenge);
                      }}
                    ></BsCheckCircle>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {/* <label className="uncompletedChallengesText">
                  Uncompleted challenges
                </label> */}
                <div className="display-challengesUndone">
                  <label className="display-header">
                    {challenge.challengeName}
                  </label>
                  <div>
                    <BsCircle
                      className="unchecked-circle"
                      size={35}
                      onClick={() => {
                        changeBoolChallenge(challenge);
                      }}
                    ></BsCircle>
                  </div>
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
