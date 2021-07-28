import "../styles/Homepage.css";
import "../styles/ModalGroup.css";

import GroupPageNavBar from "../screens/GroupPageNavBar";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

import { useLocation } from "react-router-dom";
import firebase from "../firebase";
import Modal from "react-modal";

function GroupPageSetting() {
  const location = useLocation();
  const { group /* , startDate, endDate  */ } = location.state;
  const [currentUser, setCurrentUser] = useState("");
  const [deleteOrLeave, setDeleteOrLeave] = useState("Forlat");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  //Gets current user
  useEffect(() => {
    const authListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser("");
      }
      firebase
        .firestore()
        .collection("groups")
        .doc(group.id)
        .collection("groupMembers")
        .doc(user.uid)
        .onSnapshot((doc) => {
          setIsAdmin(doc.data().isAdmin);
        });
    });
    return () => {
      authListener();
    };
  }, [group.id, currentUser]);

  useEffect(() => {
    //Gets groupmembers
    const unsubscribe = firebase
      .firestore()
      .collection("groups")
      .doc(group.id)
      .collection("groupMembers")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({
            id: doc.data().id,
            name: doc.data().name,
            score: doc.data().score,
            isAdmin: doc.data().isAdmin,
          });
        });
        setGroupMembers(items);
      });
    return () => {
      unsubscribe();
    };
  }, [group.id]);

  //Sets correct grammar when deleting or leaving group
  useEffect(() => {
    if (group.numberOfGroupMembers === 1) {
      setDeleteOrLeave("Slett");
    }
  }, [group.numberOfGroupMembers]);

  //Deletes group if groupmember is the only member in group, else the groupmember leaves the group
  function deleteGroup(group) {
    if (group.numberOfGroupMembers === 1) {
      firebase
        .firestore()
        .collection("groups")
        .doc(group.id)
        .delete()
        .catch((err) => {
          console.error(err);
        });
    } else {
      firebase
        .firestore()
        .collection("groups")
        .doc(group.id)
        .collection("groupMembers")
        .doc(currentUser.uid)
        .delete()
        .catch((err) => {
          console.error(err);
        });
      firebase
        .firestore()
        .collection("groups")
        .doc(group.id)
        .update({
          numberOfGroupMembers: firebase.firestore.FieldValue.increment(-1),
        });
    }
    firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("groupCodes")
      .doc(group.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }

  function makeAdmin(member) {
    firebase
      .firestore()
      .collection("groups")
      .doc(group.id)
      .collection("groupMembers")
      .doc(member.id)
      .update({ isAdmin: true });
  }

  return (
    <div className="modalGroup-content">
      {GroupPageNavBar(group /* , startDate, endDate */)}

      {isAdmin && !group.everyoneIsAdmin ? (
        <div className="display-membersNotAdminOuter">
          <label className="uncompletedChallengesText">
            Legg til nye medlem som admin i gruppa
          </label>
          <div>
            {groupMembers.map((member) =>
              !member.isAdmin ? (
                <div
                  className="display-membersNotAdminInner settings"
                  key={member.id}
                >
                  <label className="mediumText">{member.name}</label>

                  <button
                    className="DeleteButtonStyle"
                    onClick={() => {
                      makeAdmin(member);
                    }}
                  >
                    Legg til
                  </button>
                </div>
              ) : null
            )}
          </div>
        </div>
      ) : null}
      <div className="display-challenges">
        <label className="uncompletedChallengesText">
          {deleteOrLeave} denne gruppa
        </label>
        <button
          className="DeleteButtonStyle"
          onClick={() => setModalIsOpen(true)}
        >
          {deleteOrLeave}
        </button>
        <Modal
          isOpen={modalIsOpen}
          className="modal-content"
          ariaHideApp={false}
        >
          <IoIosClose
            onClick={() => setModalIsOpen(false)}
            className="modalClose"
            size={40}
          ></IoIosClose>
          <div className="input-container">
            <label className="textGruppe">
              Vil du {deleteOrLeave}e denne gruppen?
            </label>
          </div>
          <div className="button-container">
            <Link to="/">
              <button
                className="RedButtonStyle"
                onClick={() => {
                  deleteGroup(group);
                  setModalIsOpen(false);
                }}
              >
                {deleteOrLeave}
              </button>
            </Link>
          </div>
        </Modal>
      </div>
    </div>
  );
}
export default GroupPageSetting;
