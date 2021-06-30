import { BsFillPersonFill } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Homepage.css";
import "../styles/ModalGroup.css";
import { IoIosClose } from "react-icons/io";
import { FiCopy } from "react-icons/fi";
import { CopyToClipboard } from "react-copy-to-clipboard";

import firebase from "../firebase";

const GroupPage = () => {
  //const [modalIsOpen, setModalIsOpen] = useState(false);
  //const [group, setGroup] = useState(null);
  const location = useLocation();
  const { groupId } = location.state;
  const ref = firebase.firestore().collection("groups");

  function getGroup() {
    //setGroup(ref.where("id", "==", CreateGroup.groupId).get());
  }

  useEffect(() => {
    getGroup();
  });

  console.log(groupId);

  return (
    <div className="modalGroup-content">
      <button className="crossButtonStyle">
        <Link to="/">
          <IoIosClose size={20}></IoIosClose>
        </Link>
      </button>
      <div class="inputGroup-container">
        <text class="groupTextPopup"> Hei</text>
      </div>
      <div class="dateGroup-container">
        <text class="dateTextPopup"> 12.08.21</text>
        <text class="dateTextPopup"> 09:00 - 00:00</text>
      </div>
      <div class="inputGroup-container">
        <input className="form-control GroupNameBox" value="12309420" />
        <CopyToClipboard text="12309420">
          <FiCopy class="icon-copy" size={30}></FiCopy>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default GroupPage;
