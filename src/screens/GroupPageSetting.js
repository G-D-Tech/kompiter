import "../styles/Homepage.css";
import "../styles/ModalGroup.css";

import GroupPageNavBar from "../screens/GroupPageNavBar";

import { useLocation } from "react-router-dom";

function GroupPageSetting() {
  const location = useLocation();
  const { group, startDate, endDate } = location.state;

  const settings = [
    { settingNum: 1, name: "Allow group members to confirm challenges" },
    { settingNum: 2, name: "Allow other to add challenges" },
    { settingNum: 3, name: "Verify challenge with picture" },
  ];
  const listSettings = settings.map((setting) => (
    <div className="display-challenges" key={setting.settingNum}>
      <label className="uncompletedChallengesText">{setting.name}</label>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckChecked1"
        />
        <label
          color="white"
          className="text"
          htmlFor="flexCheckChecked1"
        ></label>
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
