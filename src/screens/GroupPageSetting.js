import "../styles/Homepage.css";
import "../styles/ModalGroup.css";

import GroupPageNavBar from "../screens/GroupPageNavBar";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import firebase from "../firebase";

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

  const ref = firebase.firestore().collection("groups");

  function deleteGroup(group) {
    ref
      .doc(group.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="modalGroup-content">
      {GroupPageNavBar(group, startDate, endDate)}
      <div>{listSettings}</div>
      <div className="display-challenges">
        <label className="uncompletedChallengesText">Delete this group</label>
        {/* <label className="deleteGroupText">
            Once you deleted a group, there is no going back
          </label> */}
        <Link to="/">
          <button
            className="DeleteButtonStyle"
            onClick={() => deleteGroup(group)}
          >
            Del
          </button>
        </Link>
      </div>
    </div>
  );
}
export default GroupPageSetting;
