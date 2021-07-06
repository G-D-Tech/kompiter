import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import "../styles/Homepage.css";
import "../styles/ModalGroup.css";
import { BsPlus, BsCheck } from "react-icons/bs";

import { IoIosClose } from "react-icons/io";

import GroupPageNavBar from "../screens/GroupPageNavBar";

function GroupPageAdd() {
  const location = useLocation();
  const { group, startDate, endDate } = location.state;

  const [addIsOpen, setAddIsOpen] = useState(false);
  const challenges = [
    { challengeNum: 1, name: "hva som helst" },
    { challengeNum: 2, name: "hva som helst to" },
    { challengeNum: 3, name: "hva som helst 3" },
  ];
  const listChallenges = challenges.map((challenge) => (
    <div className="display-challenges" key={challenge.challengeNum}>
      <label className="uncompletedChallengesText">{challenge.name}</label>
      <div>
        <IoIosClose
          onClick={() => {}}
          className="unchecked-circle"
          size={40}
        ></IoIosClose>
      </div>
    </div>
  ));

  return (
    <div className="modalGroup-content">
      {GroupPageNavBar(group, startDate, endDate)}
      <div onClick={() => setAddIsOpen(true)} className="crossPlusButtonStyle">
        <BsPlus size={40}></BsPlus>
      </div>
      {addIsOpen ? (
        <div className="addBox">
          <input className="form-control" placeholder="Ring din nummernabo" />
          <div>
            <div className="addAndCheckBox">
              <div className="crossButtonStyle">
                <IoIosClose
                  onClick={() => setAddIsOpen(false)}
                  size={40}
                ></IoIosClose>
              </div>
              <div className="checkButtonStyle">
                <BsCheck size={40}></BsCheck>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div>{listChallenges}</div>
    </div>
  );
}

export default GroupPageAdd;
