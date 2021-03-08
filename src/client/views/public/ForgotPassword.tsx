import * as React from 'react';
import api from '../../utils/Api-service';
import Layout from '../../components/Layout';
import { AiOutlineMail } from 'react-icons/ai';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const ForgotPassword = (props: ForgotPasswordProps) => {   

    const history = useHistory();

    const [email, setEmail] = useState('');

    const resetPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        api('/api/users/forgot-password', 'POST', { email })
        history.push('/');
        // create a toast the generates on the home page that tells them to check their email whether that email was sent or not
    }

    return (
        <Layout>
            <form className='form-group border p-4 shadow bg-white font-weight-bold'>
                <h4>Forgot Password</h4>
                <h6 className='mb-4'>Enter your email address below. If we have it on file, we will send you a reset email</h6>
                <div className='d-flex'>
                    <h2><AiOutlineMail/></h2>
                    <input className='form-control bg-warning input-shadow ml-2 mb-4' placeholder='email@email.com' type='text' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <button onClick={resetPassword} className='btn btn-primary btn-shadow'>Submit</button>
            </form>
        </Layout>
    );
}

interface ForgotPasswordProps {}

export default ForgotPassword;