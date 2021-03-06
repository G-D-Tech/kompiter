import { Link, NavLink } from "react-router-dom";
import "../styles/NavBar.css";
import "../styles/ModalGroup.css";

import {
  /* IoIosClose, */
  IoIosArrowBack,
  IoIosPodium /* IoIosCheckmarkCircle */,
} from "react-icons/io";
import {
  /* BsListCheck, */
  BsCheckCircle,
  /* BsListOl, */
  /* BsPlus, */
  BsThreeDots,
  BsPencil,
} from "react-icons/bs";
import { FiCopy } from "react-icons/fi";
import { CopyToClipboard } from "react-copy-to-clipboard";

function GroupPageNavBar(group /* , startDate, endDate */) {
  function showCopiedText() {
    var x = document.getElementById("myLabel");
    if (x.style.display === "none") {
      x.style.display = "block";
      setTimeout(function () {
        x.style.display = "none";
      }, 2000);
    }
  }

  return (
    <div>
      <button className="backButtonStyle">
        <Link to="/">
          <IoIosArrowBack size={22}></IoIosArrowBack>
        </Link>
      </button>
      <div className="inputGroup-containerHeader">
        <label className="groupTextPopup">{group.groupName} </label>
      </div>
      {/* <div className="dateGroup-container">
        {startDate.toDateString() === endDate.toDateString() ? (
          <label className="dateTextPopup">
            {startDate.toDateString()}
            <br />
            {startDate.toTimeString().substring(0, 5)} -
            {endDate.toTimeString().substring(0, 5)}
          </label>
        ) : (
          <label className="dateTextPopup">
            {startDate.toString().substring(0, 21)} -
            {endDate.toString().substring(0, 21)}
          </label>
        )}
      </div> */}
      <div className="sendTilVenner">
        <label className="display-sendTilVenner">Send koden til venner</label>
      </div>
      <div className="inputGroup-container">
        <input
          className="form-control GroupCodeBox "
          readOnly={true}
          value={group.id}
        />
        <CopyToClipboard text={group.id}>
          <FiCopy
            className="icon-copy"
            size={30}
            onClick={() => showCopiedText()}
          ></FiCopy>
        </CopyToClipboard>
      </div>
      <div className="kode-kopiert">
        <label id="myLabel" style={{ display: "none" }}>
          Kode kopiert
        </label>
      </div>
      <div className="navbarStyle">
        <div className="navbar">
          <NavLink
            exact
            to={{
              pathname: "/GroupPage",
              state: {
                group: group /* , startDate: startDate, endDate: endDate */,
              },
            }}
          >
            <IoIosPodium size={40} className="navBarIcon"></IoIosPodium>
          </NavLink>
          <NavLink
            to={{
              pathname: "/GroupPageList",
              state: {
                group: group /* , startDate: startDate, endDate: endDate */,
              },
            }}
          >
            <BsCheckCircle size={36} className="navBarIcon"></BsCheckCircle>
          </NavLink>
          <NavLink
            to={{
              pathname: "/GroupPageAdd",
              state: {
                group: group /* , startDate: startDate, endDate: endDate */,
              },
            }}
          >
            <BsPencil size={33} className="navBarIcon"></BsPencil>
          </NavLink>
          <NavLink
            to={{
              pathname: "/GroupPageSetting",
              state: {
                group: group /* , startDate: startDate, endDate: endDate */,
              },
            }}
          >
            <BsThreeDots size={40} className="navBarIcon"></BsThreeDots>
          </NavLink>
        </div>
        <div className="navbar-line"></div>
      </div>
    </div>
  );
}

export default GroupPageNavBar;
