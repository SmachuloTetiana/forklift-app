import React, { Component } from 'react';
import axios from 'axios';
import { firebaseApp } from './Firebase';
import { UserProps } from "../index"; 

export default class List extends Component{

    constructor(props) {
        super(props);
        this.state = {
            ...UserProps,
            items: []
        }
        this.getItems();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // const [ products, setProduct ] = useState({UserProps});
    }


    handleSubmit(event) {
        event.preventDefault();
        const itemsRef = firebaseApp.database().ref('items');
        if(this.state.title !== '' && this.state.description !== '') {
            itemsRef.push({
                title: this.state.title,
                description: this.state.description
            });
            // Clear Input field
            this.setState({
                title: '',
                description: ''
            });
        } else {
            this.setState({
                error: 'is invalid'
            })
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    getItems() {
        axios.get('https://forklift-bb1ea.firebaseio.com/items.json').then(items => {
            console.log(items.data);
            var itemsArr = [];
            for(let key in items.data) {
                itemsArr.push({
                    ...items.data[key]
                })
            }
            this.setState({
                items: itemsArr
            })
        })
    }


    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Name</label>
                                <input 
                                    type="text" 
                                    name="title" 
                                    value={this.state.title}
                                    className="form-control"
                                    onChange={this.handleChange}
                                    placeholder="Title" />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea 
                                    name="description" 
                                    value={this.state.description}
                                    onChange={this.handleChange} 
                                    className="form-control"
                                    placeholder="Description"></textarea>
                            </div>
                            <div className="error-message">{this.state.error}</div>
                            <button 
                                type="submit" 
                                className="btn btn-primary">Add Product</button>
                        </form>
    
                        <div className="Items-list">
                            <h2 className="title text-center">Навантажувачі власного виробництва</h2>
                            <ul>
                                {this.state.items && this.state.items.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <span>{item.title}</span>
                                            <p>{item.description}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}