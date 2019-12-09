import React from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

class LovedOneDetail extends React.Component {

    state = {
        lovedone: [],
        name: '',
        redirect: ''
    }

    componentDidMount = () => {
        let config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }
        axios.get(`http://localhost:3001/api/lovedones/${this.props.match.params.id}/gifts`, config)
        .then(response => {
            console.log(response)
                this.setState(
                    { lovedone: response.data}
                    )
                })
    }

    handleChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value,
            
        });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('hitting')
        let config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }
        axios.post(`http://localhost:3001/api/lovedones/${this.props.match.params.id}/gifts`,{
            name: this.state.name,
        }, config)
        .then(response => {
            this.setState({
                name: this.state.name,
                redirect: <Redirect to={'/profile'} />
            })
        }).catch(err => {
            console.log(err)
        })
    
    }

        render () {
            var output;
        if (!this.state.redirect) {
            output = this.state.redirect;
        } else {
            const mappedGifts = this.state.lovedone.map((lovedone, id) => <div key={id}><p><Link to={`/lovedone/${this.props.match.params.id}/giftedit/${lovedone._id}`}>{lovedone.name}</Link></p></div>)
            output = (
                <div className='App'>
                    <h1>welcome to details</h1>
                    {mappedGifts}
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" onChange={this.handleChange} name='name' placeholder='Create a gift'/><br />
                        <input type="submit"></input>
                        {/* <button type="submit"><Link to={'/profile'}>Submit</Link></button> */}
                    </form>

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

export default LovedOneDetail;