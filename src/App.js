import logo from './logo.svg';
import './App.css';
import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import DocumentationPage from "./pages/documentation/Documentation";
import SearchesPage from "./pages/Searches_Page/SearchesPage";

function App() {
  return (
    <div className="App">
      <div></div>
      <div className={"container"}>
      <Router>
        <Switch>
          <Route path={'/documentation'} component={DocumentationPage}/>
          <Route exact path={'/searches'} component={SearchesPage}/>
        </Switch>
      </Router>
      </div>
      <div></div>
    </div>
  );
}

export default App;
