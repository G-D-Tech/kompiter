import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "../styles/Homepage.css";
import { BsFillPersonFill } from "react-icons/bs";
import Modal from "react-modal";

import { v4 as uuidv4 } from "uuid";

import "../styles/CreateGroup.css";
import { FiCopy } from "react-icons/fi";
import "react-datepicker/dist/react-datepicker.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
//import { set } from "harmony-reflect";

import firebase from "../firebase";

//https://reactdatepicker.com
//https://openbase.com/js/react-datepicker

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const ref = firebase.firestore().collection("groups");
  const [randomNumber, setRandomNumber] = useState(0);

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
      <div className="container">
        <div className="icon">
          <BsFillPersonFill size={30}></BsFillPersonFill>
        </div>
        <Link to="/">
          <IoIosArrowBack className="IoIosArrowBack"></IoIosArrowBack>
        </Link>
        <h1 id="groupHead">New Group</h1>
      </div>

      <div className="input-container">
        <label className="text">Group Name</label>
        <form>
          <div className="GroupNameBox">
            <input
              className="form-control"
              id="exampleFormControlInput"
              placeholder="Feeest"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
        </form>
      </div>

      <div className="inputDate-container">
        <label className="text">Start date</label>
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
        <label className="text">End date</label>
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

      <div className="box-container">
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
      </div>
      <div className="button-container">
        <button
          className="RedButtonStyle"
          onClick={() => {
            setModalIsOpen(true);
            addGroup({ groupName, id: uuidv4(), startDate, endDate });
            setRandomNumber(Math.floor(100000 + Math.random() * 900000));
          }}
        >
          Create group
        </button>
      </div>
      {groupName ? (
        <Modal
          isOpen={modalIsOpen}
          className="modal-content"
          ariaHideApp={false}
        >
          <div className="input-container">
            <label className="text">
              {groupName} has been added to your groups
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
              <Link to="/">Done</Link>
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
            <label className="textError">Group name is not defined</label>
          </div>

          <div className="button-container">
            <button
              className="RedButtonStyle"
              onClick={() => setModalIsOpen(false)}
            >
              Back
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CreateGroup;
