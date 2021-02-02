import * as React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar: React.FC<NavBarProps> = props => { 
  
    return (
        <nav className='nav justify-content-center shadow bg-warning p-3 mb-2'>
            <h3>Get The Dish</h3>
            <NavLink className='mx-5 font-weight-light' activeClassName='text-primary font-weight-bold' to={'/'}>Home</NavLink>
            <NavLink className='mx-5 font-weight-light' activeClassName='text-primary font-weight-bold' to={'/newdish'}>New Dish</NavLink>
            <NavLink className='mx-5 font-weight-light' activeClassName='text-primary font-weight-bold' to={'/contact'}>Contact</NavLink>
            <NavLink className='mx-5 font-weight-light' activeClassName='text-primary font-weight-bold' to={'/donate'}>Donate</NavLink>
            <NavLink className='mx-5 font-weight-light' activeClassName='text-primary font-weight-bold' to={'/register'}>Register</NavLink>
            <NavLink className='mx-5 font-weight-light' activeClassName='text-primary font-weight-bold' to={'/login'}>Login</NavLink>
            <NavLink onClick={() => localStorage.clear()} className='mx-5 font-weight-light' to={{ pathname: '/' }}>Logout</NavLink>
        </nav>
    );

}

interface NavBarProps {}

export default NavBar;