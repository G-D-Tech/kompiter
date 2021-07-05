import Homepage from "../src/screens/Homepage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateGroup from "../src/screens/CreateGroup";
import GroupPage from "./screens/GroupPage";
import GroupPageList from "./screens/GroupPageList";
import GroupPageAdd from "./screens/GroupPageAdd";
import GroupPageSetting from "./screens/GroupPageSetting";
import LoginPage from "./screens/LoginPage";
import SignUpOrInPage from "./screens/SignUpOrInPage";
import SignUpPage from "./screens/SignUpPage";

import { GroupProvider } from "./contexts/GroupContext";

function App() {
  return (
    <GroupProvider>
      <Router>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/CreateGroup">
              <CreateGroup />
            </Route>
            <Route exact path="/GroupPage">
              <GroupPage />
            </Route>
            <Route exact path="/GroupPageList">
              <GroupPageList />
            </Route>
            <Route exact path="/GroupPageAdd">
              <GroupPageAdd />
            </Route>
            <Route exact path="/GroupPageSetting">
              <GroupPageSetting />
            </Route>
            <Route exact path="/LoginPage">
              <LoginPage />
            </Route>
            <Route exact path="/SignUpOrInPage">
              <SignUpOrInPage />
            </Route>
            <Route exact path="/SignUpPage">
              <SignUpPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </GroupProvider>
  );
}

export default App;
