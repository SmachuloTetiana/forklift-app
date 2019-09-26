import React, { useState } from 'react';
import { firebaseApp } from './Firebase';
import { UserProps } from "../index";

export const Profile = () => {
    const [ user, setUser ] = useState({});

    const isLogged = () => {
        firebaseApp.database().ref('users').on('value', async snapshot => {
            const state = await snapshot.val();
            setUser({state});
            console.log(state)
        })
    }

    const signOut = () => {
        firebaseApp.auth().signOut();
    }

  

    console.log(user)

    return (
        <div>
            <h1 className="text-center">Profile Page</h1> 
            <button onClick={isLogged} className="btn btn-primary">IsLogged User</button>
            <button onClick={signOut} className="btn btn-primary">Signout</button>
        </div>
    )
}