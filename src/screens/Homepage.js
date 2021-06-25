import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";

const Homepage = () => {
  return (
    <div class="container">
      <div class="icon">
        <BsFillPersonFill size={30} />
      </div>

      <h1 id="groupHead">Group</h1>
      <div
        /* class="d-flex justify-content-between" */ class="d-flex justify-content-center"
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
        <button class="GroupButtonStyle" id="createGroupButton">
          <h2 id="groupText">Group 1</h2>
        </button>
      </div>
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
