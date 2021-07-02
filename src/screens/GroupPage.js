import React, { useContext } from "react";

import "../styles/Homepage.css";
import "../styles/ModalGroup.css";

import { GroupContext } from "../contexts/GroupContext";

import GroupPageNavBar from "../screens/GroupPageNavBar";

const GroupPage = () => {
  const { group } = useContext(GroupContext);

  return (
    <div className="modalGroup-content">
      <GroupPageNavBar />
      <div class="display-scoreChallenges">
        <text class="display-headerNumber"> 1. </text>
        <div>
          <text class="display-header"> Henrik G</text>
          <text class="display-score"> Score: 19/20</text>
        </div>
      </div>
      <div class="display-scoreChallenges">
        <text class="display-headerNumber"> 2. </text>
        <div>
          <text class="display-header"> Haakon Døssland</text>
          <text class="display-score"> Score: 16/20</text>
        </div>
      </div>
      <div class="display-scoreChallenges">
        <text class="display-headerNumber"> 3. </text>
        <div>
          <text class="display-header"> Hvem som helst andre</text>
          <text class="display-score"> Score: 13/20</text>
        </div>
      </div>
      <div class="display-scoreChallenges">
        <text class="display-headerNumber"> 4. </text>
        <div>
          <text class="display-header"> Hvem som helst andre</text>
          <text class="display-score"> Score: 11/20</text>
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
