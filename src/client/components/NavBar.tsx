import * as React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar: React.FC<NavBarProps> = props => { 
  
    return (
        <nav>
            <h3>Get The Dish</h3>
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/newdish'}>New Dish</NavLink>
            <NavLink to={'/contact'}>Contact</NavLink>
            <NavLink to={'/donate'}>Donate</NavLink>
            <NavLink to={'/login'}>Login</NavLink>
            <NavLink to={'/register'}>Register</NavLink>
        </nav>
    );

}

interface NavBarProps {}

export default NavBar;