import React, { useState } from 'react';
import { firebaseApp } from './Firebase';
import { UserProps } from "../index"; 

export const List = () => {

    const [ products, setProduct ] = useState({UserProps});

    const handleSubmit = event => {
        event.preventDefault();
        const itemsRef = firebaseApp.database().ref('items');
        if(products.title !== '' && products.description !== '') {
            itemsRef.push({
                title: products.title,
                description: products.description
            });
            // Clear Input field
            setProduct({
                title: '',
                description: ''
            });
        } else {
            setProduct({
                error: 'is invalid'
            })
        }
    }

    const handleChange = event => {
        setProduct({
            ...products,
            [event.target.name]: event.target.value
        })
    }

    const componentDidMount = () => {
      const itemsRef = firebaseApp.database().ref('items');
      itemsRef.on('value', (snapshot) => {
        let items = snapshot.val();
        let newState = [];
        for (let item in items) {
          newState.push({
            id: item,
            title: items[item].title,
            description: items[item].description
          })
        }
        setProduct({
          items: newState
        })
      })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Name</label>
                            <input 
                                type="text" 
                                name="title" 
                                value={products.title}
                                className="form-control"
                                onChange={handleChange}
                                placeholder="Title" />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea 
                                name="description" 
                                value={products.description}
                                onChange={handleChange} 
                                className="form-control"
                                placeholder="Description"></textarea>
                        </div>
                        <div className="error-message">{products.error}</div>
                        <button 
                            type="submit" 
                            className="btn btn-primary">Add Product</button>
                    </form>

                    <button type="button" className="btn btn-dark" onClick={componentDidMount}>Show List</button>

                    <div className="Items-list">
                        <h2 className="title text-center">Навантажувачі власного виробництва</h2>
                        <ul>
                            {products.items && products.items.map((item) => {
                                return (
                                    <li key={item.id}>
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