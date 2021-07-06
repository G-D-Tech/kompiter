import { BsFillPersonFill } from "react-icons/bs";
import React, { useEffect, useState, useLocation } from "react";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";
import "../styles/ModalGroup.css";
import firebase from "../firebase";
import { IoIosClose } from "react-icons/io";
import "firebase/auth";
import "firebase/firestore";
import userEvent from "@testing-library/user-event";

const Homepage = () => {
  const [groups, setGroups] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

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

  function deleteGroup(group) {
    ref
      .doc(group.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    getGroups();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser("");
      }
    });
  }, [groups]);

  return (
    <div>
      <div id="d-flex justify-content-center"></div>
      <div class="container">
        <label class="loginTextSmall" onClick={handleLogOut}>
          Logout
        </label>
        {currentUser ? (
          <div class="icon">
            <label class="loginTextSmall">{currentUser.displayName}</label>
            <Link to="/ProfilePage">
              <BsFillPersonFill color="black" size={30} />
            </Link>
          </div>
        ) : (
          <div class="icon">
            <Link to="/SignUpOrInPage">
              <label class="loginTextSmall">Save groups? login: </label>
              <BsFillPersonFill color="black" size={30} />
            </Link>
          </div>
        )}

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
