import * as React from 'react';
import Layout from '../components/Layout';

const NewDish: React.FC<NewDishProps> = props => { 
// const NewDish = (props: NewDishProps) => {   
    return (
        <Layout>
            <h1 className="text-center">NewDish</h1>
        </Layout>
    );
}

interface NewDishProps {}

export default NewDish;