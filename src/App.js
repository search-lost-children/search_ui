import logo from './logo.svg';
import './App.css';
import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import DocumentationPage from "./pages/documentation/Documentation";
import Coordinators from "./pages/Coordinators";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={'/documentation'} component={DocumentationPage}/>
          <Route path={'/searches/:id/coordinators/'} component={Coordinators}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
