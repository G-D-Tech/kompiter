import Homepage from "../src/screens/Homepage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateGroup from "../src/screens/CreateGroup";
import GroupPage from "./screens/GroupPage";
import GroupPageList from "./screens/GroupPageList";
import GroupPageAdd from "./screens/GroupPageAdd";
import GroupPageSetting from "./screens/GroupPageSetting";

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
          <Route path="/GroupPage">
            <GroupPage />
          </Route>
          <Route path="/GroupPageList">
            <GroupPageList />
          </Route>
          <Route path="/GroupPageAdd">
            <GroupPageAdd />
          </Route>
          <Route path="/GroupPageSetting">
            <GroupPageSetting />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
