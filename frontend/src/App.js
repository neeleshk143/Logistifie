import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Products from './components/Products';
import Home from './components/Home';

function App() {
    const [token, setToken] = useState('');

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Product of Logistifie</h1>
                </header>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login setToken={setToken} />} />
                    <Route path="/home" element={token ? <Home token={token} setToken={setToken} /> : <Navigate to="/login" />} />
                    <Route path="/products" element={token ? <Products token={token} /> : <Navigate to="/login" />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
