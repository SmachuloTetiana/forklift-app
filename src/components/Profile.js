import React, { useState } from 'react';
import { firebaseApp } from './Firebase';
import { UserProps } from "../index";

export const Profile = () => {
    const [ user, setUser ] = useState({UserProps});

    const isLogged = () => {
        firebaseApp.database().ref('users').on('value', snapshot => {
            var childData = snapshot.val();
            let newState = [];
            for (let id in childData) {
                newState.push({ 
                    id,
                    name: childData[id].name,
                    email: childData[id].email
                })
            }
            setUser({ newState })
        })
    }
    console.log(user.newState)

    const signOut = () => {
        firebaseApp.auth().signOut();
        console.log(user, 'You are logout')
    }

    return (
        <div>
            <h1 className="text-center">Profile Page</h1> 
            <button onClick={isLogged} className="btn btn-primary">IsLogged User</button>
            <button onClick={signOut} className="btn btn-primary">Signout</button>
            <div>
                <ul>
                    {user.newState && user.newState.map((item) => {
                        return (
                            <li key={item.id}>
                                <h3>User name: {item.name}</h3>
                                <p>User e-mail: {item.email}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}