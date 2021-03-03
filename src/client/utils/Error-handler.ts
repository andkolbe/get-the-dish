import history from './History';

export const errorHandler = (e: Error) => {
    if (e.message === 'expired token' || e.message === 'invalid token' || e.message === 'no token') {
        history.push('/login')
    }

    
}

