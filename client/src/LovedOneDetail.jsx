import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
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
    const mappedGifts = this.state.lovedone.map((lovedone, id) => <div key={id}><p ><Link  style={{fontSize: '25px', color: 'red', textDecoration: 'none'}} to={`/lovedone/${this.props.match.params.id}/giftedit/${lovedone._id}`}>{lovedone.name}</Link></p></div>)
            return (

                <>
                <div style={{backgroundImage: 'url("https://image.businessinsider.com/5dc1c88b3afd37770b66db27?width=1100&format=jpeg&auto=webp") ', height:'10vh', width: '100vw' , backgroundSize: '100%, 100%'}}>
                <div className='App'>
                    <h1>welcome to details</h1>
                    {mappedGifts}
                    <form style={{marginTop: '100px'}}onSubmit={this.handleSubmit}>
                        <input type="text" onChange={this.handleChange} name='name' placeholder='Create a gift'/><br />
                        <input type="hidden" onChange={this.handleChange} name='price' placeholder='add a price'/><br />
                        <Button style={{color: 'black', textDecoration: 'none'}} type="submit">Submit</Button>
                        
                    </form>
                    

                    
                </div>

                </div>
                    {this.state.redirect}
                </>
                
            )
        }
}

export default LovedOneDetail;