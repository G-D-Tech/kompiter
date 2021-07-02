import "../styles/Homepage.css";
import "../styles/ModalGroup.css";

import { BsCircle, BsCheckCircle } from "react-icons/bs";

import GroupPageNavBar from "../screens/GroupPageNavBar";

const GroupPageList = () => {
  const undoneChallenges = [
    "Ta en backflip fra 10 meteren",
    " Eksempel",
    "Eksempel som er litt lenger for å se hva som skjer da",
    "Hva som helst",
  ];

  const listUndoneChallenges = undoneChallenges.map((undoneChallenge) => (
    <div class="display-challengesUndone">
      <text class="display-header">{undoneChallenge}</text>
      <div>
        <BsCircle class="unchecked-circle" size={35}></BsCircle>
      </div>
    </div>
  ));

  const doneChallenges = [
    "Ta en frontflip fra 10 meteren",
    " Eksempel 1000213412",
    "Eksempel som er litt lenger for å se hva som skjer da",
    "Hva som helst",
  ];

  const listDoneChallenges = doneChallenges.map((doneChallenge) => (
    <div class="display-challengesDone">
      <text class="display-header">{doneChallenge}</text>
      <div>
        <BsCheckCircle class="unchecked-circle" size={35}></BsCheckCircle>
      </div>
    </div>
  ));

  return (
    <div className="modalGroup-content">
      <GroupPageNavBar />
      <text class="uncompletedChallengesText">Uncompleted challenges</text>
      <div>{listUndoneChallenges}</div>

      <text class="uncompletedChallengesText">Completed challenges</text>
      <div>{listDoneChallenges}</div>
    </div>
  );
};

export default GroupPageList;
