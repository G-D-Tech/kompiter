import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Modal from "react-modal";
//import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "../styles/CreateGroup.css";
import "../styles/Homepage.css";

import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import { FiCopy } from "react-icons/fi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IoIosArrowBack } from "react-icons/io";

import { RiArrowDownSFill } from "react-icons/ri";

import firebase from "../firebase";

import { BsFillInfoCircleFill } from "react-icons/bs";

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
  const [adminInfo, setAdminInfo] = useState(false);
  const [groupTypeInfoOpen, setGroupTypeInfoOpen] = useState(false);

  const [groupType, setGroupType] = useState("checkBox");

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
      <div className="container">
        <Link to="/">
          <IoIosArrowBack className="IoIosArrowBack"></IoIosArrowBack>
        </Link>
        <h1 className="groupHead">Ny gruppe</h1>
      </div>
      <div className="input-container">
        <label className="text">Gruppenavn</label>
        <form>
          <div className="GroupNameBox">
            <input
              className="form-control"
              id="exampleFormControlInput"
              placeholder="Gruppenavn"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              autoComplete="off"
            />
          </div>
        </form>
      </div>
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

      <div className="d-flex justify-content-center container">
        <label className="checkboxContainer">
          <input type="checkbox" id="adminCheckbox"></input>
          <span className="checkmark"></span>
        </label>
        <label
          className="textAdmin"
          onClick={() => {
            setAdminInfo(!adminInfo);
          }}
        >
          Administrator
        </label>
        <RiArrowDownSFill
          size={20}
          className="iconArrowDown "
          onClick={() => {
            setAdminInfo(!adminInfo);
          }}
        ></RiArrowDownSFill>
      </div>
      {adminInfo ? (
        <label className="infoAdmin">
          Ved å huke av her vil bare du kunne legge til utfordringer i denne
          gruppa.
        </label>
      ) : null}

      {/* Choosing type of group */}
      <div className="d-flex flex-column container groupTypeContainer">
        <div className="groupTypeOuter">
          <label className="groupTypeText">Type gruppe:</label>
          <BsFillInfoCircleFill
            onClick={() => setGroupTypeInfoOpen(!groupTypeInfoOpen)}
          ></BsFillInfoCircleFill>

          {groupTypeInfoOpen ? (
            <div id="example-collapse-text">
              CheckBoxGroup er en type gruppe der hver gjennomførte utfordring
              gir 1. poeng. RankingGroup gir ulik poengsum avhengig av hvor bra
              du har gjort det i forhold til de andre gruppemedlemmene på den
              utfordringen.
            </div>
          ) : null}
        </div>

        <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
          <ToggleButton
            id="tbg-radio-1"
            value={1}
            onClick={() => setGroupType("checkBox")}
          >
            CheckboxGruppe
          </ToggleButton>
          <ToggleButton
            id="tbg-radio-2"
            value={2}
            onClick={() => setGroupType("ranking")}
          >
            RankingGruppe
          </ToggleButton>
        </ToggleButtonGroup>
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
      {groupName && currentUser ? (
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
          <div className="codeOutput">
            <input
              className="form-control GroupNameBox"
              placeholder={randomNumber}
            />
            <CopyToClipboard text={randomNumber}>
              <FiCopy className="icon-copy" size={30}></FiCopy>
            </CopyToClipboard>
          </div>

          <div className="button-container">
            <button
              className="RedButtonStyle"
              onClick={() => {
                document.getElementById("adminCheckbox").checked
                  ? addGroup({
                      groupName: groupName,
                      id: randomNumber,
                      //startDate: startDate,
                      //endDate: endDate,
                      numberOfGroupMembers: 1,
                      numberOfChallenges: 0,
                      everyoneIsAdmin: false,
                      groupType: groupType,
                    })
                  : addGroup({
                      groupName: groupName,
                      id: randomNumber,
                      //startDate: startDate,
                      //endDate: endDate,
                      numberOfGroupMembers: 1,
                      numberOfChallenges: 0,
                      everyoneIsAdmin: true,
                      groupType: groupType,
                    });
              }}
            >
              <Link to="/">ferdig</Link>
            </button>
          </div>
        </Modal>
      ) : (
        <Modal
          isOpen={modalIsOpen}
          className="modal-content"
          ariaHideApp={false}
        >
          <div className="input-container">
            <label className="textGruppe">Gruppenavn er ikke definert</label>
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
