import './App.css';
import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import DocumentationPage from "./pages/documentation/Documentation";
import SearchesPage from "./pages/Searches_Page/SearchesPage";
import SearchSquad from "./pages/search-squad/SearchSquad";


function App() {
  return (
    <div className="App">
      <div></div>
      <div className={"container"}>
      <Router>
        <Switch>
          <Route path={'/documentation'} component={DocumentationPage}/>
          <Route exact path={'/searches'} component={SearchesPage}/>
            <Route path={'/search-squad'} component={SearchSquad}/>

        </Switch>
      </Router>
      </div>
      <div></div>
    </div>
  );
}

export default App;
