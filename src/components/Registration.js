import React, { useState } from 'react';
import { firebaseApp } from './Firebase';
import { UserProps } from "../index";

export const Registration = () => {

    const [ user, setUser ] = useState({UserProps});

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const signInBtn = (event) => {
        event.preventDefault();
        firebaseApp.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(user => {
                setUser({
                    isLoggedIn: !user.isLoggedIn
                })
                console.log(user, 'You are sigIn!')
            })
            .catch(e => {
                setUser({
                    error: e.message
                })
            })
    }

    const registerBtn = (event) => {
        event.preventDefault();
        firebaseApp.database().ref('users').push({
            name: user.name,
            email: user.email
        });
        firebaseApp.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(user => {
                console.log(user, 'Your account was created!')
            })
            .catch(e => {
                setUser({
                    error: e.message
                })
            })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="title text-center">Register/Login Page</h1>

                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input 
                                type="text"
                                name="name"
                                value={user.name || ''}
                                className="form-control"
                                onChange={handleChange}
                                placeholder="Enter your name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="text"
                                name="email"
                                value={user.email || ''}
                                className="form-control"
                                onChange={handleChange}
                                placeholder="Enter your email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="text"
                                name="password"
                                value={user.password || ''}
                                className="form-control"
                                onChange={handleChange}
                                placeholder="Enter your password"/>
                        </div>
                        <p>{user.error}</p>
                        <button type="submit" className="btn btn-primary" onClick={registerBtn}>Register</button>
                        <button type="submit" className="btn btn-primary" onClick={signInBtn}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
  
}