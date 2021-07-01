import { BsFillPersonFill } from "react-icons/bs";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";
import "../styles/ModalGroup.css"
import { IoIosClose } from "react-icons/io";
import { FiCopy} from "react-icons/fi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsListCheck, BsListOl, BsPlus, BsThreeDots, BsCircle, BsCheckCircle } from "react-icons/bs";

const GroupPageList= () => {
  return (
    <div className ="modalGroup-content">
        <button 
        className="crossButtonStyle">
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
        <input
            className="form-control GroupNameBox"
            value="12309420"
            />
          <CopyToClipboard text="12309420">
            <FiCopy class="icon-copy" size={30}></FiCopy>
            </CopyToClipboard>
        </div>
        <div class="navbar">
        <Link to="/GroupPage">
            <BsListOl size={40}></BsListOl>
        </Link>
        <Link to="/GroupPageList">
            <BsListCheck color="black" size={40}></BsListCheck>
        </Link>
        <Link to="/GroupPageAdd">
            <BsPlus size={40}></BsPlus>
        </Link>
        <Link to="/GroupPageSetting">
            <BsThreeDots size={40}></BsThreeDots>
        </Link>
        </div>
        <div class="navbar-line">
        </div>
        <text class="uncompletedChallengesText">Uncompleted challenges</text>
        <div class="display-challengesUndone" >
        <text class="display-header">Ta en backflip fra 10 meteren</text>
        <div><BsCircle class="unchecked-circle" size={35}></BsCircle></div>
        </div>
        <div class="display-challengesUndone" >
        <text class="display-header"> Eksempel</text>
        <div><BsCircle class="unchecked-circle" size={35}></BsCircle></div>
        </div>
        <div class="display-challengesUndone" >
        <text class="display-header">Eksempel som er litt lenger for å se hva som skjer da</text>
        <div><BsCircle class="unchecked-circle" size={35}></BsCircle></div>
        </div>
        <div class="display-challengesUndone" >
        <text class="display-header"> Hva som helst</text>
        <div><BsCircle class="unchecked-circle" size={35}></BsCircle></div>
        </div>

        <text class="uncompletedChallengesText">Completed challenges</text>
        <div class="display-challengesDone" >
        <text class="display-header">Eksempel som er litt lenger for å se hva som skjer da</text>
        <div><BsCheckCircle  class="unchecked-circle" size={35}></BsCheckCircle ></div>
        </div>
        <div class="display-challengesDone" >
        <text class="display-header"> Hva som helst</text>
        <div><BsCheckCircle  class="unchecked-circle" size={35}></BsCheckCircle ></div>
        </div>
      </div>
  );
};

export default GroupPageList;