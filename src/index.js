import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

import { Route, BrowserRouter as Router } from 'react-router-dom';

// Names components
import Navigation from './Navigation';
import App from './App';
import { Registration } from './components/Registration';
import Profile from './components/Profile';
import List from './components/List';

export const UserProps = {
    name: '',
    email: '',
    password: '',
    error: '',
    isLoggedIn: false
}

ReactDOM.render(
    <Router>
        <div className="container-fluid">
            <Navigation />

            <Route exact path='/' component={App} />
            <Route path='/registration' component={Registration} />            
            <Route path="/profile" component={Profile} />
            <Route path="/list" component={List} />
        </div>
    </Router>,
    document.getElementById('root')
);
