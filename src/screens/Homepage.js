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
  const [groupCodes, setGroupCodes] = useState([]);
  //const [groupCodes, setGroupCodes] = useState([]);

  // Create a function for fetching your data   See: https://dev.to/olimpioadolfo/how-to-cleanup-firestore-data-fetch-on-useeffect-18ed

  function addGroup(groupCode) {
    firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("groupCodes")
      .doc(groupCode)
      .set({ groupId: groupCode });
    firebase
      .firestore()
      .collection("groups")
      .doc(groupCode)
      .collection("groupMembers")
      .doc(currentUser.uid)
      .set({ userId: currentUser.uid });
    firebase
      .firestore()
      .collection("groups")
      .doc(groupCode)
      .update({
        numberOfGroupMembers: firebase.firestore.FieldValue.increment(1),
      });
  }

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("groupCodes")
      .onSnapshot((querySnapshot) => {
        const groupCodes = [];
        querySnapshot.forEach((doc) => {
          groupCodes.push(doc.data().groupId);
        });
        setGroupCodes(groupCodes);
        if (currentUser && groupCodes.length > 0) {
          firebase
            .firestore()
            .collection("groups")
            .where("id", "in", groupCodes)
            .onSnapshot((querySnapshot) => {
              const items = [];
              querySnapshot.forEach((doc) => {
                items.push(doc.data());
              });
              setGroups(items);
            });
        } else {
          //Har ingen reell funksjon, mulig man kan fjerne den hvis man finner en måte å unmoute på
          firebase
            .firestore()
            .collection("groups")
            .onSnapshot((querySnapshot) => {
              const items = [];
              querySnapshot.forEach((doc) => {
                items.push(doc.data());
              });
            });
        }
      });

    return () => {
      unsubscribe();
    };
  }, [currentUser]);

  useEffect(() => {
    const authListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser("");
      }
    });
    return () => {
      authListener();
    };
  }, [currentUser]);

  return (
    <div>
      <div id="d-flex justify-content-center"></div>
      <div className="container">
        {currentUser ? (
          <div className="icon">
            <label className="loginTextSmall">{currentUser.displayName}</label>

            <Link to="/ProfilePage">
              <BsFillPersonFill color="black" size={30} />
            </Link>
          </div>
        ) : (
          <div className="icon">
            <Link to="/SignUpOrInPage">
              <label className="loginTextSmall">
                Lagre gruppe? logg inn:{" "}
              </label>
              <BsFillPersonFill color="black" size={30} />
            </Link>
          </div>
        )}

        <h1 id="groupHead">Grupper</h1>

        <div className="inputCodeStyle">
          <form>
            <div className="leggtilBox">
              <input
                className="form-control"
                id="exampleFormControlInput"
                placeholder="123456"
                value={groupCode}
                onChange={(e) => {
                  {
                    setGroupCode(e.target.value);
                  }
                }}
              ></input>
            </div>
          </form>
          <button
            className="RedButtonStyle"
            onClick={() => {
              addGroup(groupCode);
            }}
          >
            Legg til gruppe
          </button>
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
