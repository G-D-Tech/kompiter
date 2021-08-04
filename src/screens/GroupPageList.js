import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Homepage.css";
import "../styles/ModalGroup.css";
import "../styles/GroupPageList.css";
import firebase from "../firebase";
import storage from "../firebase";
import GroupPageNavBar from "../screens/GroupPageNavBar";
import { BsCircle, BsCheckCircle, BsCheck } from "react-icons/bs";

function GroupPageList() {
  const location = useLocation();
  const { group /* , startDate, endDate  */ } = location.state;
  const [challenges, setChallenges] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [imageModalIsOpen, setImageModalIsOpen] = useState(false);
  const [viewImageModalIsOpen, setViewImageModalIsOpen] = useState(false);
  const [imageIsSent, setImageIsSent] = useState(false);
  const [image, setImage] = useState(null);
  const [imageList, setImageList] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [fileName, setFileName] = useState();

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
    {
      closeAllViewImage();
      viewImageIsOpen(challenge);
      !imageUrl
        ? firebase
            .storage()
            .ref(`${group.id}/${currentUser.uid}/${challenge.id}`)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              setImageUrl(fireBaseUrl);
              const data = firebase.storage().refFromURL(fireBaseUrl);
              //console.log(data);
              //setImageList(data.name);
            })
            .catch((err) => {
              console.log("hei");
            })
        : closeAllViewImage();
    }
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
          membersCompletedChallenge: firebase.firestore.FieldValue.arrayRemove(
            currentUser.uid
          ),
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
            <div className="display-challengesDone">
              {/* {challenge.imageProof ? downloadFromFirebase(challenge) : null} */}
              <div>
                <div
                  className="imageIsOpen"
                  onClick={() => {
                    {
                      challenge.imageProof
                        ? downloadFromFirebase(challenge)
                        : changeBoolChallenge(challenge);
                    }
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
                    <img src={imageUrl} width="100%" />
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

              {/*                 <div className="d-flex justify-content-center">
                  {challenge.id === imageChallenge &&
                  imageName === currentUser.uid ? (
                    <img src={imageUrl} height="70px" />
                  ) : null}
                </div> */}
            </div>
          ) : (
            <div>
              {challenge.imageProof ? (
                <div className="display-challengesUndone">
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
                        className="unchecked-circle"
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
                        <label for="file">Velg bilde</label>
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
                </div>
              ) : (
                <div
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
                        className="unchecked-circle"
                        size={35}
                      ></BsCircle>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default GroupPageList;
