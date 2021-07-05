import { BsFillPersonFill } from "react-icons/bs";
import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/Homepage.css";
import "../styles/ModalGroup.css";
import firebase from "../firebase";

import { GroupContext } from "../contexts/GroupContext";

const Homepage = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection("groups");

  function getGroups() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setGroups(items);
      setLoading(false);
    });
  }

  function deleteGroup(school) {
    setLoading(true);
    ref
      .doc(school.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  }

  useEffect(() => {
    getGroups();
  }, []);

  const history = useHistory();
  const { setGroup } = useContext(GroupContext);
  function setGroupToContext(props) {
    setGroup(props);
    history.push("/GroupPage");
  }

  return (
    <div>
      <div id="d-flex justify-content-center"></div>
      <div class="container">
        <div class="icon">
          <BsFillPersonFill size={30} />
        </div>

        <h1 id="groupHead">Group</h1>

        <div class="inputCodeStyle">
          <form>
            <div class="GroupNameBox">
              <input
                class="form-control"
                id="exampleFormControlInput"
                placeholder="123456"
              ></input>
            </div>
          </form>
          <button class="RedButtonStyle">Join Group</button>
        </div>

        <div class="d-flex justify-content-center">
          <Link to="/CreateGroup">
            <button class="RedButtonStyle" id="createGroupButton">
              Create Group
            </button>
          </Link>
        </div>
      </div>

      {groups.map((group) => (
        <div key={group.id} class="d-flex justify-content-center">
          <button
            class="GroupButtonStyle"
            id="createGroupButton"
            onClick={() => setGroupToContext(group)}
          >
            {group.groupName}
            <button onClick={() => deleteGroup(group)}>X</button>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Homepage;
