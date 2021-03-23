import * as React from 'react';
import Layout from '../components/Layout';

const Footer = (props: FooterProps) => {   
    return (
        <Layout>
            <h1 className='text-center'>Footer</h1>
        </Layout>
    );
}

interface FooterProps {}

export default Footer;