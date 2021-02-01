import * as React from 'react';
import Layout from '../components/Layout';
import api, { TOKEN_KEY } from '../utils/Api-service';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const Login: React.FC<LoginProps> = props => {
    
    const history = useHistory();
    const location = useLocation<{ msg: string }>();
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const token = await api('/auth/login', 'POST', { email, password })
        localStorage.setItem(token, TOKEN_KEY);
        history.goBack();
    }

    return (
        <Layout>
            {location.state?.msg && <div className="alert alert-danger text-center">{location.state.msg}</div>}
            <form className="font-weight-bold">
                <div className="mb-3">
                    <label className="form-label" htmlFor="LoginEmail">Email</label>
                    <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} type="text"/>
                </div>
                <div className="mb-4">
                    <label className="form-label" htmlFor="LoginPassword">Password</label>
                    <input className="form-control" value={password} onChange={e => setPassword(e.target.value)} type="text"/>
                </div>
                <button onClick={login} type="submit" className="btn btn-success">Login</button>
            </form>
        </Layout>
    );
}

interface LoginProps {}

export default Login;