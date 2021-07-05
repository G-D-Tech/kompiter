import { BsFillPersonFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";
import "../styles/ModalGroup.css";
import firebase from "../firebase";
import { IoIosClose } from "react-icons/io";

const Homepage = () => {
  const [groups, setGroups] = useState([]);

  const ref = firebase.firestore().collection("groups");

  const handleLogOut = () => {
    firebase.auth().signOut();
  };

  function getGroups() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setGroups(items);
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
  }, [groups]);

  return (
    <div>
      <div id="d-flex justify-content-center"></div>
      <div class="container">
        <text class="loginTextSmall" onClick={handleLogOut}>
          Logout
        </text>
        <div class="icon">
          <Link to="/SignUpOrInPage">
            <text class="loginTextSmall">Save groups? login: </text>
            <BsFillPersonFill color="black" size={30} />
          </Link>
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
        <div key={group.id}>
          <Link
            to={{
              pathname: "/GroupPage",
              state: {
                group: group,
                startDate: group.startDate.toDate(),
                endDate: group.endDate.toDate(),
              },
            }}
          >
            <button className="GroupButtonStyle " id="createGroupButton">
              <IoIosClose
                onClick={() => deleteGroup(group)}
                class="crossButton"
                size={40}
              ></IoIosClose>
              <div className="d-flex justify-content-center" id="groupText">
                {group.groupName}
              </div>
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Homepage;
