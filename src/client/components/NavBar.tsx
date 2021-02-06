import * as React from 'react';
import { TOKEN_KEY } from '../utils/Api-service';
import { NavLink, useLocation } from 'react-router-dom';

const NavBar: React.FC<NavBarProps> = props => {

    useLocation();
    const token = localStorage.getItem(TOKEN_KEY)

    return (
        <nav className='nav justify-content-between align-items-center shadow bg-warning p-3 mb-2'>
            <h4>Get The Dish</h4>
            <div className='text-responsive'> 
                <NavLink className='mx-2 font-weight-light text-decoration-none' activeClassName='text-primary font-weight-bold' exact to={'/'}>Home</NavLink>
                {!token && <> 
                    <NavLink className='mx-2 font-weight-light text-decoration-none' activeClassName='text-primary font-weight-bold' to={'/register'}>Register</NavLink>
                    <NavLink className='mx-2 font-weight-light text-decoration-none' activeClassName='text-primary font-weight-bold' to={'/login'}>Login</NavLink>
                </>}
                {token && <>
                    <NavLink className='mx-2 font-weight-light text-decoration-none' activeClassName='text-primary font-weight-bold' to={'/newdish'}>New Dish</NavLink>
                    <NavLink className='mx-2 font-weight-light text-decoration-none' activeClassName='text-primary font-weight-bold' to={`/profile/`}>Profile</NavLink>
                    <NavLink onClick={() => localStorage.removeItem(TOKEN_KEY)} className='mx-2 font-weight-light text-decoration-none' to={{ pathname: '/', state: { msg: 'You Have Logged Out' }}}>Logout</NavLink> 
                </>}
                <NavLink className='mx-2 font-weight-light text-decoration-none' activeClassName='text-primary font-weight-bold' to={'/contact'}>Contact</NavLink>
                <NavLink className='mx-2 font-weight-light text-decoration-none' activeClassName='text-primary font-weight-bold' to={'/donate'}>Donate</NavLink>
            </div>
        </nav>
    );

}

interface NavBarProps { }

export default NavBar;