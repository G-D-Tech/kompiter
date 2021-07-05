import "../styles/Homepage.css";
import "../styles/ModalGroup.css";

import GroupPageNavBar from "../screens/GroupPageNavBar";

import { useLocation } from "react-router-dom";

function GroupPageSetting(props) {
  const location = useLocation();
  const { group, startDate, endDate } = location.state;

  const settings = [
    "Allow group members to confirm challenges",
    "Allow other to add challenges",
    "Verify challenge with picture",
  ];
  const listSettings = settings.map((setting) => (
    <div class="display-challenges">
      <text class="uncompletedChallengesText">{setting}</text>
      <div className="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckChecked1"
          unchecked
        />
        <label color="white" class="text" for="flexCheckChecked1"></label>
      </div>
    </div>
  ));
  return (
    <div className="modalGroup-content">
      {GroupPageNavBar(group, startDate, endDate)}
      <div>{listSettings}</div>
    </div>
  );
}
export default GroupPageSetting;
