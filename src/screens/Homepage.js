import { BsFillPersonFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";
import "../styles/ModalGroup.css";
import firebase from "../firebase";
import "firebase/auth";
import "firebase/firestore";
import Modal from "react-modal";
import { HiUserGroup } from "react-icons/hi";

const Homepage = () => {
  const [groups, setGroups] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [groupCode, setGroupCode] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  /* const [count, setCount] = useState(0); */
  /* const exampleGroups = ["788618"  "964982" ]; */

  //Checks if groupmember has accomblished challenge
  function checkGroupMember(challenge) {
    var isMember = false;

    challenge.membersCompletedChallenge.map((member) =>
      member === currentUser.uid ? (isMember = true) : null
    );

    return isMember;
  }

  function createScore(groupCode) {
    let c = 0;
    firebase
      .firestore()
      .collection("groups")
      .doc(groupCode)
      .collection("challenges")
      .get()
      .then((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        items.map((i) => (checkGroupMember(i) ? (c += 1) : null));
        firebase
          .firestore()
          .collection("groups")
          .doc(groupCode)
          .collection("groupMembers")
          .doc(currentUser.uid)
          .update({ score: c });
      });
  }

  function checkUserInGroup() {
    groupCode
      ? firebase
          .firestore()
          .collection("users")
          .doc(currentUser.uid)
          .collection("groupCodes")
          .doc(groupCode)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setGroupCode("");
            } else {
              addGroup(groupCode);
            }
          })
      : setGroupCode("");
  }

  //Checks if groupCode exists
  function checkGroup() {
    groupCode
      ? firebase
          .firestore()
          .collection("groups")
          .doc(groupCode)
          .get()
          .then((doc) => {
            if (doc.exists) {
              checkUserInGroup();
              setGroupCode("");
            }
          })
      : setGroupCode("");
  }

  //Adds new group to current user
  function addGroup(groupCode) {
    let c = 0;
    firebase
      .firestore()
      .collection("groups")
      .doc(groupCode)
      .collection("challenges")
      .get()
      .then((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        items.map((i) => (checkGroupMember(i) ? (c += 1) : null));
      });
    firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("groupCodes")
      .doc(groupCode)
      .set({ groupId: groupCode });
    createScore(groupCode);
    firebase
      .firestore()
      .collection("groups")
      .doc(groupCode)
      .collection("groupMembers")
      .doc(currentUser.uid)
      .set({
        id: currentUser.uid,
        score: c,
        name: currentUser.displayName,
      });
    firebase
      .firestore()
      .collection("groups")
      .doc(groupCode)
      .update({
        numberOfGroupMembers: firebase.firestore.FieldValue.increment(1),
      });
    createScore(groupCode);
  }

  //Gets groups where current user is part of
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
        } /* else {
          //Har ingen reell funksjon, mulig man kan fjerne den hvis man finner en måte å unmoute på
          firebase
            .firestore()
            .collection("exampleGroups")
            .where("id", "in", exampleGroups)
            .onSnapshot((querySnapshot) => {
              const items = [];

              querySnapshot.forEach((doc) => {
                items.push(doc.data());
                console.log("hei");
              });
              setGroups(items);
            });
        } */
      });
    return () => {
      unsubscribe();
      console.log("Test");
    };
  }, [currentUser]);

  //Get current user
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
              <label className="loginTextSmall">Lagre gruppe? logg inn: </label>
              <BsFillPersonFill color="black" size={30} />
            </Link>
          </div>
        )}

        <h1 id="groupHead">Grupper</h1>

        <div className="inputCodeStyle">
          <form>
            <div className="col-xs-2">
              <input
                className="form-control "
                id="exampleFormControlInput"
                placeholder="Gruppekode"
                value={groupCode}
                onChange={(e) => {
                  setGroupCode(e.target.value);
                }}
              ></input>
            </div>
          </form>
          <button
            className="RedButtonStyle"
            onClick={() => {
              currentUser ? checkGroup() : setModalIsOpen(true);
            }}
          >
            Bli med
          </button>
          <Modal
            isOpen={modalIsOpen}
            className="modal-content"
            ariaHideApp={false}
          >
            <div className="input-container">
              <label className="textGruppe">Har du logget inn?</label>
            </div>
            <div className="button-container">
              <button
                className="RedButtonStyle"
                onClick={() => {
                  setModalIsOpen(false);
                }}
              >
                tilbake
              </button>
            </div>
          </Modal>
        </div>

        <div className="d-flex justify-content-center">
          {currentUser ? (
            <Link to="/CreateGroup">
              <button
                className="RedButtonStyle"
                id="createGroupButton"
                onClick={() => {
                  setModalIsOpen(true);
                }}
              >
                Opprett gruppe
              </button>
            </Link>
          ) : (
            <button
              className="RedButtonStyle"
              id="createGroupButton"
              onClick={() => {
                setModalIsOpen(true);
              }}
            >
              opprett gruppe
            </button>
          )}
        </div>
      </div>

      {groups.map((group) => (
        <div className="wrap" key={group.id}>
          <Link
            to={{
              pathname: "/GroupPage",
              state: {
                group: group,
                /* startDate: group.startDate.toDate(),
                endDate: group.endDate.toDate(), */
              },
            }}
          >
            <button className="GroupButtonStyle " id="createGroupButton">
              <div className="members">
                <HiUserGroup color="white" size={20} />
                <div className="memberNumber">{group.numberOfGroupMembers}</div>
              </div>
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
