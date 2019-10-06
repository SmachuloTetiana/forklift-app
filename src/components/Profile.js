import React, { useState } from 'react';

export const Profile = (props) => {
    return (
        <div>
            <h1 className="title text-center">Profile Page</h1> 
            <div>
                <ul>
                    <li>
                        <h3>User name: {props.name}</h3>
                        <p>User e-mail: {props.email}</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}