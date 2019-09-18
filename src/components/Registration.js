import React, { Component } from 'react';
import { firebaseApp } from './Firebase';

export default class Registration extends Component {

    constructor(props) {
        super(props);
        this.state= { 
            email: '',
            password: ''
        } 

        this.onChange = this.onChange.bind(this);
        this.onRegisterBtn = this.onRegisterBtn.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onRegisterBtn() {
        const { email, password } = this.state;
        firebaseApp
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(user => {
                console.log(user)
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <h1>Registration page</h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input 
                                type="text" 
                                name="email" 
                                className="form-control"
                                onChange={this.onChange}
                                plaeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                className="form-control"
                                onChange={this.onChange}
                                plaeholder="Password"/>
                        </div>
                        <button 
                            type="button" 
                            className="btn btn-primary"
                            onClick={this.onRegisterBtn()}>Register</button>
                    </form>
                </div>
            </div>
        )
    }
}