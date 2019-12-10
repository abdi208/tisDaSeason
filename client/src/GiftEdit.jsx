import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './css/homepage.css';
import { TextField } from '@material-ui/core';
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
            <div className='App'>

            <h1 style={{fontFamily: 'Mountains of Christmas', fontSize: '35px', textDecoration: 'none', marginTop: '0px'}}>Shop on Amazon NOW!!!!......</h1>
            <form style={{marginTop: '5vh', backgroundColor: 'salmon' }} onSubmit={this.handleNewSubmit}>
            <TextField type="text" value={`${this.state.gifts.name}`} onChange={this.handleChange}/>
            <Button style={{fontFamily: 'Mountains of Christmas', fontSize: '15px', textDecoration: 'none'}} ><a style={{textDecoration: 'none', color: 'black'}}href={`https://www.amazon.com/s?k=${this.state.gifts.name}` } rel="noopener noreferrer" target="_blank">Compare Prices</a></Button>
            
            </form>
            <h1 style={{fontFamily: 'Mountains of Christmas', fontSize: '25px'}} className='text'>Update your gift item below...</h1>
            <div className='text'>
                <form onSubmit={this.handleSubmit}>
                        <TextField style={{fontFamily: 'Mountains of Christmas', fontSize: '25px'}} type="text" onChange={this.handleChange} name='name' placeholder='Add your deals found'/><br />
                        <TextField style={{fontFamily: 'Mountains of Christmas', fontSize: '25px'}} type="text" onChange={this.handleChange} name='price' placeholder='Add the price'/><br />
                        <Button style={{fontFamily: 'Mountains of Christmas', fontSize: '25px'}} type="submit">Submit</Button>
                </form>
            </div>
            <div className='text'>
                <h3 style={{fontFamily: 'Mountains of Christmas', fontSize: '25px'}} >
                    {this.state.gifts.name} 

                </h3>

                </div>
                <div style={{fontFamily: 'Mountains of Christmas', fontSize: '25px'}}  className='text'>
                {this.state.gifts.price}

            </div>
            </div>

                {this.state.redirect}
            </>
        )
    }
}

export default GiftEdit;