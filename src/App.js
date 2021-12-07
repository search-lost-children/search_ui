import logo from './logo.svg';
import './App.css';
import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import DocumentationPage from "./pages/documentation/Documentation";
import NewTask from './pages/new_task/NewTask';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={'/documentation'} component={DocumentationPage}/>
          <Route  path={'/searches/:id/new_task'} component={NewTask}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
