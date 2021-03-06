import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';
import { UserProps } from './index';

import logo from './images/logo.gif';

export default class Navigation extends Component {

    constructor() {
        super();
        this.state = {
            ...UserProps
        }
    }
    


    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-light navbar-light">
                <a className="navbar-brand" href="/">
                    <img src={logo} width="100" className="logo" alt="logo" />
                    <span>Mikro-F</span>
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
                            <NavLink activeClassName="active" className="nav-link" to="/profile">Profile</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/list">List</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}