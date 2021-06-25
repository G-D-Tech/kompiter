import Homepage from "../src/screens/Homepage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateGroup from "../src/screens/CreateGroup";

function App() {
  return (
    <Router>
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/CreateGroup">
            <CreateGroup />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
