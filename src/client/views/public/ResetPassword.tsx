import * as React from 'react';
import Layout from '../../components/Layout';
import { displayMeter, evaluateStrength } from '../../components/PasswordMeter';
import api, { TOKEN_KEY } from '../../utils/Api-service';
import { alertService } from '../../utils/Alert-service';
import { errorHandler } from '../../utils/Error-handler';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const ResetPassword = (props: ResetPasswordProps) => {   

    const history = useHistory();

    const token = localStorage.getItem(TOKEN_KEY) // can i still use this even tho it isn't a jwt token?

    // if status coming from the back end is 500, reroute to home page and display alert that reads the token is expired

    const [passwordReset, setPasswordReset] = useState();

    const [password1, setPassword1] = useState<any>({ value: '', strength: 0 });
    const [password2, setPassword2] = useState('');

    // alert
    const [options, setOptions] = useState({
        autoClose: false,
        keepAfterRouteChange: false
    });

    useEffect(() => {
        api(`/api/users/reset-password`).then(reset => setPasswordReset(reset)).catch(errorHandler);;
    }, [])

    const handlePasswordMeter = (e: any) => {
        const newValue = e.target.value;
        const newState = { ...password1 };
        newState.value = newValue;
        newState.strength = evaluateStrength(newValue);
        setPassword1(newState);
    }
    
    const handleresetPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!password1 || !password2 ) return alertService.error('Both Password Fields Must Be Filled Out', options);
        if (password1 !== password2 ) return alertService.error('Passwords Do Not Match, Try Again', options);

        try {
            await api('/api/users/reset-password', 'PUT', { password: password2 });

            // Navigate to login page after password is reset
            // send a toast to login page saying password reset was successful
            history.push('/login')

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <form className='form-group border p-4 shadow bg-white font-weight-bold'>
                <h4 className='text-center'>Reset Password</h4>
                <h6 className='mb-4 mt-3'>Enter your new password below</h6>
                <label htmlFor='email'>New Password</label>
                <input className='form-control bg-warning input-shadow mb-3' placeholder='**********' onChange={handlePasswordMeter}/>
                <small className='text-muted'>* Password should be greater than 10 characters and have at least one letter and number.</small>
                {displayMeter()}
                <label className='mt-3' htmlFor='email'>Confirm New Password</label>
                <input className='form-control bg-warning input-shadow mb-4' placeholder='**********' value={password2} onChange={e => setPassword2(e.target.value)}/>
                <div className="d-flex flex-column align-items-center">
                    <button onClick={handleresetPassword} type='submit' className='btn btn-primary btn-shadow mt-3 w-50'>Submit</button>
                </div>
            </form>
        </Layout>
    );
}

// send an alert if passwords don't match

interface ResetPasswordProps {}

export default ResetPassword;