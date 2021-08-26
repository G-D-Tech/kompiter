import React, { useState, useEffect } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import Modal from "react-modal";
//import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "../styles/CreateGroup.css";
import "../styles/Homepage.css";

import { FiCopy } from "react-icons/fi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IoIosArrowBack } from "react-icons/io";

import { RiArrowDownSFill } from "react-icons/ri";

import firebase from "../firebase";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import "bootstrap/dist/css/bootstrap.min.css"; //Used to display sortingType

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  //const [startDate, setStartDate] = useState(new Date());
  //const [endDate, setEndDate] = useState(new Date());
  const [randomNumber, setRandomNumber] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const ref = firebase.firestore();
  const [firstRun, setFirstRun] = useState(true);
  const [currentUser, setCurrentUser] = useState("");
  const [adminInfo, setAdminInfo] = useState(true);
  const [updateVar, setUpdateVar] = useState(false);
  const [groupType, setGroupType] = useState();

  function showCopiedText() {
    var x = document.getElementById("myLabel");
    if (x.style.display === "none") {
      x.style.marginLeft = "50%";
      x.style.display = "block";
      setTimeout(function () {
        x.style.display = "none";
      }, 1000);
    }
  }

  //Adds a new group to current user
  function addGroup(newGroup) {
    ref
      .collection("groups")
      .doc(newGroup.id)
      .set(newGroup)
      .catch((err) => {
        console.error(err);
      });
    ref
      .collection("users")
      .doc(currentUser.uid)
      .collection("groupCodes")
      .doc(newGroup.id)
      .set({ groupId: newGroup.id })
      .catch((err) => {
        console.error(err);
      });
    ref
      .collection("groups")
      .doc(newGroup.id)
      .collection("groupMembers")
      .doc(currentUser.uid)
      .set({
        id: currentUser.uid,
        score: 0,
        name: currentUser.displayName,
        isAdmin: true,
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //Gets current user
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
      {firstRun
        ? (setFirstRun(false),
          setRandomNumber("" + Math.floor(100000 + Math.random() * 900000)))
        : null}
      <div className="container opprettGruppeTop">
        <Link to="/">
          <IoIosArrowBack className="IoIosArrowBack"></IoIosArrowBack>
        </Link>
        <h1 className="opprettGruppeHeader">Opprett gruppe</h1>
        <label></label>
      </div>
      <div className="navbarTopOpprettGruppe"></div>
      <div>
        <label className="opprettGruppeSecondHeader">Navn</label>
        <form>
          <div className="GroupNameBox">
            <input
              className="form-control form-control1"
              type="text"
              id="exampleFormControlInput"
              placeholder="Gruppenavn"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              autoComplete="off"
            />
          </div>
        </form>
      </div>
      <div className="navbarTopOpprettUnder"></div>
      {/* <div className="inputDate-container">
        <label className="text">Startdato</label>
        <div className="dateBox">
          <DatePicker
            className="form-control 
        dateInput"
            selected={startDate}
            showTimeSelect
            timeFormat="HH:mm"
            onChange={(date) => setStartDate(date)}
            dateFormat="MMMM d, yyyy HH:mm"
          />
        </div>
      </div>
      <div className="inputDate-container">
        <label className="text">Sluttdato</label>
        <div className="dateBox">
          <DatePicker
            className="form-control 
        dateInput"
            selected={endDate}
            showTimeSelect
            timeFormat="HH:mm"
            onChange={(date) => setEndDate(date)}
            dateFormat="MMMM d, yyyy HH:mm"
          />
        </div>
      </div> */}

      <div>
        <label className="opprettGruppeSecondHeader">Administrator</label>
        <select
          className="ui search dropdown dropDown"
          onChange={(e) => setAdminInfo(e.target.value)}
        >
          <option value={true}>Alle</option>
          <option value={false}>Kun deg</option>
        </select>
        <div className="navbarTopOpprettUnder"></div>
      </div>
      <div>
        <label className="opprettGruppeSecondHeader">Type gruppe</label>
        <div className="d-flex justify-content-center marginTop ">
          <button
            className="hukeAvBox"
            onClick={() => setGroupType("checkBox")}
          >
            Huke av
          </button>
          <button
            className="rankeringBox"
            onClick={() => setGroupType("ranking")}
          >
            Rankering
          </button>
        </div>
        {groupType ? (
          groupType === "checkBox" ? (
            <div className="d-flex justify-content-center">
              <img src="/IMG_4846.PNG" width="250px" height="445px" alt="" />
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <img src="/IMG_4847.PNG" width="250px" height="445px" alt="" />
            </div>
          )
        ) : null}
      </div>

      <div className="button-container">
        <button
          className="RedButtonStyle"
          onClick={() => {
            setModalIsOpen(!modalIsOpen);
          }}
        >
          Opprett gruppe
        </button>
      </div>
      {console.log(adminInfo)}
      {groupName && groupType ? (
        <Modal
          isOpen={modalIsOpen}
          className="modal-content"
          ariaHideApp={false}
        >
          <div className="input-container">
            <label className="textGruppe">
              {groupName} har blitt lagt til i grupper
            </label>
          </div>
          <label id="myLabel" style={{ display: "none" }}>
            Kode kopiert
          </label>
          <div className="codeOutput">
            <input
              className="form-control GroupNameBox1"
              readOnly={true}
              value={randomNumber}
            />
            <CopyToClipboard text={randomNumber}>
              <FiCopy
                className="icon-copy1"
                size={30}
                onClick={() => showCopiedText()}
              ></FiCopy>
            </CopyToClipboard>
          </div>

          <div className="button-container">
            {console.log(adminInfo)}
            <Link to="/">
              <button
                className="RedButtonStyle"
                onClick={() => {
                  adminInfo === true
                    ? addGroup({
                        groupName: groupName,
                        id: randomNumber,
                        //startDate: startDate,
                        //endDate: endDate,
                        numberOfGroupMembers: 1,
                        numberOfChallenges: 0,
                        everyoneIsAdmin: true,
                        groupType: groupType,
                      })
                    : addGroup({
                        groupName: groupName,
                        id: randomNumber,
                        //startDate: startDate,
                        //endDate: endDate,
                        numberOfGroupMembers: 1,
                        numberOfChallenges: 0,
                        everyoneIsAdmin: false,
                        groupType: groupType,
                      });
                }}
              >
                ferdig
              </button>
            </Link>
          </div>
        </Modal>
      ) : (
        <Modal
          isOpen={modalIsOpen}
          className="modal-content"
          ariaHideApp={false}
        >
          <div className="input-container">
            <label className="textGruppe">
              Gruppenavn eller gruppe type er ikke definert
            </label>
          </div>

          <div className="button-container">
            <button
              className="RedButtonStyle"
              onClick={() => setModalIsOpen(false)}
            >
              tilbake
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CreateGroup;
