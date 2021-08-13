import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Homepage.css";
import "../styles/ModalGroup.css";
import "../styles/GroupPageList.css";
import firebase from "../firebase";
//import storage from "../firebase";
import GroupPageNavBar from "../screens/GroupPageNavBar";
import { BsCircle, BsCheckCircle } from "react-icons/bs";

function GroupPageList() {
  const location = useLocation();
  const { group /* , startDate, endDate  */ } = location.state;
  const [challenges, setChallenges] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);
  const [imageModalIsOpen, setImageModalIsOpen] = useState(false);
  const [viewImageModalIsOpen, setViewImageModalIsOpen] = useState(false);
  const [imageIsSent, setImageIsSent] = useState(false);
  const [image, setImage] = useState(null);
  //const [imageList, setImageList] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [fileName, setFileName] = useState();

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
        .doc(currentUser.uid)
        .onSnapshot((doc) => {
          if (doc.data() !== undefined) {
            setIsAdmin(doc.data().isAdmin);
          }
        });
    });
    return () => {
      authListener();
    };
  }, [group.id, currentUser]);

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

  //For checkBoxGroups
  function CheckBoxGroup() {
    function uploadToFirebase(challenge) {
      firebase
        .storage()
        .ref(`${group.id}/${currentUser.uid}/${challenge.id}`)
        .put(image)
        .then(() => {
          challenge.imageIsSent = !challenge.imageIsSent;
          setImageIsSent(!imageIsSent);
          changeBoolChallenge(challenge);
        });
    }

    function deleteImage(challenge) {
      setImageUrl("");
      viewImageIsOpen(challenge);
      changeBoolChallenge(challenge);
      firebase
        .storage()
        .ref(`${group.id}/${currentUser.uid}/${challenge.id}`)
        .delete();
    }

    function downloadFromFirebase(challenge) {
      closeAllViewImage();
      viewImageIsOpen(challenge);
      !imageUrl
        ? firebase
            .storage()
            .ref(`${group.id}/${currentUser.uid}/${challenge.id}`)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              setImageUrl(fireBaseUrl);
              //const data = firebase.storage().refFromURL(fireBaseUrl);
              //console.log(data);
              //setImageList(data.name);
            })
            .catch((err) => {
              console.log("hei");
            })
        : closeAllViewImage();
    }

    function closeAllViewImage() {
      for (let i = 0; i < challenges.length; i++) {
        challenges[i].viewImageIsOpen = false;
      }
      setImageUrl("");
    }

    function onImageChange(e) {
      const reader = new FileReader();
      let file = e.target.files[0]; // get the supplied file
      // if there is a file, set image to that file
      if (file) {
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImage(file);
            setFileName(file.name);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
        // if there is no file, set image back to null
      } else {
        setImage(null);
      }
    }

    function updateImageIsOpen(challenge) {
      challenge.imageIsOpen = !challenge.imageIsOpen;
      setImageModalIsOpen(!imageModalIsOpen);
    }

    function viewImageIsOpen(challenge) {
      challenge.viewImageIsOpen = !challenge.viewImageIsOpen;
      setViewImageModalIsOpen(!viewImageModalIsOpen);
    }

    //Checks if challenge is finnished and updates firestore
    function changeBoolChallenge(challenge) {
      if (checkGroupMember(challenge)) {
        firebase
          .firestore()
          .collection("groups")
          .doc(group.id)
          .collection("challenges")
          .doc(challenge.id)
          .update({
            membersCompletedChallenge:
              firebase.firestore.FieldValue.arrayRemove(currentUser.uid),
          });
        firebase
          .firestore()
          .collection("groups")
          .doc(group.id)
          .collection("groupMembers")
          .doc(currentUser.uid)
          .update({ score: firebase.firestore.FieldValue.increment(-1) });
      } else {
        firebase
          .firestore()
          .collection("groups")
          .doc(group.id)
          .collection("challenges")
          .doc(challenge.id)
          .update({
            membersCompletedChallenge: firebase.firestore.FieldValue.arrayUnion(
              currentUser.uid
            ),
          });
        firebase
          .firestore()
          .collection("groups")
          .doc(group.id)
          .collection("groupMembers")
          .doc(currentUser.uid)
          .update({ score: firebase.firestore.FieldValue.increment(1) });
      }
    }

    //Checks if groupmember has accomblished challenge
    function checkGroupMember(challenge) {
      var isMember = false;
      challenge.membersCompletedChallenge.map((member) =>
        member === currentUser.uid ? (isMember = true) : null
      );
      return isMember;
    }

    return (
      <div>
        {challenges.map((challenge) => (
          <div key={challenge.id}>
            {checkGroupMember(challenge) ? (
              <button className="display-challengesDone">
                <div>
                  <div
                    className="imageIsOpen"
                    onClick={() => {
                      challenge.imageProof
                        ? downloadFromFirebase(challenge)
                        : changeBoolChallenge(challenge);
                    }}
                  >
                    <div>
                      <label className="display-header">
                        {challenge.challengeName}
                      </label>
                      {challenge.imageProof ? (
                        <label className="imageProofText">Vis bilde</label>
                      ) : null}
                    </div>
                    <div>
                      <BsCheckCircle
                        className="unchecked-circle"
                        size={39}
                      ></BsCheckCircle>
                    </div>
                  </div>

                  {challenge.viewImageIsOpen ? (
                    <div className="imageAndButton">
                      <img src={imageUrl} width="100%" alt="" />
                      <div>
                        <button
                          className="imageDeleteButtonStyle"
                          onClick={() => {
                            deleteImage(challenge);
                          }}
                        >
                          Slett
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </button>
            ) : (
              <div>
                {challenge.imageProof ? (
                  <button className="display-challengesUndone">
                    <div
                      className="imageIsOpen"
                      onClick={() => {
                        updateImageIsOpen(challenge);
                      }}
                    >
                      <div>
                        <label className="display-header">
                          {challenge.challengeName}
                        </label>
                        <label className="imageProofText">
                          Krever bildebevis
                        </label>
                      </div>
                      <div>
                        <BsCircle
                          className="unChecked-circle"
                          size={30}
                        ></BsCircle>
                      </div>
                    </div>

                    {challenge.imageIsOpen ? (
                      <div>
                        <div className="file-input">
                          <input
                            type="file"
                            id="file"
                            class="file"
                            onChange={(e) => {
                              onImageChange(e);
                            }}
                          />
                          <label htmlFor="file">Velg bilde</label>
                          <p className="file-name">{fileName}</p>
                        </div>
                        <div
                          className="imageAddButtonStyle"
                          onClick={() =>
                            image
                              ? (uploadToFirebase(challenge), setImage(""))
                              : null
                          }
                        >
                          Legg til
                        </div>
                      </div>
                    ) : null}
                  </button>
                ) : (
                  <button
                    className="display-challengesUndone"
                    onClick={() => {
                      changeBoolChallenge(challenge);
                    }}
                  >
                    <div className="imageIsOpen">
                      <label className="display-header">
                        {challenge.challengeName}
                      </label>
                      <div>
                        <BsCircle
                          className="unChecked-circle"
                          size={35}
                        ></BsCircle>
                      </div>
                    </div>
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  //For rankingGroups
  function RankingGroup() {
    const [resultsForChallenge, setResultsForChallenge] = useState([]);

    //Closes the challenge
    function closeOneChallenge(challenge) {
      challenge.challengeIsOpen = false;
      setResultsForChallenge([]);
    }

    //Opens one specific challenge and gets the results
    function openCorrectChallenge(challenge) {
      for (let i = 0; i < challenges.length; i++) {
        //Closes all challenges
        challenges[i].challengeIsOpen = false;
      }
      challenge.challengeIsOpen = true;
      //Gets saved results for challenge
      firebase
        .firestore()
        .collection("groups")
        .doc(group.id)
        .collection("challenges")
        .doc(challenge.id)
        .collection("results")
        .onSnapshot((querySnapshot) => {
          const items = [];
          querySnapshot.forEach((doc) => {
            items.push(doc.data());
          });
          setResultsForChallenge(items);
        });
    }

    //Saves the updated results to firebase when the save-button is pressed
    function setResultInFirestore(challenge) {
      resultsForChallenge.map((res) => {
        firebase
          .firestore()
          .collection("groups")
          .doc(group.id)
          .collection("challenges")
          .doc(challenge.id)
          .collection("results")
          .doc(res.id)
          .set({
            id: res.id,
            challengeResult: res.challengeResult,
            challengeScore: res.score,
          });
        return resultsForChallenge;
      });
      setResultsForChallenge([]);
      groupMembers.map((groupmember) => {
        updateTotalScore(groupmember);
        return groupMembers;
      });
      closeOneChallenge(challenge);
    }

    //Update challenge
    function updateTotalScore(groupmember) {
      groupmember.score = 0;
      if (groupmember !== undefined) {
        challenges.map((challenge) => {
          firebase
            .firestore()
            .collection("groups")
            .doc(group.id)
            .collection("challenges")
            .doc(challenge.id)
            .collection("results")
            .onSnapshot((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                if (groupmember.id === doc.data().id) {
                  groupmember.score += doc.data().challengeScore;
                }
              });
              /* console.log(groupmember.id + " " + groupmember.score); */
              firebase
                .firestore()
                .collection("groups")
                .doc(group.id)
                .collection("groupMembers")
                .doc(groupmember.id)
                .update({ score: groupmember.score });
            });
          return challenges;
        });
      }
    }

    //Gets the results that is displayed as default value in the input field
    function getResultForMember(groupmember) {
      let memberResult = "";
      for (let i = 0; i < resultsForChallenge.length; i++) {
        if (resultsForChallenge[i].id === groupmember.id) {
          memberResult = resultsForChallenge[i].challengeResult;
        }
      }
      return memberResult;
    }

    //Gets the results that is displayed as default value in the input field
    function sortingResultForMember(groupmember, challenge) {
      if (challenge.sortingType === "høy") {
        return getResultForMember(groupmember);
      } else {
        return -getResultForMember(groupmember);
      }
    }

    //Sets results when the results is changed in the input field
    function setResultForMember(result, groupmember) {
      resultsForChallenge.map((ress) => {
        if (groupmember.id === ress.id) {
          ress.challengeResult = result;
        }
        return resultsForChallenge;
      });
    }

    function setChallengeScore(challenge) {
      challenge.score = groupMembers.length;
    }

    function addRankForMember(groupmember, challenge) {
      resultsForChallenge.map((ress) => {
        if (groupmember.id === ress.id) {
          ress.score = challenge.score;
          challenge.score--;
        }
        return resultsForChallenge;
      });
    }

    return (
      <div>
        {challenges.map((challenge) => (
          <div key={challenge.id} className="display-scoreChallenges">
            {setChallengeScore(challenge)}
            <div className="display-challenges-ranking">
              {/* {challenge.length === 3 ? challengeIsOpen(challenge) : null} */}
              {/* {console.log(challenge)} */}

              <label className="display-header">
                {challenge.challengeName}
              </label>
              {challenge.challengeIsOpen ? (
                <button
                  className="AddResultButton"
                  key={challenge.id}
                  onClick={() => closeOneChallenge(challenge)}
                >
                  <label className="no-margin">Lukk</label>
                </button>
              ) : (
                <button
                  className="AddResultButton"
                  key={challenge.id}
                  onClick={() => openCorrectChallenge(challenge)}
                >
                  <label className="no-margin">Legg til resultat</label>
                </button>
              )}
            </div>
            {challenge.challengeIsOpen ? (
              <div className="margin-bottom">
                {isAdmin ? (
                  groupMembers
                    .sort(
                      (a, b) =>
                        sortingResultForMember(b, challenge) -
                        sortingResultForMember(a, challenge)
                    )
                    .map((groupmember) => (
                      <div
                        className="display-challenges-ranking margin"
                        key={groupmember.id}
                      >
                        {addRankForMember(groupmember, challenge)}

                        <label className="display-challengeScore">
                          {groupmember.name}
                        </label>
                        <form>
                          <div className="result-form-div">
                            <input
                              type="number"
                              className="form-control form-control-width"
                              defaultValue={getResultForMember(groupmember)}
                              onChange={(e) =>
                                setResultForMember(e.target.value, groupmember)
                              }
                              autoComplete="off"
                            />
                          </div>
                        </form>
                      </div>
                    ))
                ) : (
                  <div>Mulighet for å oppdatere bare egne resultater</div>
                )}
                <div className="d-flex justify-content-center">
                  {console.log(resultsForChallenge)}
                  <button
                    className="imageDeleteButtonStyle"
                    key={challenge.id}
                    onClick={() => setResultInFirestore(challenge)}
                  >
                    Lagre
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="modalGroup-content">
        {GroupPageNavBar(group /* , startDate, endDate */)}
      </div>
      {group.groupType === "ranking" ? RankingGroup() : CheckBoxGroup()}
    </div>
  );
}

export default GroupPageList;
