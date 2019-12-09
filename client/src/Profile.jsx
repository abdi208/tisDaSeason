import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
                // console.log(response.data)
                this.setState({lovedOnes: response.data})
            })
    }

    handleChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value,
            
        });
    }
    render() {
        
        const mappedLovedOnes = this.state.lovedOnes.map((lovedone, id) => <p key={id}><Link to ={`/lovedonedetail/${lovedone._id}`}>{lovedone.name}</Link></p>)
        
        return (
            <>
            <h1>WELCOME TO YOUR PROFILE PAGE</h1>
            {mappedLovedOnes}
            
            </>
        )

    }
}

export default Profile;