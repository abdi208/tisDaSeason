import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './css/homepage.css';
class GiftEdit extends React.Component {
    state = {
        name: '',
        gifts: [],
        price: '',
        redirect: ''
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
        axios.put(`http://localhost:3001/api/lovedones/${this.props.match.params.id}/gifts/${this.props.match.params.gid}`, {
            name: this.state.name,
            price: this.state.price
        }, config).then(response => {
            console.log(response)
            this.setState({
                name: this.state.name,
                price: this.state.price,
                gifts:this.state.gifts,
                redirect: <Redirect to={`/lovedonedetail/${this.props.match.params.id}`} />
            })
        })

    }

    render() {
        
        return (
            <>
            <div className='text'>

            <h1>Shop on Amazon NOW!!!!......</h1>
            <form onSubmit={this.handleNewSubmit}>
            <input type="text" value={`${this.state.gifts.name}`} onChange={this.handleChange}/>
            <button><a href={`https://www.amazon.com/s?k=${this.state.gifts.name}` } rel="noopener noreferrer" target="_blank">Compare Prices</a></button>
            
            </form>
            </div>
            <h1 className='text'>Update your gift item below...</h1>
            <div className='text'>
                <form onSubmit={this.handleSubmit}>
                        <input type="text" onChange={this.handleChange} name='name' placeholder='Add your deals found'/><br />
                        <input type="text" onChange={this.handleChange} name='price' placeholder='Add the price'/><br />
                        <Button type="submit">Submit</Button>
                </form>
            </div>
            <div className='text'>
                <h3>
                    {this.state.gifts.name}, 

                </h3>

                </div>
                <div className='text'>
                ${this.state.gifts.price}

            </div>

                {this.state.redirect}
            </>
        )
    }
}

export default GiftEdit;