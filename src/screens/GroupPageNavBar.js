import { Link, NavLink } from "react-router-dom";
import "../styles/NavBar.css";

import { IoIosClose } from "react-icons/io";
import { BsListCheck, BsListOl, BsPlus, BsThreeDots } from "react-icons/bs";
import { FiCopy } from "react-icons/fi";
import { CopyToClipboard } from "react-copy-to-clipboard";

function GroupPageNavBar(group, startDate, endDate) {
  return (
    <div>
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
        <NavLink
          exact
          to={{
            pathname: "/GroupPage",
            state: { group: group, startDate: startDate, endDate: endDate },
          }}
        >
          <BsListOl size={40} className="icon"></BsListOl>
        </NavLink>
        <NavLink
          to={{
            pathname: "/GroupPageList",
            state: { group: group, startDate: startDate, endDate: endDate },
          }}
        >
          <BsListCheck size={40} className="icon"></BsListCheck>
        </NavLink>
        <NavLink
          to={{
            pathname: "/GroupPageAdd",
            state: { group: group, startDate: startDate, endDate: endDate },
          }}
        >
          <BsPlus size={40} className="icon"></BsPlus>
        </NavLink>
        <NavLink
          to={{
            pathname: "/GroupPageSetting",
            state: { group: group, startDate: startDate, endDate: endDate },
          }}
        >
          <BsThreeDots size={40} className="icon"></BsThreeDots>
        </NavLink>
      </div>
      <div class="navbar-line"></div>
    </div>
  );
}

export default GroupPageNavBar;
