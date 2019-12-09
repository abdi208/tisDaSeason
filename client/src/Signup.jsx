import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import SignupComponent from './SignupComponent'
class Signup extends React.Component {
    state ={
        name: '',
        email: '',
        password: '',
        message: '',
        redirect: ''
    }
    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
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
        axios.post('http://localhost:3001/auth/signup', {
            name: this.state.name,
            email:this.state.email,
            password: this.state.password
        }).then(response => {
            if (response.data.type === 'error') {
                console.log('Error', response.data.message)
            } else {
                localStorage.setItem('mernToken', response.data.token)
                this.props.liftToken(response.data)
                this.setState({ redirect: <Redirect to={'/profile'} /> })
            }
        }).catch( err => {
            // This block catches rate limiter errors
            console.log(err)
        })
    }
    render() {
        
        return (
            <>
            <SignupComponent 
            onSubmit={this.handleSubmit}
            handleEmailChange={this.handleEmailChange}
            handleNameChange={this.handleNameChange}
            handlePasswordChange={this.handlePasswordChange}
            password={this.state.password}
            email={this.state.email}
            name={this.state.name}
            />
            {this.state.redirect}
            {/* // <div className="App">
            //     <div className="Signup">
            //         <h3>Create a new account</h3>
            //         <form onSubmit={this.handleSubmit}>
            //             Name: <input type="text" name="name" onChange={this.handleChange} value={this.state.name}/> <br />
            //             Email: <input type="text" name="email" onChange={this.handleChange} value={this.state.email}/> <br />
            //             Password: <input type="password" name="password" onChange={this.handleChange} value={this.state.password}/> <br />
                        
            //             <input type="submit" value="Submit"/>
            //         </form>
            //     </div>

            // </div> */}
            </>
        )
    }
}

export default Signup;