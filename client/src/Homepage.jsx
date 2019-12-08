import React from 'react';
import { Link } from 'react-router-dom';


const Homepage = () => {
    return (
        
        <div className="App">
            <h1>'tisDaSeason</h1>

            <button><Link to='/login'>Login</Link></button>
            <button><Link to='/signup'>Signup</Link></button>

        </div>

    

    )
}

export default Homepage;
