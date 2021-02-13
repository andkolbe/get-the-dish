import * as React from 'react';
import Layout from '../../components/Layout';
import api, { setStorage } from '../../utils/Api-service';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Register: React.FC<RegisterProps> = props => {

    const history = useHistory();

    const [username, setUserName] = useState('test3');
    const [email, setEmail] = useState('test3@test.com');
    const [password, setPassword] = useState('password123');
    const [file, setFile] = useState<File>(null);

    const register = async (e: React.MouseEvent<HTMLButtonElement>) => {

         // this wont work if an image isnt selected. need to change that

        e.preventDefault();

        const newUser = new FormData();
        
        newUser.append('username', username);
        newUser.append('email', email);
        newUser.append('password', password);
        newUser.append('image', file);
        const res = await fetch('/auth/register', {
            method: 'POST',
            body: newUser
        });
        const token = await res.json()
        setStorage(token);

        history.push('/profile');
    }

    return (
        <Layout>
            <form className='form-group border shadow bg-white font-weight-bold p-4'>
                <h4 className='mb-4'>Create a Profile</h4>
                <input className='form-control bg-warning mb-4' placeholder='Name' value={username} onChange={e => setUserName(e.target.value)} type='text' />
                <input className='form-control bg-warning mb-4' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} type='text' />
                <input className='form-control bg-warning mb-4' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} type='text' />
                <div className='mt-4'>
                    <label htmlFor="photo label">Upload a Profile Photo (Optional)</label>
                    <input onChange={e => setFile(e.target.files[0])} className='form-control-file' type='file' />
                    <img className='img-thumbnail rounded-circle mt-3' style={{ width: '125px', height: 'auto' }} src={file ? URL.createObjectURL(file) : 'https://get-the-dish.s3.amazonaws.com/default-avatar.png'} alt='picture' />
                </div>
                <button onClick={register} type='submit' className='btn btn-success mt-3'>Register</button>
            </form>
        </Layout>
    );
}

interface RegisterProps { }

export default Register;