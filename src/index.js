import React from 'react';
import ReactDOM from 'react-dom';
import { firebaseApp } from './components/Firebase';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { Route, BrowserRouter as Router } from 'react-router-dom';

// Names components
import Navigation from './Navigation';
import App from './App';
import Registration from './components/Registration'
import Login from './components/Login';
import List from './components/List';

firebaseApp.auth().onAuthStateChanged(user => {
    user ? console.log(`user has signed in ${user}`) : console.log('user has signed out')
})

ReactDOM.render(
    <Router>
        <div className="container-fluid">
            <Navigation />

            <Route exact path='/' component={App} />
            <Route path='/registration' component={Registration} />
            <Route path='/login' component={Login} />
            <Route path='/list' component={List} />
        </div>
    </Router>,
    document.getElementById('root')
);
