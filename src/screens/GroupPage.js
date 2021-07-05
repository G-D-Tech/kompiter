import { useLocation } from "react-router-dom";

import "../styles/Homepage.css";
import "../styles/ModalGroup.css";

import GroupPageNavBar from "../screens/GroupPageNavBar";

function GroupPage() {
  const location = useLocation();
  const { group, startDate, endDate } = location.state;
  //const { group } = useContext(GroupContext);

  const rankings = [
    { rank: 1, name: "Henrik", score: "19 / 30" },
    { rank: 2, name: "Haakon Døssland", score: "16 / 30" },
    { rank: 3, name: "Hvem som helst andre", score: "14 / 30" },
    { rank: 4, name: "Hvem som helst andre", score: "11 / 30" },
  ];
  const listRankings = rankings.map((ranking) => (
    <div class="display-scoreChallenges">
      <text class="display-headerNumber"> {ranking.rank}. </text>
      <div>
        <text class="display-header"> {ranking.name}</text>
        <text class="display-score"> Score: {ranking.score}</text>
      </div>
    </div>
  ));
  return (
    <div className="modalGroup-content">
      {GroupPageNavBar(group, startDate, endDate)}
      <div>{listRankings}</div>
    </div>
  );
}

export default GroupPage;
