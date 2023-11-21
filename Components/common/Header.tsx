import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <nav>
            <NavLink to="/" end style={({ isActive }) => { return {color: isActive ? "red" : ""} }}>Home</NavLink>
             | 
            <NavLink to="/chart" style={({ isActive }) => { return { color: isActive ? "red" : "" } }}>Chart</NavLink>
        </nav>
    );
}

export default Header;