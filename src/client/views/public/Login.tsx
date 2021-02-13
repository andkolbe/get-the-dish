import * as React from 'react';
import Layout from '../../components/Layout';
import api, { setStorage } from '../../utils/Api-service';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const Login: React.FC<LoginProps> = props => {

    const history = useHistory();
    const location = useLocation<{ msg: string }>();

    const [email, setEmail] = useState('test@test.com');
    const [password, setPassword] = useState('password123');

    // write logic and alert to let someone know if an email or password is wrong

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
                <h4 className='mb-4'>Login</h4>
                <input className='form-control bg-warning mb-4' value={email} onChange={e => setEmail(e.target.value)} type='text' />
                <input className='form-control bg-warning mb-4' value={password} onChange={e => setPassword(e.target.value)} type='password' />
                <button onClick={login} type='submit' className='btn btn-success'>Login</button>
            </form>
        </Layout>
    );
}

interface LoginProps { }

export default Login;