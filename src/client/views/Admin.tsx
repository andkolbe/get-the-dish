import * as React from 'react';
import Layout from '../components/Layout';

const Admin: React.FC<AdminProps> = props => { 
// const Admin = (props: AdminProps) => {   
    return (
        <Layout>
            <h1 className="text-center">Admin</h1>
        </Layout>
    );
}

interface AdminProps {}

export default Admin;