import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class CreateLovedOne extends React.Component {

    state = {
        name: '',
        redirect: ''
    }

    handleChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value,
            
        });
    }

    handleOnSubmit = (e) => {
        e.preventDefault()
        let config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }
        axios.post('http://localhost:3001/api/lovedones', {
            name: this.state.name,
            age: this.state.age,

        }, config).then(response => {
            this.setState({
                name: this.state.name,
                age: this.state.age,
                redirect: <Redirect to={'/profile'} />
                
            })
        })
    }

    render() {
        return(
            <>
                <form onSubmit={this.handleOnSubmit}>
                <TextField type="text" name="name" onChange={this.handleChange} value={this.state.name} placeholder='Enter a name'/> <br/>
                <TextField type="text" name="age" onChange={this.handleChange} value={this.state.age} placeholder='Enter an age'/> <br />
                <Button type="submit">Submit</Button>
            </form>

            {this.state.redirect}
            </>
        )
    }
}

export default CreateLovedOne