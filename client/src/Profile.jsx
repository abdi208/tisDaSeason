import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProfileComponent from './ProfileComponent'
import './css/homepage.css';

class Profile extends React.Component  {
    state = {
        lovedOnes: [],
        name: '',
        age: '',
        redirect: ''
    }
    componentDidMount = () => {
        let config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }
        axios.get('http://localhost:3001/api/lovedones', config)
            .then( response => {
                this.setState({lovedOnes: response.data})
            })
    }

    handleChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value,
            
        });
    }
    render() {
        
        const mappedLovedOnes = this.state.lovedOnes.map((lovedone, id) => <p key={id}><Link style={{textDecoration: 'none',fontFamily: 'Mountains of Christmas', fontSize: '30px', color: 'black'}} to ={`/lovedonedetail/${lovedone._id}`}>{lovedone.name}</Link></p>)
        
        return (
            <>
            <div className='App'>
            <h1 style={{fontFamily: 'Mountains of Christmas', marginTop: '0px', fontSize: '50px', display: 'inline-block', color: 'red'}}>WELCOME</h1>
            <h1 style={{fontFamily: 'Mountains of Christmas', marginTop: '0px',marginLeft: '25px', fontSize: '50px', display: 'inline-block', color: 'green'}}>TO</h1>
            <h1 style={{fontFamily: 'Mountains of Christmas', marginTop: '0px', fontSize: '50px', marginLeft: '25px', display: 'inline-block'}}>YOUR</h1>
            <h1 style={{fontFamily: 'Mountains of Christmas', marginTop: '0px', fontSize: '50px', marginLeft: '25px', color: 'blue', display: 'inline-block'}}>PROFILE PAGE</h1>
            <ProfileComponent lovedOnes={this.state.lovedOnes}/>
            
            </div>
            
            </>
        )

    }
}

export default Profile;