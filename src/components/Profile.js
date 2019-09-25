import React, { useState } from 'react';
import { firebaseApp } from './Firebase';
import { Login } from "./Login";

export const Profile = () => {
    const [ user, setUser ] = useState({
        user: null,
        email: '',
        uid: ''
    });

    const isLogged = async () => {
        firebaseApp.auth().onAuthStateChanged(user => { 
            setUser({ 
                user,
                email: user.email,
                uid: user.uid
            })
        })
    }

    const getUser = () => {
        if(isLogged) {
            return (
                <div>
                    <p><strong>E-mail:</strong> {user.email}</p>
                    <p><strong>Provider-specific UID:</strong> {user.uid}</p>
                </div>
            )
        } else {
            return <span>Error</span>
        }
    }

    console.log(user, user.email)

    return (
        <div>
            <h1 className="text-center">Profile Page</h1> 
            <button onClick={isLogged} className="btn btn-primary">IsLogged User</button>
            {getUser()}
        </div>
    )
}