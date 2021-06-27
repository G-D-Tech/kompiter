import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "../styles/Homepage.css";
import { BsFillPersonFill } from "react-icons/bs";

import "../styles/CreateGroup.css";

import "react-datepicker/dist/react-datepicker.css";

//https://reactdatepicker.com
//https://openbase.com/js/react-datepicker
const CreateGroup = () => {
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
      </div>

      <h1 id="groupHead">New Group</h1>
      <div className="input-container">
        <text class="text">Group Name</text>
        <form class="form-inline">
          <div>
            <input
              class="form-control"
              id="exampleFormControlInput"
              placeholder="Feeest"
            ></input>
          </div>
        </form>
      </div>

      <div className=" input-container">
        <text class="text">Start date:</text>
        <DatePicker
          selected={startDate}
          showTimeSelect
          timeFormat="HH:mm"
          onChange={(date) => setStartDate(date)}
          dateFormat="MMMM d, yyyy HH:mm"
        />
      </div>
      <div className=" input-container">
        <text class="text">End date:</text>
        <DatePicker
          selected={endDate}
          showTimeSelect
          timeFormat="HH:mm"
          onChange={(date) => setEndDate(date)}
          dateFormat="MMMM d, yyyy HH:mm"
        />
      </div>
      <div class="container">
        <div className="form-check d-flex justify-content-center">
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
        <div className="form-check d-flex justify-content-center">
          <div class="CheckBoxStyle">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckChecked"
              unchecked
            />
            <label class="text" for="flexCheckChecked">
              Allow group members to confirm challenges
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
