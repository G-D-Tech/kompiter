import React, { useState, useEffect, useContext, useReducer } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "../styles/Homepage.css";
import { BsFillPersonFill } from "react-icons/bs";

import { v4 as uuidv4 } from "uuid";

import "../styles/CreateGroup.css";

import "react-datepicker/dist/react-datepicker.css";

import firebase from "../firebase";

//https://reactdatepicker.com
//https://openbase.com/js/react-datepicker

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");

  const ref = firebase.firestore().collection("groups");

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

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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

      <div className="input-container">
        <text class="text">Group Name</text>
        <form class="GoupNameBox">
          <div>
            <input
              class="form-control"
              id="exampleFormControlInput"
              placeholder="Feeest"
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
        </form>
      </div>

      <div className=" input-container">
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
      <button
        class="RedButtonStyle"
        onClick={() => {
          addGroup({ groupName, id: uuidv4(), startDate, endDate });
        }}
      >
        Create Group
      </button>
    </div>
  );
};

export default CreateGroup;
