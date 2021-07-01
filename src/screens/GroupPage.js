import React, { useContext } from "react";

import { Link } from "react-router-dom";
import "../styles/Homepage.css";
import "../styles/ModalGroup.css";
import { IoIosClose } from "react-icons/io";
import { FiCopy } from "react-icons/fi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsListCheck, BsListOl, BsPlus, BsThreeDots } from "react-icons/bs";

import { GroupContext } from "../screens/Context";

const GroupPage = () => {
  const { group } = useContext(GroupContext);
  const startDate = group.startDate.toDate();
  const endDate = group.startDate.toDate();

  return (
    <div className="modalGroup-content">
      <button className="crossButtonStyle">
        <Link to="/">
          <IoIosClose size={20}></IoIosClose>
        </Link>
      </button>
      <div class="inputGroup-container">
        <text class="groupTextPopup">{group.groupName} </text>
      </div>
      <div class="dateGroup-container">
        {startDate.toDateString() === endDate.toDateString() ? (
          <text class="dateTextPopup">
            {startDate.toDateString()}
            <br />
            {startDate.toTimeString().substring(0, 5)} -
            {endDate.toTimeString().substring(0, 5)}
          </text>
        ) : (
          <text class="dateTextPopup">
            {startDate.toString().substring(0, 21)} -
            {endDate.toString().substring(0, 21)}
          </text>
        )}
      </div>
      <div class="inputGroup-container">
        <input className="form-control GroupNameBox" value="12309420" />
        <CopyToClipboard text="12309420">
          <FiCopy class="icon-copy" size={30}></FiCopy>
        </CopyToClipboard>
      </div>
      <div class="navbar">
        <Link to="/GroupPage">
          <BsListOl color="black" size={40}></BsListOl>
        </Link>
        <Link to="/GroupPageList">
          <BsListCheck size={40}></BsListCheck>
        </Link>
        <Link to="/GroupPageAdd">
          <BsPlus size={40}></BsPlus>
        </Link>
        <Link to="/GroupPageSetting">
          <BsThreeDots size={40}></BsThreeDots>
        </Link>
      </div>
      <div class="navbar-line"></div>
      <div class="display-scoreChallenges">
        <text class="display-headerNumber"> 1. </text>
        <div>
          <text class="display-header"> Henrik G</text>
          <text class="display-score"> Score: 19/20</text>
        </div>
      </div>
      <div class="display-scoreChallenges">
        <text class="display-headerNumber"> 2. </text>
        <div>
          <text class="display-header"> Haakon Døssland</text>
          <text class="display-score"> Score: 16/20</text>
        </div>
      </div>
      <div class="display-scoreChallenges">
        <text class="display-headerNumber"> 3. </text>
        <div>
          <text class="display-header"> Hvem som helst andre</text>
          <text class="display-score"> Score: 13/20</text>
        </div>
      </div>
      <div class="display-scoreChallenges">
        <text class="display-headerNumber"> 4. </text>
        <div>
          <text class="display-header"> Hvem som helst andre</text>
          <text class="display-score"> Score: 11/20</text>
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
