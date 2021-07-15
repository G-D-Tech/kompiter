import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "../styles/Homepage.css";
import Modal from "react-modal";

import "../styles/CreateGroup.css";
import { FiCopy } from "react-icons/fi";
import "react-datepicker/dist/react-datepicker.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

import firebase from "../firebase";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [randomNumber, setRandomNumber] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const ref = firebase.firestore().collection("groups");
  const [ex, setEx] = useState(false);
  //const randomNumber = "" + Math.floor(100000 + Math.random() * 900000);

  // ADD FUNCTION
  function addGroup(newGroup) {
    ref
      //.doc() use if for some reason you want that firestore generates the id
      .doc(newGroup.id)
      .set(newGroup)
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      {!ex
        ? (setEx(true),
          setRandomNumber("" + Math.floor(100000 + Math.random() * 900000)))
        : null}
      <div className="container">
        <Link to="/">
          <IoIosArrowBack className="IoIosArrowBack"></IoIosArrowBack>
        </Link>
        <h1 class="groupHead">Ny gruppe</h1>
      </div>
      <div className="input-container">
        <label className="text">Gruppenavn</label>
        <form>
          <div className="GroupNameBox">
            <input
              className="form-control"
              id="exampleFormControlInput"
              placeholder="Sommerfest 2021"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
        </form>
      </div>
      <div className="inputDate-container">
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
      </div>
      {/*       <div className="box-container">
        <div className="form-check ">
          <div className="CheckBoxStyle">
            <input
              className="form-check-input"
              type="checkbox"
              placeholder=""
              id="flexCheckChecked"
            />
            <label className="text">Allow other to add challenges</label>
          </div>
        </div>
      </div>
      <div className="box-container">
        <div className="form-check">
          <div className="CheckBoxStyle">
            <input
              className="form-check-input"
              type="checkbox"
              placeholder=""
              id="flexCheckChecked1"
            />
            <label className="text">
              Allow group members to confirm challenges
            </label>
          </div>
        </div>
      </div> */}
      <div className="button-container">
        <button
          className="RedButtonStyle"
          onClick={() => {
            setModalIsOpen(true);
            addGroup({
              groupName,
              id: randomNumber,
              startDate,
              endDate,
            }); //id: uuid4()
          }}
        >
          Opprett gruppe
        </button>
      </div>
      {groupName ? (
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
            <button className="RedButtonStyle">
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
            <label className="textError">Gruppenavn er ikke definert</label>
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
