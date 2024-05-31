import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ token, setToken }) => {
    const handleLogout = () => {
        setToken('');
    };

    return (
        <div>
            <h2>Home</h2>
            <button onClick={handleLogout}>Logout</button>
            <h3><Link to="/products">Go to Products</Link></h3>
        </div>
    );
};

export default Home;
