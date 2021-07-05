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

  const getGroups = () => {
    firebase
      .firestore()
      .collection("groups")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setGroups(items);
      });
  };

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

  return (
    <div>
      <div id="d-flex justify-content-center"></div>
      <div className="container">
        <div className="icon">
          <BsFillPersonFill size={30} />
        </div>

        <h1 id="groupHead">Group</h1>

        <div className="inputCodeStyle">
          <form>
            <div className="GroupNameBox">
              <input
                className="form-control"
                id="exampleFormControlInput"
                placeholder="123456"
              ></input>
            </div>
          </form>
          <button className="RedButtonStyle">Join Group</button>
        </div>

        <div className="d-flex justify-content-center">
          <Link to="/CreateGroup">
            <button className="RedButtonStyle" id="createGroupButton">
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
                className="crossButton"
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
