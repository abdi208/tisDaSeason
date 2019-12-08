import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class GiftEdit extends React.Component {
    state = {
        name: '',
        gifts: []
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

    handleSubmit = (e) => {
        e.preventDefault()
        let config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }
        axios.put(`http://localhost:3001/api/lovedones/${this.props.match.params.id}/gifts/${this.props.match.params.gid}`, {
            name: this.state.name
        }, config).then(response => {
            console.log(response)
            this.setState({
                name: this.state.name
            })
        })
    }

    render() {
        
        return (
            <>
            <h1>Welcome to the edit page</h1>
            <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder={`${this.state.gifts}`} onChange={this.handleChange}/>
            <input type="submit"/>
            </form>
            
            </>
        )
    }
}

export default GiftEdit;