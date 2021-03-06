import React, { useState } from 'react';
import  { Redirect } from 'react-router-dom';
import { firebaseApp } from './Firebase';
import { UserProps } from "../index";

export const Login = () => {
    const [ user, setUser ] = useState({UserProps});

    const handleSubmit = event => {
        event.preventDefault();
        firebaseApp
            .auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then(u => {
                setUser({
                    isLoggedIn: !u.isLoggedIn
                })
            })
            .catch(error => {
                setUser({
                    error: error.message
                })
            })
    }

    const handleUser = event => {
        setUser({
            ...user, 
            [event.target.name]: event.target.value
        })
    }

    return (
        <div>
            <h1 className="text-center">Login Form</h1> 
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Adress</label>
                    <input
                        type="text" 
                        name="email" 
                        className="form-control"
                        value={user.email}
                        onChange={handleUser}
                        placeholder="Enter email adress"
                        required  />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password" 
                        name="password" 
                        className="form-control"
                        value={user.password}
                        onChange={handleUser}
                        placeholder="Enter password"
                        required  />
                </div>
                <div className="error-message">{user.error}</div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}