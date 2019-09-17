import React from 'react';
import ReactDOM from 'react-dom';
import logo from './images/logo.gif';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { Route, NavLink, BrowserRouter as Router } from 'react-router-dom';

// Names components
import App from './App';
import Registration from './components/Registration'
import Login from './components/Login';
import List from './components/List';

ReactDOM.render(
    <Router>
        <div>
            <nav className="navbar navbar-expand-sm bg-light navbar-light">
                <a className="navbar-brand" href="/">
                    <img src={logo} width="120" className="logo" alt="logo" />
                </a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" exact to='/'>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/registration">Registration</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/login">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/list">List</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

            <Route exact path='/' component={App} />
            <Route path='/registration' component={Registration} />
            <Route path='/login' component={Login} />
            <Route path='/list' component={List} />
        </div>
    </Router>,
    document.getElementById('root')
);
