import React, { Component } from 'react';
import { firebaseApp } from './Firebase';

export default class List extends Component {
        
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            items: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = firebaseApp.database().ref('items');
        itemsRef.push({
            title: this.state.title,
            description: this.state.description
        });
        this.setState({
            title: '',
            description: ''
        });
    }

    componentDidMount() {
      const itemsRef = firebaseApp.database().ref('items');
      itemsRef.on('value', (snapshot) => {
        let items = snapshot.val();
        let newState = [];
        for (let item in items) {
          newState.push({
            id: item,
            title: items[item].title,
            description: items[item].description
          });
        }
        this.setState({
          items: newState
        });
      });
    }

    render() {
        const { title, description } = this.state;
        return (
            <div className="row">
                <div className="col">
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            type="text" 
                            name="title" 
                            value={title}
                            className="form-control"
                            onChange={this.handleChange}
                            placeholder="Title" />
                        <textarea 
                            name="description" 
                            value={description}
                            onChange={this.handleChange} 
                            className="form-control"
                            placeholder="Description"></textarea>
                        <button 
                            type="submit" 
                            className="btn btn-primary">Add Product</button>
                    </form>

                    <div className="items-list">
                        <ul>
                        {this.state.items.map((item) => {
                            return (
                            <li key={item.id}>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </li>
                            )
                        })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}