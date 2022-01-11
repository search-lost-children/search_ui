import logo from './logo.svg';
import './App.css';
import React from "react";
import jwt_interceptor from "./config_interceptors";

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
import Login_page from './pages/login_pages/Login'
import Login_organization from "./pages/login_pages/login_organization";
import Registration_page from "./pages/login_pages/registration_page";
import Registration_error from "./pages/login_pages/registration_error";

function App() {
    jwt_interceptor();
  return (
    <div className="App">
      <div></div>
      <div className={"container"}>
      <Router>
        <Switch>
            <Route path={'/documentation'} component={DocumentationPage}/>
            <Route exact path={'/searches'} component={SearchesPage}/>
            <Route path={'/searches/:id/coordinators/'} component={Coordinators}/>
            <Route path={'/searches/:id/new_task'} component={NewTask}/>
            <Route exact path={'/searches/:id/details'} component={SearchDetails}/>
            <Route exact path={'/login_page/organizations'} component={Login_organization}/>
            <Route exact path={'/login_page'} component={Login_page}/>
            <Route exact path={'/registration_page'} component={Registration_page}/>
            <Route exact path={'/registration_error'} component={Registration_error}/>
        </Switch>
      </Router>
      </div>
      <div></div>
    </div>
  );
}

export default App;
