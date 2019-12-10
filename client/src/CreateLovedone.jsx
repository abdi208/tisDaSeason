import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './css/homepage.css';

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
            <div className='App'>
                <h1 style={{fontFamily: 'Mountains of Christmas', marginTop: '0px', fontSize: '100px'}}> Add your loved one below</h1>
                <form onSubmit={this.handleOnSubmit}>
                <TextField style={{marginTop: '15vh', backgroundColor: 'salmon',fontFamily: 'Mountains of Christmas' }} type="text" name="name" onChange={this.handleChange} value={this.state.name} placeholder='Enter a name'/> <br/>
                <TextField style={{backgroundColor: 'salmon' , fontFamily: 'Mountains of Christmas'}} type="text" name="age" onChange={this.handleChange} value={this.state.age} placeholder='Enter an age'/> <br />
                <Button style={{fontFamily: 'Mountains of Christmas', fontSize: '25px'}} type="submit">Submit</Button>
            </form>

            </div>

            {this.state.redirect}
            </>
        )
    }
}

export default CreateLovedOne