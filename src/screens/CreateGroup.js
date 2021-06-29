import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "../styles/Homepage.css";
import { BsFillPersonFill } from "react-icons/bs";
import Modal from 'react-modal'
import "../styles/CreateGroup.css";
import { FiCopy} from "react-icons/fi";
import "react-datepicker/dist/react-datepicker.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { set } from "harmony-reflect";

//https://reactdatepicker.com
//https://openbase.com/js/react-datepicker
const CreateGroup = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [groupName, setGroupName] = useState(null);

  return (
    <div>
      <div class="container">
        <div class="icon">
          <BsFillPersonFill size={30}></BsFillPersonFill>
        </div>
        <Link to="/">
          <IoIosArrowBack class="IoIosArrowBack"></IoIosArrowBack>
        </Link>
        <h1 id="groupHead">New Group</h1>
      </div>

    
      <div className="input-container" >
        <text class="text">Group Name</text>
        <form>
          <div class="GroupNameBox">
            <input
              class="form-control"
              id="exampleFormControlInput"
              placeholder="17.mai fest"
              onChange={(e) => {setGroupName(e.target.value);}}
            ></input>
          </div>
        </form>
      </div>
      
      <div className="input-container">
        <text class="text">Start date</text>
        <DatePicker
          selected={startDate}
          showTimeSelect
          timeFormat="HH:mm"
          onChange={(date) => setStartDate(date)}
          dateFormat="MMMM d, yyyy HH:mm"
        />
      </div>
      <div className=" input-container">
        <text class="text">End date</text>
        <DatePicker
          selected={endDate}
          showTimeSelect
          timeFormat="HH:mm"
          onChange={(date) => setEndDate(date)}
          dateFormat="MMMM d, yyyy HH:mm"
        />
      </div>
      <div class="box-container">
      <div class="t">
        <div className="form-check ">
          <div class="CheckBoxStyle">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckChecked"
              unchecked
            />
            <label class="text" for="flexCheckChecked">
              Allow other to add challenges
            </label>
          </div>
        </div>
        <div className="form-check">
          <div class="CheckBoxStyle">
          <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckChecked1"
              unchecked
            />
            <label class="text" for="flexCheckChecked1">
              Allow group members to confirm challenges
            </label>
          </div>
        </div>
        </div>
        </div>
        <div class="button-container">
        <button 
        className="RedButtonStyle"
        onClick={() => setModalIsOpen(true)}>Create group
          </button>
        </div>
        {groupName ? (<Modal 
        isOpen={modalIsOpen}
        className="modal-content"
        >
        <div class="input-container">
        <text class="text">{groupName} has been added to your groups</text>
        </div>
        <div class="codeOutput">
        
        <input
            className="form-control GroupNameBox"
            value="12309420"
            />
          <CopyToClipboard text="12309420">
            <FiCopy class="icon-copy" size={30}></FiCopy>
            </CopyToClipboard>
        </div>
        <div class="button-container">
        <button 
        className="RedButtonStyle">
          <Link to="/">Done</Link>
          </button>
        </div>
        </Modal>) 

        
        : <Modal 
        isOpen={modalIsOpen}
        className="modal-content"
        >
        <div class="input-container">
        <text class="textError">Group name is not defined</text>
        </div>

        <div class="button-container">
        <button 
        className="RedButtonStyle"
        onClick={() => setModalIsOpen(false)}
        >Back
          </button>
        </div>
        </Modal>}

    </div>
  );
};

export default CreateGroup;
