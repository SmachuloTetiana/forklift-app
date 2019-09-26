import React, { useState } from 'react';
import { firebaseApp } from './Firebase';
import { UserProps } from "../index";

export const Profile = () => {
    const [ user, setUser ] = useState({UserProps});

    const isLogged = () => {
        firebaseApp.database().ref('users').on('value', snapshot => {
            snapshot.forEach(item => {
                var childData = item.val();
                setUser({
                    name: childData.name,
                    email: childData.email
                })
                console.log(childData)
            })
        })
    }

    const signOut = () => {
        firebaseApp.auth().signOut();
        console.log(user, 'You are logout')
    }

    return (
        <div>
            <h1 className="text-center">Profile Page</h1> 
            <button onClick={isLogged} className="btn btn-primary">IsLogged User</button>
            <button onClick={signOut} className="btn btn-primary">Signout</button>
            <p>User name: {user.name}</p>
            <p>User e-mail: {user.email}</p>
        </div>
    )
}