import * as React from 'react';
import Layout from '../../components/Layout';
import api, { setStorage, TOKEN_KEY } from '../../utils/Api-service';
import { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineMail } from 'react-icons/ai';
import { alertService } from '../../services';
import { errorHandler } from '../../utils/Error-handler';
import { json } from 'express';

const Login: React.FC<LoginProps> = props => {

    // const token = localStorage.getItem(TOKEN_KEY);

    const history = useHistory();
    const location = useLocation<{ msg: string }>();

    const [email, setEmail] = useState('test@test.com');
    const [password, setPassword] = useState('password123');

    // alert
    const [options, setOptions] = useState({
        autoClose: false,
        keepAfterRouteChange: false
    });

    // write logic and alert to let someone know if an email or password is wrong
    // write logic so they can't continue if an email or password is wrong
    // write logic so show alert if email doesn't exist in db

    const login = async (e: React.MouseEvent<HTMLButtonElement>) => {

        e.preventDefault();
        
        if (!email || !password) return alertService.error('Email and Password fields must be filled out', options);

        try {

            const res = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ email, password })
            });
            if (res.status === 401) return alertService.error('Email or Password is invalid, try again', options);
            if (res.ok) {
                const token = await res.json();
                setStorage(token);
                history.push('/profile');
            }

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <Layout>
            {location.state?.msg && <div className='alert alert-danger text-center'>{location.state.msg}</div>}
            <form className='form-group border shadow bg-white font-weight-bold p-4'>
                <h4 className='mb-5 text-center'>Login</h4>
                <div className='d-flex'>
                    <h2><AiOutlineMail /></h2>
                    <input className='form-control bg-warning input-shadow ml-2 mb-4' placeholder='email@email.com' value={email} onChange={e => setEmail(e.target.value)} type='text' />
                </div>
                <div className='d-flex'>
                    <h2><RiLockPasswordLine /></h2>
                    <input className='form-control bg-warning input-shadow ml-2 mb-4' placeholder='password' value={password} onChange={e => setPassword(e.target.value)} type='password' />
                </div>
                <div className="d-flex flex-column">
                    <button onClick={login} type='submit' className='btn btn-primary btn-shadow align-items-end mt-3'>Login</button>
                </div>
                <div className='text-center mt-4'>
                    <small className='mr-2'>Need to Create an Account?</small>
                    <Link to={'/register'}>Register!</Link>
                </div>
            </form>
        </Layout>
    );
}

interface LoginProps { }

export default Login;