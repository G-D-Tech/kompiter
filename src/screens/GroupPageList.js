import "../styles/Homepage.css";
import "../styles/ModalGroup.css";

import { BsCircle, BsCheckCircle } from "react-icons/bs";

import { useLocation } from "react-router-dom";

import GroupPageNavBar from "../screens/GroupPageNavBar";

function GroupPageList() {
  const location = useLocation();
  const { group, startDate, endDate } = location.state;

  const undoneChallenges = [
    { challengeNum: 1, name: "Ta en backflip fra 10 meteren" },
    { challengeNum: 2, name: " Eksempel" },
    {
      challengeNum: 3,
      name: "Eksempel som er litt lenger for å se hva som skjer da",
    },
    { challengeNum: 4, name: "Hva som helst" },
  ];

  const listUndoneChallenges = undoneChallenges.map((undoneChallenge) => (
    <div
      className="display-challengesUndone"
      key={undoneChallenge.challengeNum}
    >
      <label className="display-header">{undoneChallenge.name}</label>
      <div>
        <BsCircle className="unchecked-circle" size={35}></BsCircle>
      </div>
    </div>
  ));

  const doneChallenges = [
    { challengeNum: 5, name: "Ta en frontflip fra 10 meteren" },
    { challengeNum: 6, name: " Eksempel 1000213412" },
    {
      challengeNum: 7,
      name: "Eksempel som er litt lenger for å se hva som skjer da",
    },
    { challengeNum: 8, name: "Hva som helst" },
  ];

  const listDoneChallenges = doneChallenges.map((doneChallenge) => (
    <div className="display-challengesDone" key={doneChallenge.challengeNum}>
      <label className="display-header">{doneChallenge.name}</label>
      <div>
        <BsCheckCircle className="unchecked-circle" size={35}></BsCheckCircle>
      </div>
    </div>
  ));

  return (
    <div className="modalGroup-content">
      {GroupPageNavBar(group, startDate, endDate)}
      <label className="uncompletedChallengesText">
        Uncompleted challenges
      </label>
      <div>{listUndoneChallenges}</div>

      <label className="uncompletedChallengesText">Completed challenges</label>
      <div>{listDoneChallenges}</div>
    </div>
  );
}

export default GroupPageList;
