import * as React from 'react';
import Layout from '../components/Layout';
import api, { TOKEN_KEY } from '../utils/Api-service';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Register: React.FC<RegisterProps> = props => {

    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const token = await api('/auth/register', 'POST', { name, email, password })
        localStorage.setItem(token, TOKEN_KEY);
        history.goBack();
    }

    return (
        <Layout>
            <form className="font-weight-bold">
                <div className="mb-3">
                    <label className="form-label" htmlFor="RegisterEmail">Name</label>
                    <input className="form-control" value={name} onChange={e => setName(e.target.value)} type="text" />
                </div>
                <div className="mb-4">
                    <label className="form-label" htmlFor="RegisterEmail">Email</label>
                    <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} type="text" />
                </div>
                <div className="mb-4">
                    <label className="form-label" htmlFor="RegisterPassword">Password</label>
                    <input className="form-control" value={password} onChange={e => setPassword(e.target.value)} type="text" />
                </div>
                <button onClick={register} type="submit" className="btn btn-success">Register</button>
            </form>
        </Layout>
    );
}

interface RegisterProps { }

export default Register;