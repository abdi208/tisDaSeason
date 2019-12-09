import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './css/homepage.css';
class GiftEdit extends React.Component {
    state = {
        name: '',
        gifts: [],
        price: ''
    }

    componentDidMount = () => {
        let config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }
        axios.get(`http://localhost:3001/api/lovedones/${this.props.match.params.id}/gifts/${this.props.match.params.gid}`, config)
        .then(response => {
            this.setState({
                gifts: response.data
            })
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value

        })
    }
    handleNewSubmit = (e) => {
        e.preventDefault()
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('working')
        let config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }
        axios.post(`http://localhost:3001/api/lovedones/${this.props.match.params.id}/gifts`,{
            price: this.state.price
        }, config)
        .then(response => {
            this.setState({
                name: this.state.name,
                price: this.state.price,
                // redirect: <Redirect to={'/'} />
            })
        }).catch(err => {
            console.log(err)
        })
        // axios.put(`http://localhost:3001/api/lovedones/${this.props.match.params.id}/gifts/${this.props.match.params.gid}`, {
        //     name: this.state.name
        // }, config).then(response => {
        //     console.log(response)
        //     this.setState({
        //         name: this.state.name
        //     })
        // })

    }

    render() {
        
        return (
            <>
            <div className='text'>

            <h1>Shop on Amazon NOW!!!!......</h1>
            <form onSubmit={this.handleNewSubmit}>
            <input type="text" value={`${this.state.gifts}`} onChange={this.handleChange}/>
            <button><a href={`https://www.amazon.com/s?k=${this.state.gifts}` } target="_blank">Compare Prices</a></button>
            
            </form>
            </div>

            <div>
                <form onSubmit={this.handleSubmit}>
                        <input type="text" onChange={this.handleChange} name='name' placeholder='Add your deals found'/><br />
                        <input type="text" onChange={this.handleChange} name='price' placeholder='Add the price'/><br />
                        <input type="submit"></input>
                    </form>
                    </div>
            </>
        )
    }
}

export default GiftEdit;