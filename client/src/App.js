import React from 'react';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import Homepage from './Homepage';
import CreateLovedOne from './CreateLovedone';
import Navbar from './NavbarComponent'
import axios from 'axios';
import { Link} from 'react-router-dom';
import { 
  BrowserRouter as Router,
  Route
  
} from 'react-router-dom'
import LovedOneDetail from './LovedOneDetail';
import GiftEdit from './GiftEdit';

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
      axios.post('http://localhost:3001/auth/me/from/token', {token})
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
          <nav >
            <Navbar logout={this.logout}/>

          </nav>
          

        </>
      )
    } else {
      contents = (
      <>

      </>
      )
    }
    return (
    
      <Router>
      {contents}
        <Route exact path = '/' render= { () => <Homepage token={this.state.token} /> }/>
        <Route exact path ='/signup' render={ ()=> <Signup liftToken={this.liftToken} /> } />
        <Route exact path ='/login' render={ ()=> <Login liftToken={this.liftToken} /> } />
        <Route exact path ='/profile' render={ ()=> <Profile token={this.state.token} /> } />
        <Route exact path ='/lovedonedetail/:id' render={ (props) => <LovedOneDetail  {...props} token={this.state.token} /> } />
        <Route exact path ='/lovedone/:id/giftedit/:gid' render={ (props) => <GiftEdit  {...props} token={this.state.token} /> } />
        <Route exact path ='/createlovedone' render={ (props) => <CreateLovedOne  {...props} token={this.state.token} /> } />
        
      </Router>
    )
  }
}

export default App;
