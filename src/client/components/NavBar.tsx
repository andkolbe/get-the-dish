import * as React from 'react';
import { useEffect, useState } from 'react';
import { TOKEN_KEY } from '../utils/Api-service';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { BsTextRight } from 'react-icons/bs';

const NavBar: React.FC<NavBarProps> = props => {

    const history = useHistory();

    const [show, setShow] = useState(false) // <boolean> is inferred
     
    useLocation();
    const token = localStorage.getItem(TOKEN_KEY)

    useEffect(() => {
        // listen is a function that takes a callback that will run when the url bar changes its location 
        // we are 'listening' to the url bar for changes
        const unlisten = history.listen(() => setShow(false))
        // we include the cleanup function here in case we navigate to a page without the navbar. we want the useEffect to stop running in that instance
        // good practice to turn listeners off
        return () => unlisten(); 
    }, [history]) // only rerun if the history object changes

    return (
        <nav className='shadow bg-warning sticky-top p-3 mb-2'>
            <div className='d-flex justify-content-between align-items-center'>
                <h4 onClick={() => history.push('/')} role='button'>Get The Dish</h4>
                <h2 onClick={() => setShow(!show)} role='button'><BsTextRight /></h2>
            </div>
            {/* any screen medium or higher, show end */}
            {show && <div className='d-flex flex-column align-items-md-end align-items-center justify-content-center'>
                <NavLink className='mx-2 font-weight-light text-decoration-none' activeClassName='text-primary font-weight-bold' exact to={'/'}>Home</NavLink>
                <NavLink className='mx-2 font-weight-light text-decoration-none' activeClassName='text-primary font-weight-bold' to={'/contact'}>Contact</NavLink>
                <NavLink className='mx-2 font-weight-light text-decoration-none' activeClassName='text-primary font-weight-bold' to={'/donate'}>Donate</NavLink>
                {!token && <>
                    <NavLink className='mx-2 font-weight-light text-decoration-none' activeClassName='text-primary font-weight-bold' to={'/register'}>Register</NavLink>
                    <NavLink className='mx-2 font-weight-light text-decoration-none' activeClassName='text-primary font-weight-bold' to={'/login'}>Login</NavLink>
                </>}
                {token && <>
                    <NavLink className='mx-2 font-weight-light text-decoration-none' activeClassName='text-primary font-weight-bold' to={'/newdish'}>New Dish</NavLink>
                    <NavLink className='mx-2 font-weight-light text-decoration-none' activeClassName='text-primary font-weight-bold' to={`/profile/`}>Profile</NavLink>
                    <NavLink onClick={() => localStorage.removeItem(TOKEN_KEY)} className='mx-2 font-weight-light text-decoration-none' to={{ pathname: '/', state: { msg: 'You Have Logged Out' } }}>Logout</NavLink>
                </>}
            </div>}
        </nav>
    );

}

// role='button' comes from bootstrap

interface NavBarProps { }

export default NavBar;