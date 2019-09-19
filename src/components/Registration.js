import React, { Component } from 'react';
import { firebaseApp } from './Firebase';

export default class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            password: '',
            error: ''
        } 

        this.onChange = this.onChange.bind(this);
        this.onRegisterBtn = this.onRegisterBtn.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onRegisterBtn(event) {
        event.preventDefault();
        const { email, password } = this.state;
        firebaseApp
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(user => {
                console.log(user)
            })
            .catch(e => {
                this.setState({ error: e.message })
                console.log(e.message);
            })
    }

    render() {
        const { email, password } = this.state;
        return (
            <div className="row">
                <div className="col">
                    <h1 className="text-center">Registration page</h1>
                    <form onSubmit={this.onRegisterBtn}>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input 
                                type="text" 
                                name="email" 
                                className="form-control"
                                value={email}
                                onChange={this.onChange}
                                placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                className="form-control"
                                value={password}
                                onChange={this.onChange}
                                placeholder="Password" />
                        </div>
                        <p className="error-message">{this.state.error}</p>
                        <button 
                            type="submit" 
                            className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        )
    }
}