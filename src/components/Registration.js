import React, { useState } from 'react';
import { firebaseApp } from './Firebase';
import { UserProps } from "../index";

export const Registration = () => {

    const [ user, setUser ] = useState({
        UserProps,
        shown: false
    });

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

    const showHideBlock = event => {
        event.preventDefault();
        setUser({
            shown: true
        })
     }

    return (
        <div className="container Account">
            <div className="row">
                <div className="col-6 account-welcome-block">
                    <div className="account-welcome-block__container text-center">
                        <h1 className="title">Welcome!</h1>
                        <p className="subtitle">Enter your personal details and start journey with us...</p>
                    </div>
                </div>

                <div className="col-6">
                    <form className={user.shown ? 'Account__login-user d-none' : 'Account__login-user d-block'}>                        
                        <h1 className="title text-center">Login</h1>

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
                        <button 
                            type="submit" 
                            className="btn btn-primary" 
                            onClick={signInBtn}
                            disabled={user.isLoggedIn}>
                                Login
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={logOutBtn} 
                            disabled={!user.isLoggedIn}>
                                LogOut
                        </button>
                        <a
                            className="App-link"
                            onClick={showHideBlock}
                            href="">Create an account</a>
                    </form>
                    
                    <form className={user.shown ? 'Account__create-user d-block' : "Account__create-user d-none"}>      
                        <h1 className="title text-center">Register</h1>

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
                        <button 
                            type="submit" 
                            className="btn btn-primary" 
                            onClick={registerBtn}>
                                Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
  
}