import logo from './logo.svg';
import './App.css';
import React from "react";


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import DocumentationPage from "./pages/documentation/Documentation";
import Login_page from './pages/login_pages/Login'
import Login_organization from "./pages/login_pages/login_organization";
import Registration_page from "./pages/login_pages/registration_page";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={'/documentation'} component={DocumentationPage}/>
          <Route exact path={'/login_page'} component={Login_page}/>
          <Route exact path={'/login_page/organizations'} component={Login_organization}/>
          <Route exact path={'/registration_page'} component={Registration_page}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
