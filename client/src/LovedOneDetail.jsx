import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
// import LovedOneComponent from './LovedOneComponent'
class LovedOneDetail extends React.Component {

    state = {
        lovedone: [],
        name: '',
        price: '',
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
            price: this.state.price
        }, config)
        .then(response => {
            this.setState({
                name: this.state.name,
                price: this.state.price,
                redirect: <Redirect to={'/profile'}/>
            })
        })
    
    }

        render () {
    const mappedGifts = this.state.lovedone.map((lovedone, id) => <div key={id}><span style={{ flexDirection:'row' }} ><Link  style={{fontSize: '25px', color: 'black', textDecoration: 'none', fontFamily: 'Mountains of Christmas'}} to={`/lovedone/${this.props.match.params.id}/giftedit/${lovedone._id}`}> 🎁 {lovedone.name}</Link></span></div>)
            return (

                <>
                <div className='App'>
                    {mappedGifts}
                    {/* <LovedOneComponent lovedone={this.state.lovedone} /> */}
                    <form onSubmit={this.handleSubmit}>
                        <TextField style={{marginTop: '50vh', backgroundColor: 'salmon', fontFamily: 'Mountains of Christmas' }} type="text" onChange={this.handleChange} name='name' placeholder='Create a gift'/><br />
                        <input type="hidden" onChange={this.handleChange} name='price' placeholder='add a price'/><br />
                        <Button style={{color: 'black', textDecoration: 'none', fontFamily: 'Mountains of Christmas', fontSize: '25px'}} type="submit">Submit</Button>
                        
                    </form>
                </div>

                    {this.state.redirect}
                </>
                
            )
        }
}

export default LovedOneDetail;