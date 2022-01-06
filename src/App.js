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
import NewTask from './pages/new_task/NewTask';
import SearchDetails from "./pages/Search_Details/SearchDetails";
import NewSearchPage from "./pages/New_Search_Page/NewSearchPage";

function App() {
  return (
    <div className="App">
      <div></div>
      <div className={"container"}>
      <Router>
        <Switch>
          <Route path={'/documentation'} component={DocumentationPage}/>
          <Route exact path={'/searches'} component={SearchesPage}/>
            <Route exact path={'/searches/new'} component={NewSearchPage}/>
            <Route exact path={'/searches/:id/edit'} component={NewSearchPage}/>
            <Route path={'/searches/:id/coordinators/'} component={Coordinators}/>
            <Route  path={'/searches/:id/new_task'} component={NewTask}/>
            <Route exact path={'/searches/:id/details'} component={SearchDetails}/>
        </Switch>
      </Router>
      </div>
      <div></div>
    </div>
  );
}

export default App;
