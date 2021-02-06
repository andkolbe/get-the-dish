import * as React from 'react';
import Layout from '../components/Layout';
import api, { setStorage } from '../utils/Api-service';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Register: React.FC<RegisterProps> = props => {

    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState<File>(null);

    const register = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const token = await api('/auth/register', 'POST', { name, email, password })
        setStorage(token);
        history.goBack();
    }

    return (
        <Layout>
            <form className='form-group border shadow bg-white font-weight-bold p-4'>
                <h4 className='mb-4'>Create a Profile</h4>
                <input className='form-control bg-warning mb-4' placeholder='Name' value={name} onChange={e => setName(e.target.value)} type='text' />
                <input className='form-control bg-warning mb-4' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} type='text' />
                <input className='form-control bg-warning mb-4' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} type='text' />
                <div className='mt-4'>
                    <label htmlFor="photo label">Upload a Profile Photo</label>
                    <input onChange={e => setFile(e.target.files[0])} className='form-control-file' type='file' />
                    <img className='img-thumbnail mt-3' style={{ width: '125px', height: 'auto' }} src={file ? URL.createObjectURL(file) : 'https://via.placeholder.com/125'} alt='picture' />
                </div>
                <button onClick={register} type='submit' className='btn btn-success mt-3'>Register</button>
            </form>
        </Layout>
    );
}

interface RegisterProps { }

export default Register;