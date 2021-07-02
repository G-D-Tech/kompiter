import React, { useContext } from "react";
import "../styles/Homepage.css";
import "../styles/ModalGroup.css";
import { BsPlus } from "react-icons/bs";

import { GroupContext } from "../contexts/GroupContext";
import GroupPageNavBar from "../screens/GroupPageNavBar";

const GroupPageAdd = () => {
  const { group } = useContext(GroupContext);
  return (
    <div className="modalGroup-content">
      <GroupPageNavBar />
      <div>
        <div class="crossPlusButtonStyle">
          <BsPlus size={40}></BsPlus>
        </div>
        <div class="display-challenges">
          <text class="uncompletedChallengesText"> Hva som helst</text>
        </div>
        <div class="display-challenges">
          <text class="uncompletedChallengesText"> Hva som helst</text>
        </div>
        <div class="display-challenges">
          <text class="uncompletedChallengesText"> Hva som helst</text>
        </div>
        <div class="display-challenges">
          <text class="uncompletedChallengesText">
            Hva som helst, bare litt lenger for å sjekke
          </text>
        </div>
      </div>
    </div>
  );
};

export default GroupPageAdd;
