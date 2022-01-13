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
import Coordinators from "./pages/Coordinators";
import SearchDetails from "./pages/Search_Details/SearchDetails";
import NewTask from './pages/new_task/NewTask';
import TasksList from './pages/Tasks_List_Page/TasksList';

function App() {
  return (
    <div className="App">
      <div></div>
      <div className={"container"}>
      <Router>
        <Switch>
          <Route path={'/documentation'} component={DocumentationPage}/>
          <Route exact path={'/searches'} component={SearchesPage}/>
            <Route path={'/searches/:id/coordinators/'} component={Coordinators}/>
            <Route exact path={'/searches/:id/details'} component={SearchDetails}/>
            <Route  path={'/searches/:id/new_task'} component={NewTask}/>
            <Route path={'/searches/:id/tasks_list'} component={TasksList}/>
        </Switch>
      </Router>
      </div>
      <div></div>
    </div>
  );
}

export default App;
