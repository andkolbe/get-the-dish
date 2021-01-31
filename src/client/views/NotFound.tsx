import * as React from 'react';
import Layout from '../components/Layout';

const NotFound: React.FC<NotFoundProps> = props => { 
// const NotFound = (props: NotFoundProps) => {   
    return (
        <Layout>
            <h1 className="text-center">NotFound</h1>
        </Layout>
    );
}

interface NotFoundProps {}

export default NotFound;