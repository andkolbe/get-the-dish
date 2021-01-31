import * as React from 'react';
import Layout from '../components/Layout';

const Details: React.FC<DetailsProps> = props => { 
// const Details = (props: DetailsProps) => {   
    return (
        <Layout>
            <h1 className="text-center">Details</h1>
        </Layout>
    );
}

interface DetailsProps {}

export default Details;