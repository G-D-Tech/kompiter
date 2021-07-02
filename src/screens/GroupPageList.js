import "../styles/Homepage.css";
import "../styles/ModalGroup.css";

import { BsCircle, BsCheckCircle } from "react-icons/bs";

import GroupPageNavBar from "../screens/GroupPageNavBar";

const GroupPageList = () => {
  return (
    <div className="modalGroup-content">
      <GroupPageNavBar />

      <text class="uncompletedChallengesText">Uncompleted challenges</text>
      <div class="display-challengesUndone">
        <text class="display-header">Ta en backflip fra 10 meteren</text>
        <div>
          <BsCircle class="unchecked-circle" size={35}></BsCircle>
        </div>
      </div>
      <div class="display-challengesUndone">
        <text class="display-header"> Eksempel</text>
        <div>
          <BsCircle class="unchecked-circle" size={35}></BsCircle>
        </div>
      </div>
      <div class="display-challengesUndone">
        <text class="display-header">
          Eksempel som er litt lenger for å se hva som skjer da
        </text>
        <div>
          <BsCircle class="unchecked-circle" size={35}></BsCircle>
        </div>
      </div>
      <div class="display-challengesUndone">
        <text class="display-header"> Hva som helst</text>
        <div>
          <BsCircle class="unchecked-circle" size={35}></BsCircle>
        </div>
      </div>

      <text class="uncompletedChallengesText">Completed challenges</text>
      <div class="display-challengesDone">
        <text class="display-header">
          Eksempel som er litt lenger for å se hva som skjer da
        </text>
        <div>
          <BsCheckCircle class="unchecked-circle" size={35}></BsCheckCircle>
        </div>
      </div>
      <div class="display-challengesDone">
        <text class="display-header"> Hva som helst</text>
        <div>
          <BsCheckCircle class="unchecked-circle" size={35}></BsCheckCircle>
        </div>
      </div>
    </div>
  );
};

export default GroupPageList;
