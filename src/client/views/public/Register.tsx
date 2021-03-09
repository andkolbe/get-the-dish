import * as React from 'react';
import Layout from '../../components/Layout';
import { setStorage } from '../../utils/Api-service';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { alertService } from '../../utils/Alert-service';

const Register: React.FC<RegisterProps> = props => {

    const history = useHistory();

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState<any>({ value: '', strength: 0 });
    const [file, setFile] = useState<File>(null);

    // alert
    const [options, setOptions] = useState({
        autoClose: false,
        keepAfterRouteChange: false
    });

    // evaluates the strength of the password on a scale of -1 to 2
    const evaluateStrength = (passwordLength: any) => {
        // is less than 10 characters
        if (passwordLength.length < 10) return 0

        // has at least 10 characters but is only numbers or letters
        if (/^[a-zA-Z]+$/i.test(passwordLength) || /^[0-9]+$/i.test(passwordLength)) return 1

        // is greater than 10 characters and has at least one number and letter
        if (/\d/.test(passwordLength) && /[a-zA-Z]/.test(passwordLength)) return 2

        return -1;
    }

    const handlePasswordChange = (e: any) => {
        const newValue = e.target.value;
        const newState = { ...password };
        // newState contains all of the values on password
        // state in react is by reference and not by value and therefore, to prevent funny things from happening it is always best practice to make a copy of the state, 
        // update the copy, and then when you’re ready update the state directly
        newState.value = newValue;
        newState.strength = evaluateStrength(newValue);
        setPassword(newState);
    }

    const setMeter = (color: any, size?: any) => {
        switch (color) {
            case 'danger':
                return (
                    <div className='progress'>
                        <div className='progress-bar progress-bar-striped progress-bar-animated bg-danger' role='progressbar' aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>weak</div>
                    </div>
                );
            case 'warning':
                return (
                    <div className='progress'>
                        <div className='progress-bar progress-bar-striped progress-bar-animated bg-success' role='progressbar' style={{ width: '50%' }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>medium</div>
                    </div>
                );
            case 'success':
                return (
                    <div className='progress'>
                        <div className='progress-bar progress-bar-striped progress-bar-animated' role='progressbar' style={{ width: '100%' }} aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}>strong</div>
                    </div>
                );
            default:
                break;
        }
    }

    const displayMeter = () => {
        if (password.strength === 0) {
            return setMeter('danger', password.value.length);
        }

        if (password.strength === 1) {
            return setMeter('warning');
        }

        if (password.strength === 2) {
            return setMeter('success');
        }
    }


    const register = async (e: React.MouseEvent<HTMLButtonElement>) => {

        e.preventDefault();

        const newUser = new FormData();

        newUser.append('username', username);
        newUser.append('email', email);
        newUser.append('password', password);
        newUser.append('image', file);
        if (!username || !email || !password || !file) return alertService.error('Username, Email, Password, and Profile Picture are required', options);
        const res = await fetch('/auth/register', {
            method: 'POST',
            body: newUser
        });
        if (res.status !== 200) return alertService.error('Username or Email already in use. Try again', options);
        const token = await res.json()
        setStorage(token);

        history.push('/profile');
    }

    return (
        <Layout>
            <form className='form-group border shadow bg-white font-weight-bold p-4'>
                <h4 className='text-center mb-4'>Create a Profile</h4>
                <small className='text-muted'>* All fields are required</small>
                <div className='d-flex mt-4'>
                    <h2>< AiOutlineUser/></h2>
                    <input className='form-control bg-warning input-shadow ml-2 mb-4' placeholder='Username' value={username} onChange={e => setUserName(e.target.value)} type='text' />
                </div>
                <div className='d-flex'>
                    <h2><AiOutlineMail/></h2>
                    <input className='form-control bg-warning input-shadow ml-2 mb-4' placeholder='email@email.com' value={email} onChange={e => setEmail(e.target.value)} type='text' />
                </div>
                <div className='d-flex'>
                    <h2><RiLockPasswordLine /></h2>
                    <input className='form-control bg-warning input-shadow ml-2 mb-3' placeholder='Password' onChange={handlePasswordChange} type='text' />
                </div>
                <small className='text-muted'>* Password should be greater than 10 characters and have at least one letter and number.</small>
                {displayMeter()}
                <div className='mt-5'>
                    <label htmlFor='photo label'>Upload a Profile Photo</label>
                    <input onChange={e => setFile(e.target.files[0])} className='form-control-file' type='file' />
                    <img className='img-thumbnail rounded-circle mt-3' style={{ width: '125px', height: 'auto' }} src={file ? URL.createObjectURL(file) : 'https://get-the-dish.s3.amazonaws.com/default-avatar.png'} alt='picture' />
                </div>
                <div className='d-flex flex-column'>
                    <button onClick={register} type='submit' className='btn btn-primary btn-shadow align-items-end mt-5'>Register</button>
                </div> 
                <div className='text-center mt-4'>
                    <small className='mr-2'>Already Have An Account?</small>
                    <Link to={'/login'}>Login!</Link>    
                </div>           
            </form>
        </Layout>
    );
}

interface RegisterProps { }

export default Register;