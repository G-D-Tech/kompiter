import { BsFillPersonFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";
import "../styles/ModalGroup.css";
import firebase from "../firebase";
import "firebase/auth";
import "firebase/firestore";

const Homepage = () => {
  const [groups, setGroups] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [groupCode, setGroupCode] = useState("");

  // Create a function for fetching your data   See: https://dev.to/olimpioadolfo/how-to-cleanup-firestore-data-fetch-on-useeffect-18ed

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("groups")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        //console.log("hmm");
        setGroups(items);
      });
    return () => {
      unsubscribe();
      //console.log("Unsubscribe");
    };
  }, []);

  /*   useEffect(() => {
    firebase
      .firestore()
      .collection("groups")
      .doc(groupCode)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const items = [];
          items.push(doc.data());
          setGroups(items);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }); */

  useEffect(() => {
    const unlisten = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        //console.log("currentUser");
      } else {
        setCurrentUser("");
        //console.log("empty");
      }
    });
    //console.log("Building user");
    // this is run when component unmount
    return () => {
      unlisten();
      //console.log("Clean up user");
    };
  }, []);

  return (
    <div>
      <div id="d-flex justify-content-center"></div>
      <div class="container">
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
              <label class="loginTextSmall">Lagre grupper? logg inn: </label>
              <BsFillPersonFill color="black" size={30} />
            </Link>
          </div>
        )}

        <h1 id="groupHead">Grupper</h1>

        <div className="inputCodeStyle">
          <form>
            <div className="GroupNameBox">
              <input
                className="form-control"
                id="exampleFormControlInput"
                placeholder="123456"
                value={groupCode}
                onChange={(e) => {
                  setGroupCode(e.target.value);
                }}
              ></input>
            </div>
          </form>
          <button className="RedButtonStyle">join gruppe</button>
        </div>

        <div className="d-flex justify-content-center">
          <Link to="/CreateGroup">
            <button className="RedButtonStyle" id="createGroupButton">
              opprett gruppe
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
