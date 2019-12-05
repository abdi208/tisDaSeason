import React from 'react';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import axios from 'axios'

class App extends React.Component {
  state = {
    token: '',
    user: null,
    errorMessage: '',
    lockedResults: ''
  }

  componentDidMount = () => {
    this.checkForLocalToken()
  }

  checkForLocalToken = () => {
    let token = localStorage.getItem('mernToken')
    if(!token || token === 'undefined') {
      localStorage.removeItem('mernToken')
      this.setState({
        token: '',
        user: null
      })
    }else{
      axios.post('/auth/me/from/token', {token})
      .then(response => {
        if (response.data.type === 'error') {
          localStorage.removeItem('mernToken')
          this.setState({
            token: '',
            user: null,
            errorMessage: response.data.message
          })
        }else {
          localStorage.setItem('mernToken', response.data.token) 
            this.setState({
              token: response.data.token,
              user: response.data.user
            })
        }
      })
    }
  }

  liftToken = ({token, user}) => {
    this.setState({
      token, 
      user
    })
  }
  logout = () => {
    localStorage.removeItem('mernToken')
    this.setState({
      token:'',
      user: null
    })
  }
  handleClick = () => {
    //need this for all axios routes
    let config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    }
    axios.get('/locked/test',config).then(response => {
      this.setState({
        lockedResults: response.data
      })
    })
  }

  render() {
    let contents;
    if(this.state.user) {
      contents = (
        <>
          <p>Hello, {this.state.user.name}</p>
          <button onClick={this.handleClick}>Test the protected route</button>
          <button onClick={this.logout}>Logout</button><br />
          <p>{this.state.lockedResults}</p>

        </>
      )
    } else {
      contents = (
      <>
        <Signup liftToken={this.liftToken} />
        <Login liftToken={this.liftToken} />

      </>
      )
    }
    return (
      <div className="App">
        <header>
          <h1> Welcome to my site!!</h1></header>
        <div className="content-box">
        {contents}
        </div>
      </div>
    )
  }
}

export default App;
