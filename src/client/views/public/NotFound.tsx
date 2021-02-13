import * as React from 'react';
import Layout from '../../components/Layout';

const NotFound: React.FC<NotFoundProps> = props => {

    // write a setTimeout to route back to Home

    return (
        <Layout>
            <div className='d-flex flex-column justify-content-center align-items-center min-vh-100'>
                <h1>Page Not Found!</h1>
                <small>You will be redirected back to the home page</small>
            </div>
        </Layout>
    );
}

interface NotFoundProps { }

export default NotFound;