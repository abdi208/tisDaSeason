import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
    state ={
        name: '',
        email: '',
        password: '',
        message: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/auth/signup', {
            name: this.state.name,
            email:this.state.email,
            password: this.state.password
        }).then(response => {
            if (response.data.type === 'error') {
                console.log('Error', response.data.message)
            } else {
                localStorage.setItem('mernToken', response.data.token)
                this.props.liftToken(response.data)
            }
        }).catch( err => {
            // This block catches rate limiter errors
            console.log(err)
        })
    }
    render() {
        return (
            <div className="Signup">
                <h3>Create a new account</h3>
                <form onSubmit={this.handleSubmit}>
                    Name: <input type="text" name="name" onChange={this.handleChange} value={this.state.name}/> <br />
                    Email: <input type="text" name="email" onChange={this.handleChange} value={this.state.email}/> <br />
                    Password: <input type="password" name="password" onChange={this.handleChange} value={this.state.password}/> <br />
                    
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}

export default Signup;