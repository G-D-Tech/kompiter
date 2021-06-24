import './App.css';
import { BsFillPersonFill} from "react-icons/bs";


function App() {
  return (
    <div class="container">

    <div class="icon"><BsFillPersonFill size={30}/></div> 

    <gruppeOverskrift>Group</gruppeOverskrift>
    <div /* class="d-flex justify-content-between" */ class="d-flex justify-content-center">
      <form class="form-inline" >
      <div>
        <input class="form-control" id="exampleFormControlInput" placeholder="123456"></input>
      </div>
      <button class="RedButtonStyle">Join Group</button>
      </form>
    </div>
    <div class="d-flex justify-content-center">
    <button class="RedButtonStyle" id="createGroupButton">Create Group</button>
    </div>
    <div class="d-flex justify-content-center">
    <button class="GroupButtonStyle" id="createGroupButton"><gruppeTekst>Group 1</gruppeTekst></button>
    </div>
    <div class="d-flex justify-content-center">
    <button class="GroupButtonStyle" id="createGroupButton"><gruppeTekst>Group 2</gruppeTekst></button>
    </div>
    <div class="d-flex justify-content-center">
    <button class="GroupButtonStyle" id="createGroupButton"><gruppeTekst>Group 3</gruppeTekst></button>
    </div>

    
    </div>
    
  );
}

export default App;
