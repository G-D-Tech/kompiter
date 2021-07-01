import { BsFillPersonFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";
import "../styles/ModalGroup.css";
/* import { IoIosClose } from "react-icons/io";
import { FiCopy } from "react-icons/fi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { propTypes } from "react-bootstrap/esm/Image";
import Modal from "react-modal"; */
import firebase from "../firebase";

function Homepage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
    ref
      .doc(school.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    getGroups();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div id="d-flex justify-content-center"></div>
      <div class="container">
        <div class="icon">
          <BsFillPersonFill size={30} />
        </div>

        <h1 id="groupHead">Group</h1>
        <div class="d-flex justify-content-center">
          <form class="form-inline">
            <div>
              <input
                class="form-control"
                id="exampleFormControlInput"
                placeholder="123456"
              ></input>
            </div>
            <button class="RedButtonStyle">Join Group</button>
          </form>
        </div>
        <div class="d-flex justify-content-center">
          <button class="RedButtonStyle" id="createGroupButton">
            <Link to="/CreateGroup">Create Group</Link>
          </button>
        </div>
      </div>

      {groups.map((group) => (
        <div key={group.id} class="d-flex justify-content-center">
          <button class="GroupButtonStyle" id="createGroupButton">
            <Link
              id="groupText"
              to={{
                pathname: "/GroupPage",
                state: {
                  groupId: group.id,
                  groupName: group.groupName,
                  startDate: group.startDate.toDate(),
                  endDate: group.endDate.toDate(),
                },
              }}
            >
              {group.groupName}
            </Link>
            <button onClick={() => deleteGroup(group)}>X</button>
          </button>
        </div>
      ))}
    </div>
  );
}

export default Homepage;
