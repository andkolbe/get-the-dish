import * as React from 'react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { IDishes } from '../utils/Types';

const Admin: React.FC<AdminProps> = props => { 

    const { id } = useParams<{id: string}>();

    return (
        <Layout>
            <h1 className="text-center">Admin</h1>
        </Layout>
    );
}

interface AdminProps {}

export default Admin;