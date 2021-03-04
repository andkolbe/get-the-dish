import * as React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../../components/Layout';

const NotFound: React.FC<NotFoundProps> = props => {
    
    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            history.push('/')
        }, 5000)
    }, [])

    return (
        <Layout>
            <div className='d-flex flex-column justify-content-start align-items-center min-vh-100'>
                <h1>Page Not Found!</h1>
                <h5>You will be redirected back to the home page...</h5>
            </div>
        </Layout>
    );
}

interface NotFoundProps { }

export default NotFound;