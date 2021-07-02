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

  const rankings = [
    { rank: 1, name: "Henrik", score: "19 / 30" },
    { rank: 2, name: "Haakon Døssland", score: "16 / 30" },
    { rank: 3, name: "Hvem som helst andre", score: "14 / 30" },
    { rank: 4, name: "Hvem som helst andre", score: "11 / 30" },
  ];
  const listRankings = rankings.map((ranking) => (
    <div class="display-scoreChallenges">
      <text class="display-headerNumber"> {ranking.rank}. </text>
      <div>
        <text class="display-header"> {ranking.name}</text>
        <text class="display-score"> Score: {ranking.score}</text>
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
      <div>{listRankings}</div>
    </div>
  );
};

export default GroupPage;
