import React, { useState } from 'react';
import { firebaseApp } from './Firebase';
import { UserProps } from "../index";
import { Profile } from './Profile';
import axios from 'axios';

export const Registration = () => {

    const [ user, setUser ] = useState({UserProps});

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
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
                console.log('Your account was created!')
            })
            .catch(e => {
                setUser({
                    error: e.message
                })
            })
    }

    const signInBtn = (event) => {
        event.preventDefault();
        firebaseApp.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(user => {
                setUser({
                    isLoggedIn: true
                })
            })
            .catch(e => {
                setUser({
                    error: e.message
                })
            })
    }

    const logOutBtn = (event) => {
        event.preventDefault();
        firebaseApp.auth().signOut().then(data => {
            setUser({
                isLoggedIn: false
            })
        });
    }

    const url = firebaseApp.database().ref('users');
    axios
        .get('https://forklift-bb1ea.firebaseio.com/users')
        .then(res => {
            const newArr = [];
            for(const key in res.data) {
                newArr.push({...res.data[key]})
            }
            setUser({
                newArr
            })
        })
        .catch(error => {
            console.log(error);
        })
    console.log(user.newArr)

    // if(user.isLoggedIn === true) {
    //     return (
    //         <Profile name={user.name} email={user.email} /> 
    //     )
    // } else {
    //     console.log('You are logout')
    // } 

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="title text-center">Register Page</h1>

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
                        <button type="submit" className="btn btn-primary" onClick={logOutBtn}>LogOut</button>
                    </form>
                </div>
            </div>
        </div>
    )
  
}