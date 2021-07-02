import "../styles/Homepage.css";
import "../styles/ModalGroup.css";

import GroupPageNavBar from "../screens/GroupPageNavBar";

const GroupPageSetting = () => {
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
      <GroupPageNavBar />
      <div>{listSettings}</div>
    </div>
  );
};
export default GroupPageSetting;
