import { BsFillPersonFill } from "react-icons/bs";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";
import "../styles/ModalGroup.css";
import { IoIosClose } from "react-icons/io";
import { FiCopy } from "react-icons/fi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  BsListCheck,
  BsListOl,
  BsPlus,
  BsThreeDots,
  BsToggleOn,
} from "react-icons/bs";

const GroupPageSetting = () => {
  const settings = [
    "Allow group members to confirm challenges",
    "Allow other to add challenges",
    "Verify challenge with picture",
  ];
  const listSettings = settings.map((setting) => (
    <div class="display-challenges">
      <text class="uncompletedChallengesText">{setting}</text>
      <div className="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckChecked1"
          unchecked
        />
        <label color="white" class="text" for="flexCheckChecked1"></label>
      </div>
    </div>
  ));
  return (
    <div className="modalGroup-content">
      <button className="crossButtonStyle">
        <Link to="/">
          <IoIosClose size={20}></IoIosClose>
        </Link>
      </button>
      <div class="inputGroup-container">
        <text class="groupTextPopup"> Group 1</text>
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
      <div class="navbar">
        <Link to="/GroupPage">
          <BsListOl size={40}></BsListOl>
        </Link>
        <Link to="/GroupPageList">
          <BsListCheck size={40}></BsListCheck>
        </Link>
        <Link to="/GroupPageAdd">
          <BsPlus size={40}></BsPlus>
        </Link>
        <Link to="/GroupPageSetting">
          <BsThreeDots color="black" size={40}></BsThreeDots>
        </Link>
      </div>
      <div>
        <div class="navbar-line"></div>
        <div>{listSettings}</div>
      </div>
    </div>
  );
};
export default GroupPageSetting;
