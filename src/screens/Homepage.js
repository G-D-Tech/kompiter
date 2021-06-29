import { BsFillPersonFill } from "react-icons/bs";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";
import Modal from 'react-modal';
import "../styles/ModalGroup.css"
import { IoIosClose } from "react-icons/io";
import { FiCopy} from "react-icons/fi";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Homepage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div class="container">
      <div class="icon">
        <BsFillPersonFill size={30} />
      </div>

      <h1 id="groupHead">Group</h1>
      <div class="d-flex justify-content-center"
      >
        <form class="form-inline">
          <div>
            <input
              class="form-control"
              id="exampleFormControlInput"
              placeholder="123456"
            ></input>
          </div>
          <button class="RedButtonStyle">Join Group</button>
        </form>
      </div>
      <div class="d-flex justify-content-center">
        <button class="RedButtonStyle" id="createGroupButton">
          <Link to="/CreateGroup">Create Group</Link>
        </button>
      </div>
      <div class="d-flex justify-content-center">
        <button 
        class="GroupButtonStyle" 
        id="createGroupButton"
        onClick={() => setModalIsOpen(true)}>
          <Link id="groupText" to="/GroupPage">Group 1</Link>
        </button>
      </div>
{/* 
      <Modal 
        isOpen={modalIsOpen}
        className="modalGroup-content"
        >
        <button 
        className="crossButtonStyle"
        onClick={() => setModalIsOpen(false)}>
        <IoIosClose size={20}></IoIosClose>
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
        </Modal> */}

      <div class="d-flex justify-content-center">
        <button class="GroupButtonStyle" id="createGroupButton">
          <h2 id="groupText">Group 2</h2>
        </button>
      </div>
      <div class="d-flex justify-content-center">
        <button class="GroupButtonStyle" id="createGroupButton">
          <h2 id="groupText">Group 3</h2>
        </button>
      </div>
    </div>
  );
};

export default Homepage;
