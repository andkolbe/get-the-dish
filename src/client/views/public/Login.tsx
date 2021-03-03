import * as React from 'react';
import Layout from '../../components/Layout';
import api, { setStorage } from '../../utils/Api-service';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineMail } from 'react-icons/ai';

const Login: React.FC<LoginProps> = props => {

    const history = useHistory();
    const location = useLocation<{ msg: string }>();

    const [email, setEmail] = useState('test@test.com');
    const [password, setPassword] = useState('password123');

    // write logic and alert to let someone know if an email or password is wrong
    // write logic so they can't continue if an email or password is wrong
    // write logic so show alert if email doesn't exist in db

    const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const token = await api('/auth/login', 'POST', { email, password })
        setStorage(token);
        history.push('/profile');
    }

    return (
        <Layout>
            {location.state?.msg && <div className='alert alert-danger text-center'>{location.state.msg}</div>}
            <form className='form-group border shadow bg-white font-weight-bold p-4'>
                <h4 className='mb-5 text-center'>Login</h4>
                <div className='d-flex'>
                    <h2><AiOutlineMail/></h2>
                    <input className='form-control bg-warning input-shadow ml-2 mb-4' value={email} onChange={e => setEmail(e.target.value)} type='text' />
                </div>
                <div className='d-flex'>
                    <h2><RiLockPasswordLine /></h2>
                    <input className='form-control bg-warning input-shadow ml-2 mb-4' value={password} onChange={e => setPassword(e.target.value)} type='password' />
                </div>
                <div className="d-flex flex-column">
                    <button onClick={login} type='submit' className='btn btn-primary btn-shadow align-items-end mt-3'>Login</button>
                </div>
            </form>
        </Layout>
    );
}

interface LoginProps { }

export default Login;