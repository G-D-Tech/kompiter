import { BsFillPersonFill } from "react-icons/bs";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";
import "../styles/ModalGroup.css";
import firebase from "../firebase";
import "firebase/auth";
import "firebase/firestore";

const Homepage = () => {
  const [groups, setGroups] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  // Create Ref
  const isMounted = useRef(false);
  //const [error, setError] = useState("");

  const handleLogOut = () => {
    firebase.auth().signOut();
  };
  // Create a function for fetching your data   See: https://dev.to/olimpioadolfo/how-to-cleanup-firestore-data-fetch-on-useeffect-18ed
  const getGroups = () => {
    firebase
      .firestore()
      .collection("groups")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        if (isMounted.current) {
          setGroups(items);
        }
      });
    /* .catch((error) => {
        isMounted.current && setError(error);
      }); */
  };

  useEffect(() => {
    isMounted.current = true;
    getGroups();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser("");
      }
    });
    // this is run when component unmount
    return () => (isMounted.current = false);
  }, []);

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
        <div className="wrap" key={group.id}>
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
