import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Profile extends React.Component  {
    state = {
        lovedOnes: [],
        name: '',
        age: ''
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
                lovedone: this.state.lovedone
            })
        })
    }
    render() {
        
        const mappedLovedOnes = this.state.lovedOnes.map((lovedone, id) => <p key={id}><Link to ={`/lovedonedetail/${lovedone._id}`}>{lovedone.name}</Link></p>)
        
        return (
            <>
            <h1>WELCOME TO YOUR PROFILE PAGE</h1>
            {mappedLovedOnes}
            <form onSubmit={this.handleOnSubmit}>
                <input type="text" name="name" onChange={this.handleChange} value={this.state.name} placeholder='Enter a name'/> <br/>
                <input type="text" name="age" onChange={this.handleChange} value={this.state.age} placeholder='Enter an age'/> <br />
                <button type="submit"> <Link to={'/'}>Submit</Link></button>
            </form>
            
            </>
        )

    }
}

export default Profile;