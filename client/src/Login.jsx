import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import LoginComponent from './LoginComponent'
// import Button from '@material-ui/core/Button';
class Login extends React.Component {
    state = {
        email: '',
        password: '',
        message: '',
        redirect: ''
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        console.log('working')
        axios.post('http://localhost:3001/auth/login', {
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            if (response.data.type === 'error') {
                console.log('ERROR:', response.data.message)
            }else {
                localStorage.setItem('mernToken', response.data.token)
                this.props.liftToken(response.data)
                this.setState({ redirect: <Redirect to={'/createlovedone'} /> })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        // var output;
        // if (this.state.redirect) {
        // output = this.state.redirect;
        // } else {
        //   output = (
            
        //     // <div className="App">

        //     //     <div className="Login">
        //     //         <h3>Log into your Account</h3>
        //     //         <form onSubmit={this.handleSubmit}>
        //     //             Email: <input type="text" name="email" onChange={this.handleEmailChange} value={this.state.email}/>
        //     //             Password: <input type="password" name="password" onChange={this.handlePasswordChange} value={this.state.password}/> 
        //     //             <Button type="submit" value="Log In" variant="contained" color="primary">Submit</Button>
        //     //         </form>
        //     //     </div>
    
        //     //     </div>
        //   )
        // }
        
                
                
            
        
        return (
            <>
                <LoginComponent 
                                onSubmit={this.handleSubmit} 
                                handleEmailChange={this.handleEmailChange}
                                handlePasswordChange={this.handlePasswordChange}
                                password={this.state.password}
                                email={this.state.email}
                                
                                />
                {this.state.redirect}
            </>
        )
    }
}

export default Login