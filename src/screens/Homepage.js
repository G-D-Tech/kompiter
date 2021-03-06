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
import { FaLongArrowAltRight } from "react-icons/fa";

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
    //Set if currentUser is admin
    firebase
      .firestore()
      .collection("groups")
      .doc(groupCode)
      .get()
      .then((doc) => {
        if (doc.data().everyoneIsAdmin) {
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
              isAdmin: true,
            });
        } else {
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
              isAdmin: false,
            });
        }
      });
    //UN??DVENDIG??
    /* firebase
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
      }); */
    //Add groupcode to currentUser
    firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("groupCodes")
      .doc(groupCode)
      .set({ groupId: groupCode });
    createScore(groupCode);
    //Increase number of members in current group
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
    if (currentUser) {
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
          if (groupCodes.length > 0) {
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
          //Har ingen reell funksjon, mulig man kan fjerne den hvis man finner en m??te ?? unmoute p??
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
      };
    }
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
    <div className="background">
      <div className="container">
        <div>
          {currentUser ? (
            <div className="icon">
              <label className="loginTextSmall">
                {currentUser.displayName}
              </label>

              <Link to="/ProfilePage">
                <BsFillPersonFill color="black" size={30} />
              </Link>
            </div>
          ) : (
            <div className="icon">
              <Link to="/SignUpOrInPage">
                <label className="loginTextSmall">logg inn: </label>
                <BsFillPersonFill color="black" size={30} />
              </Link>
            </div>
          )}
        </div>
        <div id="groupHead">
          <img src="/fullLogoKompit.png" height="50px" alt="" />
        </div>

        <div className="inputCodeStyle">
          <div className="leftColumn">
            <form>
              <input
                className="form-control form-control2"
                id="exampleFormControlInput"
                placeholder="Gruppekode"
                value={groupCode}
                onChange={(e) => {
                  setGroupCode(e.target.value);
                }}
              ></input>
            </form>
          </div>
          <div className="rightColumn">
            <button
              className="AddCodeButton"
              onClick={() => {
                currentUser ? checkGroup() : setModalIsOpen(true);
              }}
            >
              Bli med
            </button>
          </div>
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
              Opprett gruppe
            </button>
          )}
        </div>
      </div>
      {currentUser ? null : (
        <div className="d-flex justify-content-center imageStyle">
          <img src="/KompiteFirstImage.png" height="350px" alt="" />
        </div>
      )}
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
            <button className="GroupButtonStyle" id="createGroupButton">
              <div className="d-flex justify-content-left" id="groupText">
                {group.groupName}
                <FaLongArrowAltRight className="iconLongArrow" size={28} />
              </div>
              <div className="members">
                <HiUserGroup color="#5989F5" size={20} />
                <div className="memberNumber">{group.numberOfGroupMembers}</div>
              </div>
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Homepage;
