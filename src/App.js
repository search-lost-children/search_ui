import './App.css';
import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import DocumentationPage from "./pages/documentation/Documentation";
import SearchSquad from "./pages/search-squad/SearchSquad";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={'/documentation'} component={DocumentationPage}/>
          <Route path={'/search-squad'} component={SearchSquad}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
