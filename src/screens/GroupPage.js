import { useLocation } from "react-router-dom";

import "../styles/Homepage.css";
import "../styles/ModalGroup.css";

import GroupPageNavBar from "../screens/GroupPageNavBar";

import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import { BsCheck } from "react-icons/bs";
import { getAllByPlaceholderText } from "@testing-library/dom";

function GroupPage() {
  const location = useLocation();
  const { group /* , startDate, endDate */ } = location.state;
  const [groupMembers, setGroupMembers] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [totalChallenges, setTotalChallenges] = useState("0");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const firstMapping = true;
  const [viewImageModalIsOpen, setViewImageModalIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  function downloadFromFirebase(challenge, groupMember) {
    {
      closeAllViewImage();
      viewImageIsOpen(challenge);
      closeViewIsOpen(groupMember);
      !imageUrl
        ? firebase
            .storage()
            .ref(`${group.id}/${groupMember.id}/${challenge.id}`)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              setImageUrl(fireBaseUrl);
              const data = firebase.storage().refFromURL(fireBaseUrl);
              //console.log(data);
              //setImageList(data.name);
            })
            .catch(console.log("hei"))
        : closeAllViewImage();
    }
  }

  function closeAllViewImage() {
    for (let i = 0; i < challenges.length; i++) {
      challenges[i].viewImageIsOpen = false;
    }
    setImageUrl("");
  }

  function viewImageIsOpen(challenge) {
    challenge.viewImageIsOpen = !challenge.viewImageIsOpen;
    setViewImageModalIsOpen(!viewImageModalIsOpen);
  }

  function closeViewIsOpen(groupMember) {
    for (let i = 0; i < groupMembers.length; i++) {
      groupMembers[i].viewIsOpen = false;
    }
    setImageUrl("");
    groupMember.viewIsOpen = !groupMember.viewIsOpen;
    setModalIsOpen(!modalIsOpen);
  }

  function updateViewIsOpen(groupMember) {
    groupMember.viewIsOpen = !groupMember.viewIsOpen;
    setModalIsOpen(!modalIsOpen);
  }

  function viewIsOpen(groupMember) {
    groupMember.viewIsOpen = false;

    firstMapping = false;
  }

  function updateViewIsOpen(groupMember) {
    groupMember.viewIsOpen = !groupMember.viewIsOpen;
    setModalIsOpen(!modalIsOpen);
  }
  //Gets current challenges
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("groups")
      .doc(group.id)
      .collection("challenges")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setChallenges(items);
      });
    return () => {
      unsubscribe();
    };
  }, [group.id]);

  //Checks if groupmember has accomblished challenge
  function checkGroupMember(challenge, groupMember) {
    var isMember = false;

    challenge.membersCompletedChallenge.map((member) =>
      member === groupMember ? (isMember = true) : null
    );
    return isMember;
  }

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
    //Gets total number of challenges for each group
    /* const unsubscribe2 = firebase
      .firestore()
      .collection("groups")
      .doc(group.id)
      .onSnapshot((snapshot) =>
        setTotalChallenges(snapshot.data().numberOfChallenges)
      ); */

    return () => {
      unsubscribe();
      /* unsubscribe2(); */
    };
  }, [group.id]);

  return (
    <div className="modalGroup-content">
      {GroupPageNavBar(group /* , startDate, endDate */)}

      {groupMembers
        .sort((a, b) => b.score - a.score)
        .map((groupMember, index) => (
          <div>
            {groupMember.length === 3 ? viewIsOpen(groupMember) : null}
            {groupMember.viewIsOpen ? (
              <button
                className="display-scoreChallenges" //add flex for å ha ved siden av number og navn
                key={index + 1}
              >
                <div onClick={() => updateViewIsOpen(groupMember)}>
                  <label className="display-header">
                    {/* {index + 1}. */}
                    {groupMember.name}
                  </label>
                  <label className="display-score">
                    Score: {groupMember.score} / {challenges.length}
                  </label>
                  <label className="display-challengeScore">
                    Fullførte utfordringer{" "}
                  </label>
                </div>
                {challenges.map((challenge) =>
                  checkGroupMember(challenge, groupMember.id) ? (
                    <button
                      className="display-ScoreChallenges"
                      onClick={() =>
                        downloadFromFirebase(challenge, groupMember)
                      }
                    >
                      <div>
                        <label className="display-cDone">
                          {challenge.challengeName}
                        </label>
                      </div>
                      <div>
                        {challenge.viewImageIsOpen && imageUrl ? (
                          <div className="imageAndButton">
                            <img src={imageUrl} width="100%" />
                          </div>
                        ) : null}
                      </div>
                    </button>
                  ) : null
                )}
              </button>
            ) : (
              <button
                className="display-scoreChallenges"
                key={index + 1}
                onClick={() => updateViewIsOpen(groupMember)}
              >
                <div>
                  <label className="display-header">
                    {/* <label className="display-headerNumber"> {index + 1}. </label> */}
                    {groupMember.name}
                  </label>
                  {group.groupType === "ranking" ? (
                    <label className="display-score">
                      Score: {groupMember.score} /
                      {groupMembers.length * challenges.length}
                    </label>
                  ) : (
                    <label className="display-score">
                      Score: {groupMember.score} / {challenges.length}
                    </label>
                  )}
                </div>
              </button>
            )}
          </div>
        ))}
    </div>
  );
}

export default GroupPage;
