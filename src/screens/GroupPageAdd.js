import React, { useState, useContext } from "react";
import "../styles/Homepage.css";
import "../styles/ModalGroup.css";
import { BsPlus, BsCheck } from "react-icons/bs";

import { IoIosClose } from "react-icons/io";

import { GroupContext } from "../contexts/GroupContext";
import GroupPageNavBar from "../screens/GroupPageNavBar";

const GroupPageAdd = () => {
  const { group } = useContext(GroupContext);
  const [addIsOpen, setAddIsOpen] = useState(false);

  const challenges = ["hva som helst", "hva som helst to", "hva som helst 3"];
  const listChallenges = challenges.map((challenge) => (
    <div class="display-challenges">
      <text class="uncompletedChallengesText">{challenge}</text>
      <div>
        <IoIosClose
          onClick={() => {}}
          class="unchecked-circle"
          size={40}
        ></IoIosClose>
      </div>
    </div>
  ));

  return (
    <div className="modalGroup-content">
      <GroupPageNavBar />
      <div onClick={() => setAddIsOpen(true)} class="crossPlusButtonStyle">
        <BsPlus size={40}></BsPlus>
      </div>
      {addIsOpen ? (
        <div class="addBox">
          <input class="form-control" placeholder="Ring din nummernabo" />
          <div>
            <div class="addAndCheckBox">
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
};

export default GroupPageAdd;
