import * as React from 'react';
import { useState } from 'react';

    const [password, setPassword] = useState<any>({ value: '', strength: 0 });

    // evaluates the strength of the password on a scale of -1 to 2
    export const evaluateStrength = (aValue: any) => {
        // is less than 10 characters
        if (aValue.length < 10) return 0

        // has at least 10 characters but is only numbers or letters
        if (/^[a-zA-Z]+$/i.test(aValue) || /^[0-9]+$/i.test(aValue)) return 1

        // is greater than 10 characters and has at least one number and letter
        if (/\d/.test(aValue) && /[a-zA-Z]/.test(aValue)) return 2

        return -1;
    }
    
    export const handlePasswordMeter = (e: any) => {
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

    export const displayMeter = () => {
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

    






