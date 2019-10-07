import React, { Component } from 'react';
import axios from 'axios';
import { firebaseApp } from './Firebase';

export default class Profile extends Component  {

    constructor(props) {
        super(props);
        this.state = {
            users: [
                {
                    name: 'Denial',
                    email: 'den@mail.ru'
                }
            ]
        }
        this.getUsers();
    }

    getUsers() {
        axios.get('https://forklift-bb1ea.firebaseio.com/users.json').then(response  => {
            var newArr = [];
            for(let key in response.data) {
                newArr.push({
                    ...response.data[key]
                })
            }
            this.setState({
                users: [
                    ...this.state.users,
                    ...newArr
                ]
            })
            console.log(this.state.users);
        })
    }

    render() {
        return (
            <div>
                <h1 className="title text-center">Profile Page</h1> 
                <div>
                    <ul>
                        {this.state.users.map((user, index) => (
                            <li key={index}>
                                <h3>User name: {user.name}</h3>
                                <p>User e-mail: {user.email}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}