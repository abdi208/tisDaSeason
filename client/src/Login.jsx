import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
class Login extends React.Component {
    state = {
        email: '',
        password: '',
        message: '',
        redirect: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/auth/login', {
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            if (response.data.type === 'error') {
                console.log('ERROR:', response.data.message)
            }else {
                localStorage.setItem('mernToken', response.data.token)
                this.props.liftToken(response.data)
                this.setState({ redirect: <Redirect to={'/profile'} /> })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        var output;
        if (this.state.redirect) {
            output = this.state.redirect;
        } else {
            output = (
                <div className="App">

                <div className="Login">
                    <h3>Log into your Account</h3>
                    <form onSubmit={this.handleSubmit}>
                        Email: <input type="text" name="email" onChange={this.handleChange} value={this.state.email}/>
                        Password: <input type="password" name="password" onChange={this.handleChange} value={this.state.password}/> 
                        <input type="submit" value="Log In"/>
                    </form>
                </div>
    
                </div>
            )
        }
        return (
            <>
            {output}
            </>
        )
    }
}

export default Login