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
import GuardedRoute from "./guarded";
import NewSearchPage from "./pages/New_Search_Page/NewSearchPage";
import TasksList from './pages/Tasks_List_Page/TasksList';

function App() {
    jwt_interceptor();
  return (
    <div className="App">
      <div className={"container"}>
          <Router>
            <Switch>
                <GuardedRoute path={'/documentation'} component={DocumentationPage}/>
                <GuardedRoute exact path={'/searches'} component={SearchesPage}/>
                <GuardedRoute exact path={'/searches/new'} component={NewSearchPage}/>
                <GuardedRoute exact path={'/searches/:id/coordinators/'} component={Coordinators}/>
                <GuardedRoute exact path={'/searches/:id/new_task'} component={NewTask}/>
                <GuardedRoute exact path={'/searches/:id/edit'} component={NewSearchPage}/>
                <GuardedRoute exact path={'/searches/:id/details'} component={SearchDetails}/>
                <GuardedRoute exact path={'/login_page/organizations'} component={Login_organization}/>
                <GuardedRoute exact path={'/searches/:id/new_task'} component={NewTask}/>
                <GuardedRoute exact path={'/searches/:id/tasks_list'} component={TasksList}/>
                <Route exact path={'/login_page'} component={Login_page}/>
                <Route exact path={'/registration_page'} component={Registration_page}/>
                <Route exact path={'/registration_error'} component={Registration_error}/>
            </Switch>
          </Router>
      </div>
    </div>
  );
}

export default App;
