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
  const { group, startDate, endDate } = location.state;

  const [addIsOpen, setAddIsOpen] = useState(false);
  const [challengeName, setChallengeName] = useState();
  const [challenges, setChallenges] = useState([]);

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
    setChallengeName("");
  }

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
    console.log(challenge.id);
  }

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
                    addChallenge({
                      challengeName,
                      completed: false,
                      id: uuidv4(),
                    }); //id: uuid4()
                    setAddIsOpen(false);
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
